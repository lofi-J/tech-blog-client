// 모듈 선언
pub mod https;
pub mod types;

use std::fs;
use std::fs::read_dir;
use std::path::{Path, PathBuf};

use crate::types::{Metadata, PostMetadata, SearchIndex, SearchIndexMetadata};

use sha2::{Digest, Sha256};

// 컨텐츠 디렉토리 내 모든 파일 경로 반환
fn get_content_file_paths(dir_path: &str) -> Vec<PathBuf> {
    let content_directory = Path::new(dir_path).to_path_buf();
    let read_dir = read_dir(content_directory).unwrap();

    read_dir
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .collect()
}

// String을 받아 metadata만 추출
fn extract_metadata(content: String) -> Option<String> {
    if !content.starts_with("---") {
        return None;
    }

    let lines: Vec<&str> = content.lines().collect();
    let mut metadata = String::new();
    let mut in_frontmatter = false;

    for line in lines {
        if line.trim() == "---" {
            if !in_frontmatter {
                in_frontmatter = true;
                continue;
            } else {
                break;
            }
        }

        if in_frontmatter {
            metadata.push_str(line);
            metadata.push('\n');
        }
    }

    if !metadata.is_empty() {
        Some(metadata.trim().to_string())
    } else {
        None
    }
}

// 변환한 hash값 반환
fn get_hash_as_u64(text: &String) -> u64 {
    let mut hasher = Sha256::new();
    hasher.update(text.as_bytes());
    let result = hasher.finalize();

    let hex_string = format!("{:x}", result);
    // 처음 16자리 hex를 u64로 파싱
    u64::from_str_radix(&hex_string[..16], 16).unwrap()
}

// 메타데이터에서 특정 키의 값만 추출
fn extract_metadata_value(yaml_str: &str, key: &str) -> Option<String> {
    let metadata = parse_yaml_metadata(yaml_str).expect("YAML PASING ERROR");

    match key {
        "title" => Some(metadata.title),
        "thumbnail" => Some(metadata.thumbnail),
        "slug" => Some(metadata.slug),
        "description" => Some(metadata.description),
        "category" => Some(metadata.category),
        "tags" => Some(metadata.tags.join(", ")),
        "published" => Some(metadata.published),
        _ => panic!("{:?} is not a valid metadata", key),
    }
}

// YAML 메타데이터를 Metadata 구조체로 파싱
fn parse_yaml_metadata(yaml_str: &str) -> Result<Metadata, serde_yaml::Error> {
    serde_yaml::from_str(yaml_str)
}

// 모든 MDX 파일을 파싱해 PostMetadata 구조체 생성
fn generate_all_posts_metadata(file_paths: Vec<PathBuf>) -> Vec<PostMetadata> {
    let mut vec_post_metadata = Vec::<PostMetadata>::new();

    for file_path in &file_paths {
        let file_name = file_path // slug로 사용
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .replace(".mdx", "");

        let content = fs::read_to_string(file_path).unwrap();
        let metadata_str = if let Some(metadata) = extract_metadata(content.clone()) {
            metadata
        } else {
            panic!(
                "Error file: '{}' due to missing or invalid frontmatter.",
                file_name
            );
        };

        let generated_hash_code = get_hash_as_u64(&content);

        // 메타데이터 추출
        let title = extract_metadata_value(&metadata_str, "title").unwrap();
        let thumbnail = extract_metadata_value(&metadata_str, "thumbnail").unwrap();
        let slug = extract_metadata_value(&metadata_str, "slug").unwrap();
        let description = extract_metadata_value(&metadata_str, "description").unwrap();
        let category = extract_metadata_value(&metadata_str, "category").unwrap();
        let published = extract_metadata_value(&metadata_str, "published").unwrap();
        let tags = extract_metadata_value(&metadata_str, "tags").unwrap();

        // 메타데이터 추출 후 파일명과 slug 매칭 확인
        if slug != file_name {
            panic!("Slug and File name mismatch: {} != {}", slug, file_name);
        }

        let post_metadata = PostMetadata {
            title,
            thumbnail,
            slug,
            description,
            category,
            published,
            tags: tags
                .split(", ")
                .map(|s| s.to_string())
                .collect::<Vec<String>>(),
            hash_code: generated_hash_code,
        };

        // 전체 post리스트에 삽입
        vec_post_metadata.push(post_metadata);
    }

    vec_post_metadata
}

// main 에서 실행할 함수
pub async fn execute_mdx_sync() {
    let vec_file_paths = get_content_file_paths("src/content");
    let local_post_metadata = generate_all_posts_metadata(vec_file_paths); // 모든 파일 파싱 후 메타데이터 벡터 생성

    let mut success_count = 0;
    let mut error_count = 0;

    for post_metadata in local_post_metadata {
        match https::upsert_post_metadata(post_metadata.clone()).await {
            Ok(_response) => {
                success_count += 1;
            }
            Err(e) => {
                error_count += 1;
                println!("❌ Failed to upsert '{}': {}", post_metadata.slug, e);
            }
        }
    }

    // 최종 결과 출력
    println!("✅ Success: {} posts", success_count);
    println!("❌ Errors: {} posts", error_count);
    println!("📊 Total: {} posts", success_count + error_count);
}

pub fn execute_mdx_indexing() {
    let emit_json_path = "public/search-index/index.json";
    let vec_file_paths = get_content_file_paths("src/content");

    let parent = Path::new(emit_json_path).parent().unwrap();
    fs::create_dir_all(parent).unwrap();

    let mut search_indices = Vec::<SearchIndex>::new();

    for file_path in &vec_file_paths {
        let file_name = file_path
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .replace(".mdx", "");

        let content = fs::read_to_string(file_path).unwrap();
        let only_article_content = content
            .split("---")
            .nth(2)
            .unwrap()
            .to_string()
            .replace("\n", "");

        let metadata_str = extract_metadata(content.clone()).unwrap();

        let title = extract_metadata_value(&metadata_str, "title").unwrap();
        let description = extract_metadata_value(&metadata_str, "description").unwrap();
        let published = extract_metadata_value(&metadata_str, "published").unwrap_or_default();
        let category = extract_metadata_value(&metadata_str, "category").unwrap_or_default();
        let tags = extract_metadata_value(&metadata_str, "tags")
            .unwrap()
            .split(", ")
            .map(|s| s.to_string())
            .collect::<Vec<String>>();

        let search_index = SearchIndex {
            metadata: SearchIndexMetadata {
                title,
                slug: file_name.clone(),
                description,
                category,
                published,
                tags,
            },
            content: only_article_content,
        };

        search_indices.push(search_index);
        println!("✅ Indexed: {}", file_name);
    }

    // JSON 파일로 저장
    let json_string = serde_json::to_string_pretty(&search_indices).unwrap();
    fs::write(emit_json_path, json_string).unwrap();

    println!("📄 Search index saved to: {}", emit_json_path);
    println!("📊 Total indexed posts: {}", search_indices.len());
}
