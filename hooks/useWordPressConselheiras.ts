import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ConselheiraMember {
  id: number;
  title: {
    rendered: string;
  };
  featured_media_url?: string;
  acf?: {
    cargo?: string;
    cargo_ingles?: string;
    cargo_espanhol?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

export const useWordPressConselheiras = () => {
  return useQuery({
    queryKey: ["wordpress-conselheiras"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "conselheiras",
          perPage: 100,
          orderBy: "date",
          order: "desc"
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as ConselheiraMember[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
