"use client";
import { Button } from "@/components/ui/button";
import { useWordPressSobreNos } from "@/hooks/useWordPressSobreNos";
const conhecaBg = "/assets/conheca-section-bg.svg";

const ConhecaSection = () => {
  const { data } = useWordPressSobreNos();

  const titulo = data?.acf?.secao_2?.titulo || "Conheça a Elas no Poder";
  const texto = data?.acf?.secao_2?.texto || "";
  const textoBotao = data?.acf?.secao_2?.texto_botao || "Faça uma doação";
  const linkBotao = data?.acf?.secao_2?.link_botao || "https://grifa.me/instituicao/elasnopoderbr";

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url("${conhecaBg}")`,
        backgroundSize: 'contain',
        backgroundPosition: 'top 180px center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 items-center min-h-[60vh]">
          {/* Content - 9 columns centered */}
          <div className="col-span-12 md:col-start-3 md:col-span-9">
            <h1
              className="mb-8"
              style={{ color: '#481276' }}
              dangerouslySetInnerHTML={{ __html: titulo }}
            />

            {texto ? (
              <div
                className="space-y-6 text-foreground"
                dangerouslySetInnerHTML={{ __html: texto }}
              />
            ) : (
              <div className="space-y-6 text-foreground">
                <p>
                  A <strong>Elas no Poder</strong> nasceu em 2018, quando <strong>Karin Vervuurt</strong> e <strong>Letícia Medeiros</strong> identificaram um desafio estrutural: as mulheres tinham menos acesso a recursos, formação e voz para disputar espaços de liderança.
                </p>

                <p>
                  Desde então, a organização atua para <strong>democratizar o conhecimento político e fortalecer a presença de mulheres na política</strong>, enfrentando barreiras históricas de gênero, raça e território.
                </p>

                <p>
                  Desde 2018, como organização sem fins lucrativos, a Elas no Poder <strong>atua em todo o Brasil</strong> com programas de educação política, capacitação eleitoral e pesquisa, oferecendo novas lideranças femininas as ferramentas para construir poder e ocupar a representatividade nas instituições.
                </p>

                <p>
                  Acreditamos que <strong>a transformação começa cedo</strong>: o que <strong>fortalecer meninas e mulheres é essencial para uma democracia mais justa</strong>, plural e efetiva para nós mulheres.
                </p>

                <p>
                  Com o apoio de uma rede diversa de lideranças, organizações e financiadores, seguimos formando, inspirando e conectando mulheres e meninas que querem usar a gente para mudar o Brasil.
                </p>
              </div>
            )}

            <div className="mt-10 flex justify-end">
              <Button asChild>
                <a href={linkBotao} target="_blank" rel="noopener noreferrer">
                  {textoBotao}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConhecaSection;
