import { useQuery } from "@tanstack/react-query";

export interface WordPressAuthor {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  acf?: {
    breve_descricao?: string;
    foto?: string;
  };
}

export const useWordPressAuthor = (authorId: number | undefined) => {
  return useQuery({
    queryKey: ["wordpress-author", authorId],
    queryFn: async () => {
      if (!authorId) return null;

      const response = await fetch(
        `https://elasnopoder.org/wp/wp-json/wp/v2/users/${authorId}?acf_format=standard`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch author");
      }

      return response.json() as Promise<WordPressAuthor>;
    },
    enabled: !!authorId,
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
  });
};

// Hook to fetch multiple authors at once
export const useWordPressAuthors = (authorIds: number[]) => {
  return useQuery({
    queryKey: ["wordpress-authors", authorIds.sort().join(",")],
    queryFn: async () => {
      if (!authorIds.length) return {};

      const uniqueIds = [...new Set(authorIds)];
      const authors: Record<number, WordPressAuthor> = {};

      await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const response = await fetch(
              `https://elasnopoder.org/wp/wp-json/wp/v2/users/${id}?acf_format=standard`
            );
            if (response.ok) {
              const author = await response.json();
              authors[id] = author;
            }
          } catch (error) {
            console.error(`Failed to fetch author ${id}:`, error);
          }
        })
      );

      return authors;
    },
    enabled: authorIds.length > 0,
    staleTime: 30 * 60 * 1000,
  });
};
