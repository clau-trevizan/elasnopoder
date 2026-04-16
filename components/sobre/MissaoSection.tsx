"use client";
import { useWordPressSobreNos } from "@/hooks/useWordPressSobreNos";
const missaoBg = "/assets/missao-section-bg.svg";

const MissaoSection = () => {
  const { data } = useWordPressSobreNos();

  const titulo = data?.acf?.secao_3?.titulo || "Missão, Visão e Valores";
  const texto = data?.acf?.secao_3?.texto || "";
  const imagem = data?.acf?.secao_3?.imagem || "";

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden missao-section"
      style={{
        backgroundImage: `url("${missaoBg}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <style>{`
        .missao-section {
          background-size: cover;
        }
        @media (min-width: 1025px) {
          .missao-section {
            background-size: contain;
          }
        }
      `}</style>
      <div className="container mx-auto px-4 relative z-10">
        {/* Title - 12 columns centered */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center mb-12">
            <h1
              style={{ color: '#481276' }}
              dangerouslySetInnerHTML={{ __html: titulo }}
            />
          </div>
        </div>

        {/* Text and Image - 5 cols each, centered */}
        <div className="grid grid-cols-12 gap-8 items-center justify-center">
          <div className="col-span-12 md:col-start-2 md:col-span-5">
            {texto ? (
              <div
                className="space-y-6 text-foreground"
                dangerouslySetInnerHTML={{ __html: texto }}
              />
            ) : (
              <div className="space-y-6 text-foreground">
                <p>
                  A Elas no Poder tem como <strong>missão impulsionar a participação cívica de adolescentes e mulheres</strong> em espaços de decisão, fortalecendo a democracia e promovendo a equidade de gênero e raça.
                </p>

                <p>
                  Nossa <strong>visão</strong> é ser referência na construção de uma Brasil em que meninas e mulheres diversas liderem com propósito e transformem estruturas de poder.
                </p>

                <p>
                  Atuamos guiadas por <strong>valores</strong> que sustentam nossas lutas: coragem para transformar, coletividade com responsabilidade, amor como ação política, formação como caminho e potência interseccional.
                </p>
              </div>
            )}
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="rounded-lg overflow-hidden">
              {imagem ? (
                <img
                  src={imagem}
                  alt="Mulheres em evento Elas no Poder"
                  className="w-full h-auto object-cover rounded-lg"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop"
                  alt="Mulheres em evento Elas no Poder"
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissaoSection;
