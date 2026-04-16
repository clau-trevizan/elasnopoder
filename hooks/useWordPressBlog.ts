import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WordPressBlogPost {
  id: number;
  slug: string;
  author: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  link: string;
  acf?: {
    autor?: string;
    tempo_de_leitura?: string;
    ingles?: {
      categoria?: string;
      titulo?: string;
      texto?: string;
    };
    espanhol?: {
      categoria?: string;
      titulo?: string;
      texto?: string;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export const useWordPressBlog = () => {
  return useQuery({
    queryKey: ["wordpress-blog"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: {
          endpoint: "posts",
          perPage: 100,
          orderBy: "date",
          order: "desc"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as WordPressBlogPost[];
    },
    staleTime: 0,
  });
};

export const useWordPressBlogInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["wordpress-blog-infinite"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: {
          endpoint: "posts",
          perPage: 9,
          page: pageParam,
          orderBy: "date",
          order: "desc"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as WordPressBlogPost[];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 9) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
};

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
  acf?: {
    cor?: string;
    cor_texto?: string;
    imagem?: string;
    nome_da_categoria_em_ingles?: string;
    nome_da_categoria_em_espanhol?: string;
    descricao_em_ingles?: string;
    descricao_em_espanhol?: string;
  };
}

export const useWordPressCategories = () => {
  return useQuery({
    queryKey: ["wordpress-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: {
          endpoint: "categories",
          perPage: 20,
          orderBy: "name",
          order: "asc"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as WordPressCategory[];
    },
    staleTime: 0,
  });
};
