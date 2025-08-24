use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PostMetadata {
    pub title: String,
    pub slug: String, // file name 과 매칭
    pub hash_code: u64,
    pub description: String,
    pub category: String,
    pub tags: Vec<String>,
    pub published: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Metadata {
    pub title: String,
    pub slug: String,
    pub description: String,
    pub category: String,
    pub tags: Vec<String>,
    pub published: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UpsertBody {
    pub metadata: Metadata,
    pub hash_code: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SearchIndex {
    pub metadata: Metadata,
    pub content: String,
}

// 백엔드 API 응답용 타입 (백엔드 명세에 맞춤)
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UpsertResponse {
    pub ok: bool,
    pub status: u16,
    pub data: Option<PostResponse>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PostResponse {
    pub id: i32,
    pub slug: String,
    pub title: String,
    pub description: String,
    pub hash_code: String,
    pub category: String,
    pub published: Option<String>,
    pub updated_at: String,
}
