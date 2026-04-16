"use client";
import { useWordPressSobreNos } from "@/hooks/useWordPressSobreNos";
import { useWordPressLiderancas } from "@/hooks/useWordPressLiderancas";
import { Skeleton } from "@/components/ui/skeleton";
const liderancasBg = "/assets/liderancas-section-bg.svg";
const arrowNav = "/assets/arrow-nav.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LiderancasSection = () => {
  const { data: pageData } = useWordPressSobreNos();
  const { data: liderancasMembers, isLoading } = useWordPressLiderancas();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const titulo = pageData?.acf?.secao_5?.titulo || "Lideranças";
  const texto = pageData?.acf?.secao_5?.texto || "";

  // Group members into slides - 4 for mobile, 10 for desktop
  const itemsPerSlide = isMobile ? 4 : 10;
  const slides = [];
  if (liderancasMembers) {
    for (let i = 0; i < liderancasMembers.length; i += itemsPerSlide) {
      slides.push(liderancasMembers.slice(i, i + itemsPerSlide));
    }
  }

  return (
    <section
      className="liderancas-section"
      style={{
        backgroundImage: `url("${liderancasBg}")`,
        backgroundSize: 'auto',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#FFFFFF',
      }}
    >
      <style>{`
        .liderancas-section {
          padding-top: 10rem;
          padding-bottom: 5rem;
        }
        .liderancas-section .lideranca-item {
          width: 47%;
        }
        @media (max-width: 1024px) {
          .liderancas-section [data-carousel-previous] {
            left: 0 !important;
          }
          .liderancas-section [data-carousel-next] {
            right: 0 !important;
          }
        }
        @media (min-width: 1025px) {
          .liderancas-section {
            padding-top: 12rem;
            padding-bottom: 15rem;
          }
          .liderancas-section .lideranca-item {
            width: auto;
          }
        }
      `}</style>
      <div className="container mx-auto px-4">
        <h1 className="text-center mb-4" style={{ color: '#481276' }}>
          {titulo}
        </h1>

        {texto && (
          <p
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-base"
            dangerouslySetInnerHTML={{ __html: texto }}
          />
        )}

        {isLoading ? (
          <div className="flex gap-4 justify-center flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center text-center" style={{ width: '18%' }}>
                <Skeleton className="w-full h-[128px] rounded-[9px] mb-3" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : slides.length > 0 ? (
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {slides.map((slideMembers, slideIndex) => (
                <CarouselItem key={slideIndex}>
                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-4' : 'grid-cols-10'}`}>
                    {slideMembers.map((member, memberIndex) => {
                      const featuredImage = member._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face";
                      const nome = member.title?.rendered || "";

                      // Get segment name based on language
                      const segmento = member.acf?.segmento?.[0];
                      let segmentoName = segmento?.name || "";
                      if (language === "ENG" && segmento?.acf?.nome_da_categoria_em_ingles) {
                        segmentoName = segmento.acf.nome_da_categoria_em_ingles;
                      } else if (language === "ESP" && segmento?.acf?.nome_da_categoria_em_espanhol) {
                        segmentoName = segmento.acf.nome_da_categoria_em_espanhol;
                      }

                      return (
                        <div key={member.id} className="col-span-2 flex flex-col items-center text-center lideranca-item">
                          <div className="overflow-hidden mb-3" style={{ borderRadius: '9px' }}>
                            <img
                              src={featuredImage}
                              alt={nome}
                              className="object-cover w-full"
                              style={{ height: '128px', borderRadius: '9px' }}
                            />
                          </div>
                          <p
                            className="small font-bold text-foreground mb-1"
                            dangerouslySetInnerHTML={{ __html: nome }}
                          />
                          <small className="block text-muted-foreground leading-tight">
                            {segmentoName}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {slides.length > 1 && (
              <>
                <CarouselPrevious data-carousel-previous className="hover:bg-primary hover:text-white hover:border-primary">
                  <img src={arrowNav} alt="Previous" className="w-3 h-3 rotate-180" />
                </CarouselPrevious>
                <CarouselNext data-carousel-next className="hover:bg-primary hover:text-white hover:border-primary">
                  <img src={arrowNav} alt="Next" className="w-3 h-3" />
                </CarouselNext>
              </>
            )}
          </Carousel>
        ) : (
          <div className="text-center text-muted-foreground">Nenhuma liderança encontrada.</div>
        )}
      </div>
    </section>
  );
};

export default LiderancasSection;
