"use client";
import { useWordPressSobreNos } from "@/hooks/useWordPressSobreNos";
import { useWordPressDiretoria } from "@/hooks/useWordPressDiretoria";
import { useLanguage } from "@/hooks/useLanguage";
import { Skeleton } from "@/components/ui/skeleton";
const diretoriaBg = "/assets/diretoria-section-bg.svg";

const DiretoriaSection = () => {
  const { data: pageData } = useWordPressSobreNos();
  const { data: diretoriaMembers, isLoading } = useWordPressDiretoria();
  const { language } = useLanguage();

  const titulo = pageData?.acf?.secao_4?.titulo || "Diretoria";

  return (
    <section
      className="relative overflow-hidden diretoria-section"
      style={{
        backgroundImage: `url("${diretoriaBg}")`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <style>{`
        .diretoria-section {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        @media (max-width: 1024px) {
          .diretoria-section .diretoria-grid {
            justify-content: center;
          }
          .diretoria-section .diretoria-member {
            width: 60%;
          }
          .diretoria-section .grid-cols-6 {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        @media (min-width: 1025px) {
          .diretoria-section {
            padding-top: 6rem;
            padding-bottom: 8rem;
          }
        }
      `}</style>
      <div className="container mx-auto px-4 relative z-10">
        {/* Content container - 6 columns centered */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-start-4 md:col-span-6">
            <h1 className="text-center mb-12" style={{ color: '#481276' }}>
              {titulo}
            </h1>

            {isLoading ? (
              <div className="grid grid-cols-6 gap-6 diretoria-grid">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="col-span-3 md:col-span-2 flex flex-col items-center text-center">
                    <Skeleton className="w-full h-[200px] mb-4" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-6">
                {diretoriaMembers?.map((member) => {
                  const featuredImage = member._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face";
                  const nome = member.title?.rendered || "";

                  // Select cargo field based on language
                  let cargo = member.acf?.cargo || "";
                  if (language === "ENG" && member.acf?.cargo_eng) {
                    cargo = member.acf.cargo_eng;
                  } else if (language === "ESP" && member.acf?.cargo_esp) {
                    cargo = member.acf.cargo_esp;
                  }

                  return (
                    <div key={member.id} className="col-span-3 md:col-span-2 flex flex-col items-center text-center diretoria-member">
                      <div className="overflow-hidden mb-4 w-full">
                        <img
                          src={featuredImage}
                          alt={nome}
                          className="object-cover w-full h-auto"
                        />
                      </div>
                      <span
                        className="block font-bold text-foreground mb-1"
                        dangerouslySetInnerHTML={{ __html: nome }}
                      />
                      <small className="block text-muted-foreground leading-tight">
                        {cargo}
                      </small>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiretoriaSection;
