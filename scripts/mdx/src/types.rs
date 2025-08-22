use serde::{Deserialize, Serialize};

// ---------------------------------------------  POST METADATA  -----------------------------------------

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum PostMetadataKey {
    Title,
    Slug,
    Description,
    Date,
    Tags,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PostMetadataOnlyParse {
    pub title: String,
    pub slug: String,
    pub description: String,
    pub date: String,
    pub tags: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PostMetadata {
    pub title: String,
    pub slug: String, // file name 과 매칭
    pub description: String,
    pub date: String,
    pub tags: Vec<String>,
    pub hash_code: u64,
}

// ---------------------------------------------  HTTPS  -----------------------------------------

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
    pub published: Option<String>,
    pub updated_at: String,
}

// 백엔드 API 요청용 타입 (백엔드 명세에 맞춤)
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct UpsertRequestBody {
    pub slug: String,
    pub title: String,
    pub description: String,
    pub hash_code: String, // 백엔드에서 문자열로 받음
    pub tags: Option<Vec<String>>,
}

// ---------------------------------------------  SEARCH INDEX  -----------------------------------------

// 검색 인덱스용 타입 (search-modal.tsx의 Index와 일치)
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SearchIndex {
    pub title: String,
    pub slug: String,
    pub description: String,
    pub date: String,
    pub tags: Vec<String>,
    pub content: String,
}
