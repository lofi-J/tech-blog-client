use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum PostMetadataKey {
    Title,
    Description,
    Date,
    Tags,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PostMetadataOnlyParse {
    pub title: String,
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
