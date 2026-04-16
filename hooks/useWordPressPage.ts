import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, getPageId } from "./useLanguage";

export interface WordPressPageData {
  acf: {
    video_banner: string;
    secao_2_carrossel: Array<{
      imagem: string;
      titulo: string;
      texto: string;
      texto_do_botao: string;
      link_do_botao: string;
    }>;
    secao_3: {
      titulo: string;
      item: Array<{
        imagem: string;
        texto: string;
      }>;
    };
    secao_4_cards: Array<{
      imagem: string;
      titulo: string;
      texto_do_botao: string;
      link_do_botao: string;
    }>;
    financiadores: {
      titulo: string;
      texto: string;
      linha_1: {
        logo: Array<{
          imagem: string;
        }>;
      };
      linha_2: {
        logo: Array<{
          imagem: string;
        }>;
      };
    };
    parcerias: {
      titulo: string;
      texto: string;
      slide: Array<{
        logo: Array<{
          imagem: string;
        }>;
      }>;
    };
    contato: {
      titulo: string;
      imagem: string;
      email: string;
    };
    relatorios_financeiros?: Array<{
      capa: string;
      pdf: string;
    }>;
    codigo_de_etica?: string;
    estatuto?: string;
    relatorio_financeiro?: string;
  };
}

export const useWordPressPage = () => {
  const { language } = useLanguage();
  const pageId = getPageId("home", language);
  
  return useQuery({
    queryKey: ["wordpress-page", language],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wordpress-proxy", {
        body: { pageId }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as WordPressPageData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
