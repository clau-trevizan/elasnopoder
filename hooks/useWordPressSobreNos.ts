import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, getPageId } from "./useLanguage";

export interface SobreNosPageData {
  acf: {
    secao_1: {
      link_do_video: string;
      titulo: string;
    };
    secao_2?: {
      titulo?: string;
      texto?: string;
      texto_botao?: string;
      link_botao?: string;
    };
    secao_3?: {
      titulo?: string;
      texto?: string;
      imagem?: string;
      texto_botao?: string;
      link_botao?: string;
    };
    secao_4?: {
      titulo?: string;
    };
    secao_5?: {
      titulo?: string;
      texto?: string;
    };
    secao_6?: {
      titulo?: string;
      texto?: string;
    };
  };
}

export const useWordPressSobreNos = () => {
  const { language } = useLanguage();
  const pageId = getPageId("sobre", language);

  return useQuery({
    queryKey: ["wordpress-sobre-nos", language],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { pageId }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as SobreNosPageData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
