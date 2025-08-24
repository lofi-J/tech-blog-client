use dotenv::dotenv;
use std::env;

use crate::types::{Metadata, PostMetadata, UpsertBody, UpsertResponse};

// Next.js 프로젝트 루트의 .env 파일에서 환경변수 읽기
fn get_remote_base_url() -> String {
    dotenv().ok();

    env::var("NEXT_PUBLIC_API_URL").unwrap_or_else(|_| {
        println!("⚠️  NEXT_PUBLIC_API_URL not found in .env, using default");
        "http://localhost:3001".to_string()
    })
}

pub async fn upsert_post_metadata(
    post_metadata: PostMetadata,
) -> Result<UpsertResponse, Box<dyn std::error::Error>> {
    let remote_base_url = get_remote_base_url();
    let request_url = format!("{}/api/build-sync/posts", remote_base_url);

    let hash_code_string = post_metadata.hash_code.to_string();

    let filtered_post_metadata = UpsertBody {
        metadata: Metadata {
            title: post_metadata.title,
            slug: post_metadata.slug.clone(),
            description: post_metadata.description,
            category: post_metadata.category,
            published: post_metadata.published,
            tags: post_metadata.tags,
        },
        hash_code: hash_code_string.clone(),
    };

    println!("🚀 Sending request for slug: {}", post_metadata.slug);

    let client = reqwest::Client::new();
    let response = client
        .post(&request_url)
        .header("Content-Type", "application/json")
        .json(&filtered_post_metadata)
        .send()
        .await?;

    // HTTP 상태 코드 확인
    let status = response.status();
    if !status.is_success() {
        let error_text = response
            .text()
            .await
            .unwrap_or_else(|_| "Unknown error".to_string());
        return Err(format!("HTTP {} - {}", status, error_text).into());
    }

    // JSON 응답 파싱
    let upsert_response: UpsertResponse = response.json().await?;

    // 백엔드 응답 검증
    if !upsert_response.ok {
        return Err(format!(
            "Backend error - Status: {}, Data: {:?}",
            upsert_response.status, upsert_response.data
        )
        .into());
    }

    // 성공 처리
    match &upsert_response.data {
        Some(data) => {
            println!(
                "✅ Success for '{}': ID={}, Hash={}",
                data.title, data.id, data.hash_code
            );

            if let Some(published) = &data.published {
                println!("   📅 Published: {}", published);
            }

            println!("   🕐 Updated: {}", data.updated_at);
        }
        None => {
            // println!(
            //     "⚠️  Success but no data returned for slug: {}",
            //     post_metadata.slug
            // );
        }
    }

    Ok(upsert_response)
}
