import { useEffect, useState } from "react";

export interface PostContent {
  slug: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    tags: string[];
  };
  content: string;
  compiledMdx?: string;
}

export interface UsePostContentResult {
  data: PostContent | null;
  loading: boolean;
  error: string | null;
}

export const usePostContent = (slug: string): UsePostContentResult => {
  const [data, setData] = useState<PostContent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Slug is required");
      return;
    }

    const fetchPostContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/posts/${slug}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch post content");
        }

        const postData = await response.json();
        setData(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPostContent();
  }, [slug]);

  return { data, loading, error };
};
