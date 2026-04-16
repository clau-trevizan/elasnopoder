import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WordPressBlogPost } from "./useWordPressBlog";

export const useWordPressBlogPost = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["wordpress-blog-post", slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "posts",
          slug: slug
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // WordPress returns an array, get the first item
      const posts = data as WordPressBlogPost[];
      return posts?.[0] || null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
