import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WordPressBlogPost, WordPressCategory } from "./useWordPressBlog";

export const useWordPressBlogByCategory = (categorySlug: string | undefined) => {
  return useQuery({
    queryKey: ["wordpress-blog-category", categorySlug],
    queryFn: async () => {
      if (!categorySlug) return [];
      
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "posts",
          perPage: 100,
          orderBy: "date",
          order: "desc",
          categorySlug: categorySlug
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as WordPressBlogPost[];
    },
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useWordPressCategoryBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["wordpress-category", slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "categories",
          slug: slug
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // WordPress returns an array, get the first item
      const categories = data as WordPressCategory[];
      return categories?.[0] || null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
