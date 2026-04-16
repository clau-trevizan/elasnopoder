import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WordPressProjetoDetail {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  acf?: {
    url_externa?: string;
    midias?: Array<{
      titulo?: string;
      embed?: string;
      tipo?: string;
    }>;
    dash?: Array<{
      titulo?: string;
      dash?: string;
    }>;
    conteudo_depois_do_dash?: string;
    conteudo_depois_do_dash_ingles?: string;
    conteudo_depois_do_dash_espanhol?: string;
    ingles?: {
      titulo?: string;
      texto?: string;
    };
    espanhol?: {
      titulo?: string;
      texto?: string;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

export const useWordPressProjetoBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["wordpress-projeto", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "projetos",
          slug: slug
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // WordPress returns an array when searching by slug
      const posts = data as WordPressProjetoDetail[];
      if (posts.length === 0) {
        throw new Error("Projeto não encontrado");
      }
      
      return posts[0];
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
