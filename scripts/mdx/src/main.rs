use mdx::{execute_mdx_indexing, execute_mdx_sync};

#[tokio::main]
async fn main() {
    println!("================== SYNC START ==================");
    execute_mdx_sync().await;
    println!("================== SYNC COMPLETE ==================");

    println!("");

    println!("================== INDEXING START ==================");
    execute_mdx_indexing();
    println!("================== INDEXING COMPLETE ==================");
}
