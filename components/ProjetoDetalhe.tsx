"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useWordPressProjetoBySlug } from "@/hooks/useWordPressProjetoBySlug";
import { useLanguage } from "@/hooks/useLanguage";
const singleBg0 = "/assets/single_bg0.svg";
const singleBg1 = "/assets/single_bg1-3.svg";
const singleBg2 = "/assets/single_bg2-2.svg";
const singleBg3 = "/assets/single_bg3-2.svg";
const singleBg4 = "/assets/single_bg4-2.svg";

const ProjetoDetalhe = ({ slug }: { slug: string }) => {
  const { data: projeto, isLoading, error } = useWordPressProjetoBySlug(slug);
  const { language, buildLink } = useLanguage();

  const getFeaturedImage = () => {
    return projeto?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  };

  // Get breadcrumb translations
  const getBreadcrumbHome = () => {
    if (language === "ENG") return "Home";
    if (language === "ESP") return "Inicio";
    return "Home";
  };

  const getBreadcrumbProjects = () => {
    if (language === "ENG") return "Projects";
    if (language === "ESP") return "Proyectos";
    return "Projetos";
  };

  // Get project title based on language
  const getProjectTitle = () => {
    if (language === "ENG" && projeto?.acf?.ingles?.titulo) {
      return projeto.acf.ingles.titulo;
    }
    if (language === "ESP" && projeto?.acf?.espanhol?.titulo) {
      return projeto.acf.espanhol.titulo;
    }
    return projeto?.title.rendered || "";
  };

  // Get project content based on language
  const getProjectContent = () => {
    if (language === "ENG" && projeto?.acf?.ingles?.texto) {
      return projeto.acf.ingles.texto;
    }
    if (language === "ESP" && projeto?.acf?.espanhol?.texto) {
      return projeto.acf.espanhol.texto;
    }
    return projeto?.content.rendered || "";
  };

  // Background images for dash sections (in order)
  const dashBackgrounds = [singleBg1, singleBg2, singleBg3, singleBg4];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Skeleton */}
          <Skeleton
            className="w-full"
            style={{
              height: '60vh',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          />

          {/* Content Skeleton */}
          <section
            className="py-16"
            style={{
              backgroundColor: '#FFFFFF',
              backgroundImage: `url("${singleBg0}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left top',
              backgroundSize: 'auto',
            }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Skeleton className="h-12 w-3/4 mb-8" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-4/5" />
              </div>
            </div>
          </section>

          {/* Dash Section Skeleton */}
          <section
            className="relative py-16 overflow-hidden"
            style={{
              backgroundColor: '#FFFFFF',
              backgroundImage: `url("${singleBg1}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
          >
            <div className="container mx-auto px-4 relative z-10">
              <Skeleton className="h-10 w-1/3 mx-auto mb-8" />
              <Skeleton className="h-[400px] max-w-[800px] mx-auto rounded-lg" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !projeto) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 style={{ color: '#481276' }}>Projeto não encontrado</h1>
            <p className="mt-4">O projeto que você está procurando não existe ou foi removido.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ACF dash is a repeater field - access directly as array
  const dashItems = projeto.acf?.dash || [];

  // Get language-specific content after dash
  const getConteudoDepoisDoDash = () => {
    const defaultContent = projeto.acf?.conteudo_depois_do_dash || '';
    if (!defaultContent) return '';

    if (language === "ENG" && projeto.acf?.conteudo_depois_do_dash_ingles) {
      return projeto.acf.conteudo_depois_do_dash_ingles;
    }
    if (language === "ESP" && projeto.acf?.conteudo_depois_do_dash_espanhol) {
      return projeto.acf.conteudo_depois_do_dash_espanhol;
    }
    return defaultContent;
  };

  const conteudoDepoisDoDash = getConteudoDepoisDoDash();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Image - Section 1 */}
        {getFeaturedImage() && (
          <section
            className="w-full overflow-hidden projeto-hero-section relative"
            style={{
              height: '60vh',
              minHeight: '400px',
              paddingBottom: 0,
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          >
            <img
              src={getFeaturedImage()}
              alt={projeto.title.rendered}
              className="w-full h-full object-cover"
            />
            {/* Breadcrumb */}
            <div className="absolute bottom-6 left-0 w-full">
              <div className="container mx-auto px-4">
                <p className="text-white text-left projeto-breadcrumb" style={{ fontSize: '16px', textShadow: '0 0 5px black' }}>
                  <Link href={buildLink("/")} className="hover:underline">{getBreadcrumbHome()}</Link>
                  <span className="mx-2">&gt;</span>
                  <Link href={buildLink("/projetos")} className="hover:underline">{getBreadcrumbProjects()}</Link>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Content Section - Section 2 with single_bg0.svg background */}
        <section
          className="py-16"
          style={{
            backgroundColor: '#FFFFFF',
            backgroundImage: `url("${singleBg0}")`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center bottom',
            backgroundSize: '100%',
            marginTop: '-15px',
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1
                style={{ color: '#481276' }}
                className="mb-8"
                dangerouslySetInnerHTML={{ __html: getProjectTitle() }}
              />
              <div
                className="prose prose-lg max-w-none projeto-content"
                style={{ color: '#000' }}
                dangerouslySetInnerHTML={{ __html: getProjectContent() }}
              />
            </div>
          </div>
        </section>

        {/* Dash Sections - From ACF acf.dash repeater */}
        {dashItems.length > 0 && dashItems.map((dashItem: any, index: number) => {
          const dashContent = dashItem.dash || '';
          const isLastSection = index === dashItems.length - 1 && !conteudoDepoisDoDash;

          // Check if content is only a PDF embed
          const isPdfOnly = dashContent &&
            (dashContent.includes('.pdf') || dashContent.includes('application/pdf')) &&
            (dashContent.includes('<iframe') || dashContent.includes('<embed') || dashContent.includes('<object'));

          // Extract PDF URL from embed
          const extractPdfUrl = (html: string) => {
            const srcMatch = html.match(/src=["']([^"']*\.pdf[^"']*)["']/i);
            if (srcMatch) return srcMatch[1];
            const dataMatch = html.match(/data=["']([^"']*\.pdf[^"']*)["']/i);
            if (dataMatch) return dataMatch[1];
            const hrefMatch = html.match(/href=["']([^"']*\.pdf[^"']*)["']/i);
            if (hrefMatch) return hrefMatch[1];
            return null;
          };

          const pdfUrl = isPdfOnly ? extractPdfUrl(dashContent) : null;

          return (
            <section
              key={index}
              className="dash-section relative py-16 overflow-hidden"
              style={{
                backgroundColor: '#FFFFFF',
                backgroundImage: dashBackgrounds[index % dashBackgrounds.length] ? `url("${dashBackgrounds[index % dashBackgrounds.length]}")` : 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundSize: '100% 100%',
                marginBottom: isLastSection ? '4rem' : undefined,
              }}
            >
              <div className="container mx-auto px-4 relative z-10">
                {dashItem.titulo && (
                  <h2
                    className="text-center mb-8"
                    style={{ color: '#481276' }}
                    dangerouslySetInnerHTML={{ __html: dashItem.titulo }}
                  />
                )}

                {dashContent ? (
                  <>
                    {/* Desktop: show embed */}
                    <div
                      className="mx-auto dash-content hidden lg:block"
                      style={{ maxWidth: '800px' }}
                      dangerouslySetInnerHTML={{ __html: dashContent }}
                    />
                    {/* Mobile: show download button if PDF only, otherwise show embed */}
                    {isPdfOnly && pdfUrl ? (
                      <div className="lg:hidden flex justify-center">
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="px-6 py-3 rounded-lg font-medium transition-colors"
                          style={{ backgroundColor: '#B80F66', color: '#fff' }}
                        >
                          Baixar na íntegra
                        </a>
                      </div>
                    ) : (
                      <div
                        className="mx-auto dash-content lg:hidden"
                        style={{ maxWidth: '1000px' }}
                        dangerouslySetInnerHTML={{ __html: dashContent }}
                      />
                    )}
                  </>
                ) : (
                  <div
                    className="bg-[#D9D9D9] rounded-lg p-8 mx-auto flex items-center justify-center"
                    style={{
                      maxWidth: '800px',
                      minHeight: '300px',
                    }}
                  >
                    <p
                      className="text-center font-bold"
                      style={{ color: '#666', fontSize: '1.25rem' }}
                    >
                      {dashItem.titulo || 'MÍDIA (PDF/DASHBOARD)'}
                    </p>
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Content After Dash Section - From ACF acf.conteudo_depois_do_dash */}
        {conteudoDepoisDoDash && (
          <section
            className="py-16"
            style={{
              backgroundColor: '#FFFFFF',
              marginBottom: '4rem',
            }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div
                  className="prose prose-lg max-w-none projeto-content"
                  style={{ color: '#000' }}
                  dangerouslySetInnerHTML={{ __html: conteudoDepoisDoDash }}
                />
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjetoDetalhe;
