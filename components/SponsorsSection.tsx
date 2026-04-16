"use client";
import { motion } from "framer-motion";
import { useWordPressPage } from "@/hooks/useWordPressPage";
const fundoFinanciadores = "/assets/fundo_financiadores-2.svg";
const avina = "/assets/sponsors/avina.jpg";
const openSociety = "/assets/sponsors/open-society.jpg";
const luminate = "/assets/sponsors/luminate.jpg";
const galoDaManha = "/assets/sponsors/galo-da-manha.jpg";
const pulsante = "/assets/sponsors/pulsante.jpg";
const british = "/assets/sponsors/british-council.jpg";
const cargil = "/assets/sponsors/fundacao-cargill.jpg";
const paisesBaixos = "/assets/sponsors/paises-baixos.jpg";
const usEmbassy = "/assets/sponsors/us-embassy.jpg";
const unicef = "/assets/sponsors/unicef.jpg";
const elasFundo = "/assets/sponsors/elas-fundo.jpg";

const SponsorsSection = () => {
  const { data } = useWordPressPage();

  const firstRowSponsors = data?.acf?.financiadores?.linha_1?.logo?.map(item => item.imagem) || [
    avina,
    openSociety,
    luminate,
    galoDaManha,
    pulsante
  ];

  const secondRowSponsors = data?.acf?.financiadores?.linha_2?.logo?.map(item => item.imagem) || [
    british,
    cargil,
    paisesBaixos,
    usEmbassy,
    unicef,
    elasFundo
  ];

  return (
    <section className="relative overflow-hidden max-[1024px]:pt-40 max-[1024px]:pb-40" style={{ paddingTop: '16rem', paddingBottom: '12rem' }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${fundoFinanciadores}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="container mx-auto px-6 relative z-10 mb-12">
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 md:col-start-4 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ color: '#3B0E23' }}>
              {data?.acf?.financiadores?.titulo || "Financiadores"}
            </h2>
            <p className="text-lg" style={{ color: '#000000' }}>
              {data?.acf?.financiadores?.texto || "Com o apoio de quem acredita na transformação, seguimos formando meninas e mulheres para liderar o futuro."}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="space-y-8 w-full">
        {/* First marquee line */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -1920]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear"
              }
            }}
          >
            {[...firstRowSponsors, ...firstRowSponsors, ...firstRowSponsors, ...firstRowSponsors].map((logo, index) => (
              <div
                key={index}
                className="rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#2A0F44', borderRadius: '8px', padding: '5px', width: '180px', height: '130px' }}
              >
                <img
                  src={logo}
                  alt={`Financiador ${(index % firstRowSponsors.length) + 1}`}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second marquee line */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [-1920, 0]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear"
              }
            }}
          >
            {[...secondRowSponsors, ...secondRowSponsors, ...secondRowSponsors, ...secondRowSponsors].map((logo, index) => (
              <div
                key={`second-${index}`}
                className="rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#2A0F44', borderRadius: '8px', padding: '5px', width: '180px', height: '130px' }}
              >
                <img
                  src={logo}
                  alt={`Financiador ${(index % secondRowSponsors.length) + 1}`}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
