import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WordPressProjetoPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  link: string;
  acf?: {
    url_externa?: string;
    ingles?: {
      titulo?: string;
      resumo?: string;
    };
    espanhol?: {
      titulo?: string;
      resumo?: string;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

export const useWordPressProjetos = () => {
  return useQuery({
    queryKey: ["wordpress-projetos"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "projetos",
          perPage: 20,
          orderBy: "date",
          order: "desc"
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as WordPressProjetoPost[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
