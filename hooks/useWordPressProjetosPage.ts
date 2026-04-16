import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, getPageId } from "./useLanguage";

interface TimelineItem {
  ano: string;
  texto: string;
}

export interface WordPressProjetosPageData {
  acf: {
    titulo: string;
    texto: string;
    imagem: string;
    imagem_mobile: string;
    secao_2: {
      titulo: string;
      imagem: string;
      imagem_mobile: string;
    };
    secao_3: {
      titulo: string;
    };
    timeline: TimelineItem[];
  };
}

export const useWordPressProjetosPage = () => {
  const { language } = useLanguage();
  const pageId = getPageId("projetos", language);
  
  return useQuery({
    queryKey: ["wordpress-projetos-page", language],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { pageId }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as WordPressProjetosPageData;
    },
    staleTime: 5 * 60 * 1000,
  });
};
