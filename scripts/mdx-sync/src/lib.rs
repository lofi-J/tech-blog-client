// 모듈 선언
pub mod types;

use std::fs;
use std::fs::read_dir;
use std::path::{Path, PathBuf};

use crate::types::{PostMetadata, PostMetadataKey, PostMetadataOnlyParse};

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
fn extract_metadata_value(yaml_str: &str, key: &PostMetadataKey) -> Option<String> {
    match parse_yaml_metadata(yaml_str) {
        Ok(metadata) => match key {
            PostMetadataKey::Title => Some(metadata.title),
            PostMetadataKey::Description => Some(metadata.description),
            PostMetadataKey::Date => Some(metadata.date),
            PostMetadataKey::Tags => Some(metadata.tags.join(", ")),
        },
        Err(_) => None,
    }
}

// YAML 메타데이터를 PostMetadata 구조체로 파싱
fn parse_yaml_metadata(yaml_str: &str) -> Result<PostMetadataOnlyParse, serde_yaml::Error> {
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
        let generated_hash_code = get_hash_as_u64(&content);

        let metadata_str = extract_metadata(content).unwrap();

        // 메타데이터 추출
        let title = extract_metadata_value(&metadata_str, &PostMetadataKey::Title).unwrap();
        let description =
            extract_metadata_value(&metadata_str, &PostMetadataKey::Description).unwrap();
        let date = extract_metadata_value(&metadata_str, &PostMetadataKey::Date).unwrap();
        let tags = extract_metadata_value(&metadata_str, &PostMetadataKey::Tags).unwrap();

        let post_metadata = PostMetadata {
            title,
            slug: file_name,
            description,
            date,
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
pub fn execute_mdx_sync() {
    let vec_file_paths = get_content_file_paths("src/content");
    let local_post_metadata = generate_all_posts_metadata(vec_file_paths);
    println!(
        "==========================local_post_metadata========================== \n{:?}",
        local_post_metadata
    );
}
