"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const arrowNav = "/assets/arrow-nav.svg";
import { useWordPressPage } from "@/hooks/useWordPressPage";

const womenInLaw = "/assets/partners/8-WOMEN_IN_LAW.png";
const dialogoMasculino = "/assets/partners/10-DIALOGO_MASCULINO.png";
const mulheresDeDireito = "/assets/partners/11-MULHERES_DE_DIREITO.png";
const grupoDePesquisa = "/assets/partners/13-GRUPO_DE_PESQUISA.png";
const transparenciaEleitoral = "/assets/partners/14-TRANSPARENCIA_ELEITORAL.png";
const politize = "/assets/partners/15-POLITIZE.png";
const queroVoceEleita = "/assets/partners/16-QUERO_VOCÊ_ELEITA.png";
const vamosJuntas = "/assets/partners/17-VAMOS_JUNTAS.png";
const agoraEQueSaoElas = "/assets/partners/19-AGORA_É_QUE_SÃO_ELAS.png";

// First slide logos
const slide1Logo1 = "/assets/partners/slide1-1.jpg";
const slide1Logo2 = "/assets/partners/slide1-2.jpg";
const slide1Logo3 = "/assets/partners/slide1-3.jpg";
const slide1Logo4 = "/assets/partners/slide1-4.jpg";
const slide1Logo5 = "/assets/partners/slide1-5.jpg";
const slide1Logo6 = "/assets/partners/slide1-6.jpg";
const slide1Logo7 = "/assets/partners/slide1-7.jpg";
const slide1Logo8 = "/assets/partners/slide1-8.jpg";
const slide1Logo9 = "/assets/partners/slide1-9.jpg";

// Second slide logos
const slide2Logo1 = "/assets/partners/slide2-1.jpg";
const slide2Logo2 = "/assets/partners/slide2-2.jpg";
const slide2Logo3 = "/assets/partners/slide2-3.jpg";
const slide2Logo4 = "/assets/partners/slide2-4.jpg";
const slide2Logo5 = "/assets/partners/slide2-5.jpg";
const slide2Logo6 = "/assets/partners/slide2-6.jpg";
const slide2Logo7 = "/assets/partners/slide2-7.jpg";
const slide2Logo8 = "/assets/partners/slide2-8.jpg";
const slide2Logo9 = "/assets/partners/slide2-9.jpg";

// Third slide logos
const slide3Logo1 = "/assets/partners/slide3-1.jpg";
const slide3Logo2 = "/assets/partners/slide3-2.jpg";
const slide3Logo3 = "/assets/partners/slide3-3.jpg";
const slide3Logo4 = "/assets/partners/slide3-4.jpg";
const slide3Logo5 = "/assets/partners/slide3-5.jpg";
const slide3Logo6 = "/assets/partners/slide3-6.jpg";
const slide3Logo7 = "/assets/partners/slide3-7.jpg";
const slide3Logo8 = "/assets/partners/slide3-8.jpg";
const slide3Logo9 = "/assets/partners/slide3-9.jpg";

// Fourth slide logos
const slide4Logo1 = "/assets/partners/slide4-1.jpg";
const slide4Logo2 = "/assets/partners/slide4-2.jpg";
const slide4Logo3 = "/assets/partners/slide4-3.jpg";
const slide4Logo4 = "/assets/partners/slide4-4.jpg";
const slide4Logo5 = "/assets/partners/slide4-5.jpg";
const slide4Logo6 = "/assets/partners/slide4-6.jpg";
const slide4Logo7 = "/assets/partners/slide4-7.jpg";
const slide4Logo8 = "/assets/partners/slide4-8.jpg";
const slide4Logo9 = "/assets/partners/slide4-9.jpg";

// Fifth slide logos
const slide5Logo1 = "/assets/partners/slide5-1.jpg";
const slide5Logo2 = "/assets/partners/slide5-2.jpg";
const slide5Logo3 = "/assets/partners/slide5-3.jpg";
const slide5Logo4 = "/assets/partners/slide5-4.jpg";
const slide5Logo5 = "/assets/partners/slide5-5.jpg";
const slide5Logo6 = "/assets/partners/slide5-6.jpg";
const slide5Logo7 = "/assets/partners/slide5-7.jpg";
const slide5Logo8 = "/assets/partners/slide5-8.jpg";
const slide5Logo9 = "/assets/partners/slide5-9.jpg";

// Sixth slide logos
const slide6Logo1 = "/assets/partners/slide6-1.jpg";
const slide6Logo2 = "/assets/partners/slide6-2.jpg";
const slide6Logo3 = "/assets/partners/slide6-3.jpg";
const slide6Logo4 = "/assets/partners/slide6-4.jpg";
const slide6Logo5 = "/assets/partners/slide6-5.jpg";
const slide6Logo6 = "/assets/partners/slide6-6.jpg";
const slide6Logo7 = "/assets/partners/slide6-7.jpg";
const slide6Logo8 = "/assets/partners/slide6-8.jpg";
const slide6Logo9 = "/assets/partners/slide6-9.jpg";

// Seventh slide logos
const slide7Logo1 = "/assets/partners/slide7-1.jpg";
const slide7Logo2 = "/assets/partners/slide7-2.jpg";
const slide7Logo3 = "/assets/partners/slide7-3.jpg";
const slide7Logo4 = "/assets/partners/slide7-4.jpg";
const slide7Logo5 = "/assets/partners/slide7-5.jpg";

const PartnersSection = () => {
  const { data } = useWordPressPage();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Start autoplay when section becomes visible
          if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.start();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const partnersRow1 = [
    womenInLaw,
    dialogoMasculino,
    mulheresDeDireito,
    grupoDePesquisa
  ];

  const partnersRow2 = [
    transparenciaEleitoral,
    politize,
    queroVoceEleita,
    vamosJuntas,
    agoraEQueSaoElas
  ];

  // First slide specific logos
  const slide1Row1 = [
    slide1Logo1,
    slide1Logo2,
    slide1Logo3,
    slide1Logo4
  ];

  const slide1Row2 = [
    slide1Logo5,
    slide1Logo6,
    slide1Logo7,
    slide1Logo8,
    slide1Logo9
  ];

  // Second slide specific logos
  const slide2Row1 = [
    slide2Logo1,
    slide2Logo2,
    slide2Logo3,
    slide2Logo4
  ];

  const slide2Row2 = [
    slide2Logo5,
    slide2Logo6,
    slide2Logo7,
    slide2Logo8,
    slide2Logo9
  ];

  // Third slide specific logos
  const slide3Row1 = [
    slide3Logo1,
    slide3Logo2,
    slide3Logo3,
    slide3Logo4
  ];

  const slide3Row2 = [
    slide3Logo5,
    slide3Logo6,
    slide3Logo7,
    slide3Logo8,
    slide3Logo9
  ];

  // Fourth slide specific logos
  const slide4Row1 = [
    slide4Logo1,
    slide4Logo2,
    slide4Logo3,
    slide4Logo4
  ];

  const slide4Row2 = [
    slide4Logo5,
    slide4Logo6,
    slide4Logo7,
    slide4Logo8,
    slide4Logo9
  ];

  // Fifth slide specific logos
  const slide5Row1 = [
    slide5Logo1,
    slide5Logo2,
    slide5Logo3,
    slide5Logo4
  ];

  const slide5Row2 = [
    slide5Logo5,
    slide5Logo6,
    slide5Logo7,
    slide5Logo8,
    slide5Logo9
  ];

  // Sixth slide specific logos
  const slide6Row1 = [
    slide6Logo1,
    slide6Logo2,
    slide6Logo3,
    slide6Logo4
  ];

  const slide6Row2 = [
    slide6Logo5,
    slide6Logo6,
    slide6Logo7,
    slide6Logo8,
    slide6Logo9
  ];

  // Seventh slide specific logos - only 5 boxes
  const slide7Row1: any[] = [];

  const slide7Row2 = [
    slide7Logo1,
    slide7Logo2,
    slide7Logo3,
    slide7Logo4,
    slide7Logo5
  ];

  // Creating slides from WordPress data or fallback to hardcoded
  const desktopSlides = data?.acf?.parcerias?.slide?.map(slide => ({
    row1: slide.logo.slice(0, 4).map(item => item.imagem),
    row2: slide.logo.slice(4, 9).map(item => item.imagem)
  })) || [
    {
      row1: slide1Row1,
      row2: slide1Row2
    },
    {
      row1: slide2Row1,
      row2: slide2Row2
    },
    {
      row1: slide3Row1,
      row2: slide3Row2
    },
    {
      row1: slide4Row1,
      row2: slide4Row2
    },
    {
      row1: slide5Row1,
      row2: slide5Row2
    },
    {
      row1: slide6Row1,
      row2: slide6Row2
    },
    {
      row1: slide7Row1,
      row2: slide7Row2
    }
  ];

  // For mobile, reorganize all logos into slides with 2 boxes each
  const allLogos = data?.acf?.parcerias?.slide?.flatMap(slide =>
    slide.logo.map(item => item.imagem)
  ) || [
    ...slide1Row1, ...slide1Row2,
    ...slide2Row1, ...slide2Row2,
    ...slide3Row1, ...slide3Row2,
    ...slide4Row1, ...slide4Row2,
    ...slide5Row1, ...slide5Row2,
    ...slide6Row1, ...slide6Row2,
    ...slide7Row2
  ];

  const mobileSlides = [];
  for (let i = 0; i < allLogos.length; i += 2) {
    mobileSlides.push({
      logos: allLogos.slice(i, i + 2)
    });
  }

  const slides = isMobile ? mobileSlides : desktopSlides;
  const showNavigation = slides.length > 1;

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ color: '#481276' }}>
            {data?.acf?.parcerias?.titulo || "Parcerias"}
          </h2>
          <p className="text-lg" style={{ color: '#000000' }}>
            {data?.acf?.parcerias?.texto || "A transformação acontece em rede!"}
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            navigation={showNavigation ? {
              prevEl: '.swiper-button-prev-partners',
              nextEl: '.swiper-button-next-partners',
            } : false}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={showNavigation ? {
              delay: 6000,
              disableOnInteraction: false,
            } : false}
            initialSlide={0}
            onInit={(swiper) => {
              // Stop autoplay initially - will start when section is visible
              if (swiper.autoplay) {
                swiper.autoplay.stop();
              }
            }}
            className="partners-swiper"
          >
            {slides.map((slide, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                {isMobile ? (
                  // Mobile layout: 2 boxes per slide
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center gap-6 flex-wrap"
                  >
                    {(slide as any).logos.map((logo: any, index: number) => (
                      <motion.div
                        key={`mobile-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-center hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundColor: '#E6007E',
                          borderRadius: '8px',
                          padding: '8px',
                          width: '200px',
                          height: '150px'
                        }}
                      >
                        <img
                          src={logo}
                          alt={`Parceiro ${slideIndex * 2 + index + 1}`}
                          className="w-full h-full object-contain"
                          loading="eager"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  // Desktop layout: 4 boxes + 5 boxes
                  <div className="space-y-6">
                    {/* First row - 4 boxes */}
                    {(slide as any).row1.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                        className="flex justify-center gap-6 flex-wrap"
                      >
                        {(slide as any).row1.map((logo: any, index: number) => (
                          <motion.div
                            key={`row1-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-center hover:scale-105 transition-transform duration-300"
                            style={{
                              backgroundColor: '#E6007E',
                              borderRadius: '8px',
                              padding: '8px',
                              width: '200px',
                              height: '150px'
                            }}
                          >
                            <img
                              src={logo}
                              alt={`Parceiro ${index + 1}`}
                              className="w-full h-full object-contain"
                              loading="eager"
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Second row - 5 boxes */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
                      className="flex justify-center gap-6 flex-wrap"
                    >
                      {(slide as any).row2.map((logo: any, index: number) => (
                        <motion.div
                          key={`row2-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex items-center justify-center hover:scale-105 transition-transform duration-300"
                          style={{
                            backgroundColor: '#E6007E',
                            borderRadius: '8px',
                            padding: '8px',
                            width: '200px',
                            height: '150px'
                          }}
                        >
                          <img
                            src={logo}
                            alt={`Parceiro ${partnersRow1.length + index + 1}`}
                            className="w-full h-full object-contain"
                            loading="eager"
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {showNavigation && (
            <>
              <button className="swiper-button-prev-partners absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10 rotate-180">
                <img src={arrowNav} alt="Previous" className="w-2 h-3" />
              </button>
              <button className="swiper-button-next-partners absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10">
                <img src={arrowNav} alt="Next" className="w-2 h-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
