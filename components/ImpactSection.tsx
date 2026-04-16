"use client";
import { motion } from "framer-motion";
const amareloFundo = "/assets/amarelo_fundo.svg";
import { useWordPressPage } from "@/hooks/useWordPressPage";

const ImpactSection = () => {
  const { data } = useWordPressPage();

  return (
    <section className="py-48 md:py-56 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={amareloFundo} alt="" className="w-full h-full object-none max-[1024px]:object-cover" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black text-center mb-16 text-[#1F1D1D]"
          dangerouslySetInnerHTML={{ __html: data?.acf?.secao_3?.titulo || "O Nosso Impacto" }}
        />

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {data?.acf?.secao_3?.item?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="col-span-1 md:col-span-2 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full mb-4 overflow-hidden">
                <img
                  src={stat.imagem}
                  alt={stat.texto}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="text-[20px] font-normal text-[#000000]"
                dangerouslySetInnerHTML={{ __html: stat.texto }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
