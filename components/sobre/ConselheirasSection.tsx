"use client";
import { useWordPressSobreNos } from "@/hooks/useWordPressSobreNos";
import { useWordPressConselheiras } from "@/hooks/useWordPressConselheiras";
import { Skeleton } from "@/components/ui/skeleton";
const fundo6 = "/assets/fundo6.svg";
const arrowNav = "/assets/arrow-nav.svg";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ConselheirasSection = () => {
  const { data: pageData } = useWordPressSobreNos();
  const { data: conselheirasMembers, isLoading } = useWordPressConselheiras();
  const { language } = useLanguage();

  const titulo = pageData?.acf?.secao_6?.titulo || "Conselheiras";
  const texto = pageData?.acf?.secao_6?.texto || "";

  // Group members into slides of 4 (2 rows x 2 columns)
  const slides = [];
  if (conselheirasMembers) {
    for (let i = 0; i < conselheirasMembers.length; i += 4) {
      slides.push(conselheirasMembers.slice(i, i + 4));
    }
  }

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-0 conselheiras-bg"
      style={{
        backgroundImage: `url("${fundo6}")`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F8F8F8',
      }}
    >
      <style>{`
        .conselheiras-bg {
          background-size: cover;
          background-position: center top 0px;
          padding-bottom: 7rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 1025px) {
          .conselheiras-section {
            padding-top: 15rem !important;
            padding-bottom: 22rem !important;
          }
          .conselheiras-bg {
            background-size: auto;
            background-position: top 50px center;
            padding-bottom: 0;
            margin-bottom: 0;
          }
        }
      `}</style>
      <div className="container mx-auto px-4 relative z-10 conselheiras-section">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Text content - 5 columns starting at column 2 */}
          <div className="col-span-12 md:col-start-2 md:col-span-5">
            <h1
              className="mb-6"
              style={{ color: '#481276' }}
              dangerouslySetInnerHTML={{ __html: titulo }}
            />

            {texto && (
              <div
                className="space-y-4 text-foreground"
                dangerouslySetInnerHTML={{ __html: texto }}
              />
            )}
          </div>

          {/* Carousel - 6 columns */}
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            {isLoading ? (
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="col-span-2 flex flex-col items-center text-center">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : slides.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {slides.map((slideMembers, slideIndex) => (
                    <CarouselItem key={slideIndex}>
                      <div className="grid grid-cols-4 gap-6">
                      {slideMembers.map((member) => {
                          const featuredImage = member._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
                          const nome = member.title?.rendered || "";

                          // Get cargo based on language
                          let cargo = member.acf?.cargo || "";
                          if (language === "ENG" && member.acf?.cargo_ingles) {
                            cargo = member.acf.cargo_ingles;
                          } else if (language === "ESP" && member.acf?.cargo_espanhol) {
                            cargo = member.acf.cargo_espanhol;
                          }

                          return (
                            <div key={member.id} className="col-span-2 flex flex-col items-center text-center">
                              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 bg-muted">
                                {featuredImage && (
                                  <img
                                    src={featuredImage}
                                    alt={nome}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <span
                                className="font-bold text-foreground mb-1"
                                dangerouslySetInnerHTML={{ __html: nome }}
                              />
                              {cargo && (
                                <small className="text-muted-foreground">
                                  {cargo}
                                </small>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {slides.length > 1 && (
                  <>
                    <CarouselPrevious className="hover:bg-primary hover:text-white hover:border-primary">
                      <img src={arrowNav} alt="Previous" className="w-3 h-3 rotate-180" />
                    </CarouselPrevious>
                    <CarouselNext className="hover:bg-primary hover:text-white hover:border-primary">
                      <img src={arrowNav} alt="Next" className="w-3 h-3" />
                    </CarouselNext>
                  </>
                )}
              </Carousel>
            ) : (
              <div className="text-center text-muted-foreground">Nenhuma conselheira encontrada.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConselheirasSection;
