import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RatingStats {
  average: number;
  total: number;
  distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
}

export const useBlogRatings = (postSlug: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: ratings, isLoading } = useQuery({
    queryKey: ["blog-ratings", postSlug],
    queryFn: async (): Promise<RatingStats> => {
      if (!postSlug) {
        return { average: 0, total: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
      }

      const { data, error } = await supabase
        .from("blog_ratings")
        .select("rating")
        .eq("post_slug", postSlug);

      if (error) throw error;

      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let total = 0;
      let sum = 0;

      data?.forEach((item) => {
        const r = item.rating as 1 | 2 | 3 | 4 | 5;
        distribution[r]++;
        total++;
        sum += item.rating;
      });

      const average = total > 0 ? Math.round((sum / total) * 10) / 10 : 0;

      return { average, total, distribution };
    },
    enabled: !!postSlug,
    staleTime: 60 * 1000, // 1 minute
  });

  const addRating = useMutation({
    mutationFn: async (rating: number) => {
      if (!postSlug) throw new Error("Post slug is required");

      const { error } = await supabase
        .from("blog_ratings")
        .insert({ post_slug: postSlug, rating });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-ratings", postSlug] });
    },
  });

  return {
    ratings: ratings || { average: 0, total: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } },
    isLoading,
    addRating,
  };
};
