"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
const arrowNav = "/assets/arrow-nav.svg";
const bgImage = "/assets/projetos-bg3.svg";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useWordPressProjetos, WordPressProjetoPost } from "@/hooks/useWordPressProjetos";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWordPressProjetosPage } from "@/hooks/useWordPressProjetosPage";
import { useLanguage } from "@/hooks/useLanguage";

const NossosProjetosSection = () => {
  const { data: projetos, isLoading } = useWordPressProjetos();
  const { data: pageData, isLoading: isPageLoading } = useWordPressProjetosPage();
  const isMobile = useIsMobile();
  const { language, buildLink } = useLanguage();

  const sectionTitle = pageData?.acf?.secao_3?.titulo || 'Nossos Projetos';

  const getFeaturedImage = (post: any) => {
    return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://placehold.co/600x400/E6007E/fff?text=Projeto";
  };

  const getProjectTitle = (project: WordPressProjetoPost) => {
    if (language === "ENG" && project.acf?.ingles?.titulo) {
      return project.acf.ingles.titulo;
    }
    if (language === "ESP" && project.acf?.espanhol?.titulo) {
      return project.acf.espanhol.titulo;
    }
    return project.title.rendered;
  };

  const getExcerpt = (project: WordPressProjetoPost) => {
    if (language === "ENG" && project.acf?.ingles?.resumo) {
      return project.acf.ingles.resumo;
    }
    if (language === "ESP" && project.acf?.espanhol?.resumo) {
      return project.acf.espanhol.resumo;
    }
    return project.excerpt?.rendered || "";
  };

  const getProjectLink = (project: WordPressProjetoPost) => {
    const externalLink = project.acf?.url_externa;
    if (externalLink && externalLink.trim() !== '') {
      return { href: externalLink, isExternal: true };
    }
    return { href: buildLink(`/projetos/${project.slug}`), isExternal: false };
  };

  const getReadMoreLabel = () => {
    if (language === "ENG") return "Learn more";
    if (language === "ESP") return "Más información";
    return "Ler mais";
  };

  const featuredProjects = projetos?.slice(0, 2) || [];
  const carouselProjects = projetos?.slice(2) || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-[#F5E6FF]" style={{ borderTopLeftRadius: '40px', borderTopRightRadius: '40px' }}>
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mx-auto mb-16" />

          {/* Featured Project Skeleton */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-center">
            <div className="col-span-12 md:col-span-6">
              <Skeleton className="w-full h-[300px] rounded-2xl" />
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Second Featured Project Skeleton */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-center">
            <div className="col-span-12 md:col-span-5 order-1">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-6" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="col-span-12 md:col-span-6 order-2 md:col-start-7">
              <Skeleton className="w-full h-[300px] rounded-2xl" />
            </div>
          </div>

          {/* Carousel Skeleton */}
          <div className="flex gap-4 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1/4 hidden md:block">
                <Skeleton className="w-full h-[180px] rounded-2xl mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden nossos-projetos-section"
      style={{
        backgroundColor: '#F5E6FF',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isMobile ? 'center top 150px' : 'center top 150px',
        paddingTop: isMobile ? '3rem' : '6rem',
        paddingBottom: isMobile ? 'calc(3rem + 40px)' : 'calc(6rem + 40px)',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        bottom: '0',
      }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-center mb-16" style={{ color: '#481276' }}>
          {sectionTitle}
        </h1>

        {/* Featured Projects */}
        {featuredProjects.map((project, index) => {
          const linkInfo = getProjectLink(project);
          // On mobile, second project (index 1) should have image first (order-1), content second (order-2)
          // On desktop, second project has content first, image second
          const isSecondProject = index === 1;
          const imageOrderClass = isSecondProject
            ? (isMobile ? 'order-1' : 'order-2 md:col-start-7')
            : '';
          const contentOrderClass = isSecondProject
            ? (isMobile ? 'order-2' : 'order-1')
            : 'md:col-start-8';

          return (
            <div key={project.id} className="grid grid-cols-12 gap-8 mb-16 items-center">
              <div className={`col-span-12 md:col-span-6 ${imageOrderClass}`}>
                {linkInfo.isExternal ? (
                  <a href={linkInfo.href} target="_blank" rel="noopener noreferrer">
                    <img
                      src={getFeaturedImage(project)}
                      alt={project.title.rendered}
                      className="w-full h-auto rounded-2xl object-cover hover:opacity-90 transition-opacity"
                    />
                  </a>
                ) : (
                  <Link href={linkInfo.href}>
                    <img
                      src={getFeaturedImage(project)}
                      alt={project.title.rendered}
                      className="w-full h-auto rounded-2xl object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                )}
              </div>
              <div className={`col-span-12 md:col-span-5 ${contentOrderClass}`}>
                {linkInfo.isExternal ? (
                  <a href={linkInfo.href} target="_blank" rel="noopener noreferrer">
                    <h1 style={{ color: '#481276' }} className="mb-4 hover:opacity-80 transition-opacity" dangerouslySetInnerHTML={{ __html: getProjectTitle(project) }} />
                  </a>
                ) : (
                  <Link href={linkInfo.href}>
                    <h1 style={{ color: '#481276' }} className="mb-4 hover:opacity-80 transition-opacity" dangerouslySetInnerHTML={{ __html: getProjectTitle(project) }} />
                  </Link>
                )}
                <div
                  className="text-foreground mb-6"
                  dangerouslySetInnerHTML={{ __html: getExcerpt(project) }}
                />
                <Button
                  className="bg-primary text-white hover:bg-[#621238]"
                  asChild
                >
                  {linkInfo.isExternal ? (
                    <a href={linkInfo.href} target="_blank" rel="noopener noreferrer">
                      <Plus className="w-4 h-4 mr-2 plus-icon" />
                      {getReadMoreLabel()}
                    </a>
                  ) : (
                    <Link href={linkInfo.href}>
                      <Plus className="w-4 h-4 mr-2 plus-icon" />
                      {getReadMoreLabel()}
                    </Link>
                  )}
                </Button>
              </div>
            </div>
          );
        })}

        {/* Projects Carousel */}
        {carouselProjects.length > 0 && (
          <Carousel
            className="w-full max-w-5xl mx-auto"
            opts={{
              slidesToScroll: isMobile ? 1 : 4,
            }}
          >
            <CarouselContent className={isMobile ? "-ml-2" : ""}>
              {carouselProjects.map((project) => {
                const linkInfo = getProjectLink(project);
                return (
                  <CarouselItem key={project.id} className={isMobile ? "basis-[85%] pl-2" : "md:basis-1/4 basis-1/2"}>
                    <div className="p-2">
                      {linkInfo.isExternal ? (
                        <a href={linkInfo.href} target="_blank" rel="noopener noreferrer">
                          <img
                            src={getFeaturedImage(project)}
                            alt={project.title.rendered}
                            className="w-full rounded-2xl mb-4 hover:opacity-90 transition-opacity"
                            style={{ height: '180px', objectFit: 'cover' }}
                          />
                        </a>
                      ) : (
                        <Link href={linkInfo.href}>
                          <img
                            src={getFeaturedImage(project)}
                            alt={project.title.rendered}
                            className="w-full rounded-2xl mb-4 hover:opacity-90 transition-opacity"
                            style={{ height: '180px', objectFit: 'cover' }}
                          />
                        </Link>
                      )}
                      {linkInfo.isExternal ? (
                        <a href={linkInfo.href} target="_blank" rel="noopener noreferrer">
                          <div
                            className="text-sm mb-4 hover:opacity-80 transition-opacity carousel-post-excerpt line-clamp-3"
                            style={{
                              color: '#000',
                              fontWeight: 400,
                              lineHeight: 'normal',
                              minHeight: '70px',
                              ...(language === "ENG" || language === "ESP" ? { fontSize: '1.1875rem' } : {})
                            }}
                            dangerouslySetInnerHTML={{ __html: getExcerpt(project) }}
                          />
                        </a>
                      ) : (
                        <Link href={linkInfo.href}>
                          <div
                            className="text-sm mb-4 hover:opacity-80 transition-opacity carousel-post-excerpt line-clamp-3"
                            style={{
                              color: '#000',
                              fontWeight: 400,
                              lineHeight: 'normal',
                              minHeight: '70px',
                              ...(language === "ENG" || language === "ESP" ? { fontSize: '1.1875rem' } : {})
                            }}
                            dangerouslySetInnerHTML={{ __html: getExcerpt(project) }}
                          />
                        </Link>
                      )}
                      <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-[#621238] w-full"
                        asChild
                      >
                        {linkInfo.isExternal ? (
                          <a href={linkInfo.href} target="_blank" rel="noopener noreferrer">
                            <Plus className="w-3 h-3 mr-1 plus-icon" />
                            {getReadMoreLabel()}
                          </a>
                        ) : (
                          <Link href={linkInfo.href}>
                            <Plus className="w-3 h-3 mr-1 plus-icon" />
                            {getReadMoreLabel()}
                          </Link>
                        )}
                      </Button>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className={`hover:bg-white hover:text-black hover:border-gray-300 ${isMobile ? 'flex' : ''}`}>
              <img src={arrowNav} alt="Previous" className="w-3 h-3 rotate-180" />
            </CarouselPrevious>
            <CarouselNext className={`hover:bg-white hover:text-black hover:border-gray-300 ${isMobile ? 'flex' : ''}`}>
              <img src={arrowNav} alt="Next" className="w-3 h-3" />
            </CarouselNext>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default NossosProjetosSection;
