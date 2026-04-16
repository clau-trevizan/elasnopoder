"use client";
const diagramImage = "/assets/projetos-hero-diagram.png";
const diagramMobileImage = "/assets/mandala_mobile-2.png";
const heroBackground = "/assets/projetos-hero-bg.jpg";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWordPressProjetosPage } from "@/hooks/useWordPressProjetosPage";
import { Skeleton } from "@/components/ui/skeleton";

const ProjetosHeroSection = () => {
  const isMobile = useIsMobile();
  const { data: pageData, isLoading } = useWordPressProjetosPage();

  const title = pageData?.acf?.titulo || 'Fortalecendo nossas Lideranças';
  const text = pageData?.acf?.texto || '';
  const desktopImage = pageData?.acf?.imagem || diagramImage;
  const mobileImage = pageData?.acf?.imagem_mobile || diagramMobileImage;

  return (
    <section
      className="relative overflow-hidden projetos-hero-section"
      style={{
        backgroundColor: '#1F1D1D',
        paddingTop: '0',
        paddingBottom: '4rem',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
      }}
    >
      <style>{`
        .projetos-hero-section .hero-text p {
          font-size: 16px !important;
        }
        @media (max-width: 1024px) {
          .projetos-hero-section .mobile-content-section {
            display: block;
          }
          .projetos-hero-section .desktop-image-section {
            display: none;
          }
        }
        @media (min-width: 1025px) {
          .projetos-hero-section .mobile-content-section {
            display: none;
          }
          .projetos-hero-section .desktop-image-section {
            display: flex;
          }
        }
      `}</style>
      <div className="container mx-auto px-4">
        {/* Title, Description and Image in 7+5 columns layout */}
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Title and Description - 7 columns */}
          <div className="col-span-12 lg:col-span-7">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-3/4 mb-6" />
                <Skeleton className="h-24 w-full" />
              </>
            ) : (
              <>
                <h1 style={{ color: '#fff' }} className="mb-6">{title}</h1>
                <div
                  className="hero-text"
                  style={{ color: '#fff' }}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </>
            )}
          </div>

          {/* Desktop Image - 5 columns */}
          <div className="col-span-12 lg:col-span-5 desktop-image-section justify-center">
            {isLoading ? (
              <Skeleton className="w-full h-[400px]" />
            ) : (
              <img
                src={desktopImage}
                alt="Diagrama de competências - Elas no Poder"
                className="w-full h-auto"
              />
            )}
          </div>

          {/* Mobile Content - Text based version of the diagram */}
          <div className="col-span-12 mobile-content-section">
            {isLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <div className="flex flex-col items-center text-center">
                <img
                  src={mobileImage}
                  alt="Diagrama de competências - Elas no Poder"
                  className="w-full max-w-[300px] h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjetosHeroSection;
