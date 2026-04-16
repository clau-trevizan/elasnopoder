"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const plusIcon = "/assets/plus.svg";
import { useWordPressPage } from "@/hooks/useWordPressPage";
import { useState } from "react";
import ReportsModal from "@/components/home/ReportsModal";

const CardsSection = () => {
  const { data } = useWordPressPage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    // If it's the second card (index 1), open modal instead of navigating
    if (index === 1) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 justify-center">
            {data?.acf?.secao_4_cards?.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`bg-card col-span-12 md:col-span-5 ${index === 0 ? 'md:col-start-2' : ''}`}
                style={{ borderRadius: '0' }}
              >
                <div
                  className="max-[1024px]:h-auto rounded-2xl cursor-pointer"
                  style={{ maxHeight: '250px' }}
                  onClick={(e) => handleCardClick(index, e)}
                >
                  <img src={card.imagem} alt={card.titulo} className="w-full h-full object-cover max-[1024px]:object-cover rounded-2xl" style={{ maxHeight: '250px' }} />
                </div>
                <div className="p-8 px-0 max-[1024px]:py-0" style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <h5
                    className="text-h5 font-normal my-8"
                    dangerouslySetInnerHTML={{ __html: card.titulo }}
                  />
                  {index === 1 ? (
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 group w-fit"
                    >
                      <img src={plusIcon} alt="" className="w-3 h-3 plus-icon" />
                      {card.texto_do_botao}
                    </Button>
                  ) : (
                    <Button asChild className="flex items-center gap-2 group w-fit">
                      <a href={card.link_do_botao} target="_blank" rel="noopener noreferrer">
                        <img src={plusIcon} alt="" className="w-3 h-3 plus-icon" />
                        {card.texto_do_botao}
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReportsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle="Relatórios de Atividades"
        modalDescription="Selecione um relatório para visualizar"
        reportsData={data?.acf?.relatorios_financeiros || []}
      />
    </>
  );
};

export default CardsSection;
