import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LiderancaMember {
  id: number;
  title: {
    rendered: string;
  };
  featured_media_url?: string;
  acf?: {
    cargo?: string;
    segmento?: Array<{
      name?: string;
      acf?: {
        nome_da_categoria_em_ingles?: string;
        nome_da_categoria_em_espanhol?: string;
      };
    }>;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

export const useWordPressLiderancas = () => {
  return useQuery({
    queryKey: ["wordpress-liderancas"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "liderancas",
          perPage: 100,
          orderBy: "title",
          order: "asc"
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as LiderancaMember[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
