import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DiretoriaMember {
  id: number;
  title: {
    rendered: string;
  };
  featured_media_url?: string;
  acf?: {
    cargo?: string;
    cargo_eng?: string;
    cargo_esp?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
  idioma?: number[];
}

export const useWordPressDiretoria = () => {
  return useQuery({
    queryKey: ["wordpress-diretoria"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "diretoria",
          perPage: 100,
          orderBy: "date",
          order: "desc"
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Filter out posts that have idioma taxonomy set to eng or esp
      // Posts without idioma taxonomy or with other values are included (Portuguese)
      const members = data as DiretoriaMember[];
      
      // First, fetch idioma taxonomy terms to get IDs for 'eng' and 'esp'
      const { data: termsData } = await supabase.functions.invoke("wordpress-proxy", {
        body: { 
          endpoint: "idioma",
          perPage: 100
        }
      });
      
      const terms = termsData as Array<{ id: number; slug: string }> || [];
      const engTermId = terms.find(t => t.slug === 'eng')?.id;
      const espTermId = terms.find(t => t.slug === 'esp')?.id;
      
      // Filter members - exclude those with eng or esp idioma
      const filteredMembers = members.filter(member => {
        if (!member.idioma || member.idioma.length === 0) {
          return true; // Include posts without idioma taxonomy
        }
        // Exclude if has eng or esp term
        const hasEng = engTermId && member.idioma.includes(engTermId);
        const hasEsp = espTermId && member.idioma.includes(espTermId);
        return !hasEng && !hasEsp;
      });
      
      return filteredMembers;
    },
    staleTime: 5 * 60 * 1000,
  });
};
