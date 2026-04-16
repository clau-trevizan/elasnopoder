"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const arrowNav = "/assets/arrow-nav.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useWordPressPage } from "@/hooks/useWordPressPage";
import 'swiper/css';
import 'swiper/css/navigation';

const TransformSection = () => {
  const { data } = useWordPressPage();
  const slides = data?.acf?.secao_2_carrossel || [];

  const showNavigation = slides.length > 1;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 relative">
        <Swiper
          modules={[Navigation]}
          navigation={showNavigation ? {
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          } : false}
          spaceBetween={50}
          slidesPerView={1}
          className="transform-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="grid md:grid-cols-12 gap-6 items-center justify-center max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-5 md:col-start-2"
                >
                  <div className="rounded-3xl overflow-hidden aspect-square">
                    <img src={slide.imagem} alt="Mulheres em formação" className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6 md:col-span-5"
                >
                  <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: '#481276' }}>
                    {slide.titulo}
                  </h2>
                  <div
                    className="text-lg text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: slide.texto }}
                  />
                  <Button asChild>
                    <a href={slide.link_do_botao} target="_blank" rel="noopener noreferrer">
                      {slide.texto_do_botao}
                    </a>
                  </Button>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <>
            <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10 rotate-180">
              <img src={arrowNav} alt="Previous" className="w-2 h-3" />
            </button>
            <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10">
              <img src={arrowNav} alt="Next" className="w-2 h-3" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default TransformSection;
