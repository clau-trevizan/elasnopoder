"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWordPressProjetosPage } from "@/hooks/useWordPressProjetosPage";
import { Skeleton } from "@/components/ui/skeleton";
import MobileTimeline from "./MobileTimeline";
import { motion } from "framer-motion";
const timelineBg01 = "/assets/timeline-bg-01.png";
const timelineBg02 = "/assets/timeline-bg-02.png";

const defaultTimelineItems = [
  { ano: "2019", texto: "Fundação da ONG e primeira edição Pesquisa \"Perfil da Mulher na Política\"" },
  { ano: "2020", texto: "Im.pulsa e Super Campanha: Vem, Vote em Mulheres" },
  { ano: "2022", texto: "Elas na Escola - primeiro ciclo Campanha Indique uma Mulher" },
  { ano: "2023", texto: "Elas na Escola - segundo e terceiro ciclo" },
  { ano: "2024", texto: "Meninas Cidadãs - primeira fase e segunda edição Pesquisa \"Perfil da Mulher na Política\"" },
  { ano: "2025", texto: "Nutrindo Soluções e Meninas Cidadãs - segunda fase" }
];

const TimelineSection = () => {
  const isMobile = useIsMobile();
  const { data: pageData, isLoading } = useWordPressProjetosPage();

  const title = pageData?.acf?.secao_2?.titulo || 'Linha do Tempo';
  const desktopImage = pageData?.acf?.secao_2?.imagem;
  const timelineItems = pageData?.acf?.timeline && pageData.acf.timeline.length > 0
    ? pageData.acf.timeline
    : defaultTimelineItems;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#F8F8F8',
        paddingTop: '6rem',
        paddingBottom: '4rem',
      }}
    >
      <div className="container mx-auto px-4">
        {isLoading ? (
          <Skeleton className="h-12 w-64 mx-auto mb-16" />
        ) : (
          <h1 className="text-center mb-16" style={{ color: '#481276' }}>
            {title}
          </h1>
        )}

        {/* Timeline - Desktop shows ACF image with background layers, Mobile shows text timeline */}
        <div className="flex justify-center">
          {isLoading ? (
            <Skeleton className="w-full h-[300px] max-w-5xl" />
          ) : isMobile ? (
            <MobileTimeline items={timelineItems} />
          ) : (
            <div className="relative w-full max-w-5xl">
              {/* Background layer 1 - enters first */}
              <motion.img
                src={timelineBg01}
                alt=""
                className="absolute inset-0 w-full h-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
              />

              {/* Background layer 2 - enters second */}
              <motion.img
                src={timelineBg02}
                alt=""
                className="absolute inset-0 w-full h-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              {/* Main ACF image - enters last, on top */}
              {desktopImage && (
                <motion.img
                  src={desktopImage}
                  alt="Linha do Tempo - Elas no Poder"
                  className="relative w-full h-auto"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
