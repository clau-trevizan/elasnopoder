"use client";
import { useWordPressSobreNos } from "@/hooks/useWordPressSobreNos";
import { useRef, useEffect } from "react";
const bgSecao1 = "/assets/bg-secao1.jpg";

const SobreHeroSection = () => {
  const { data } = useWordPressSobreNos();
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = data?.acf?.secao_1?.link_do_video || "";

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
      });
    }
  }, [videoUrl]);

  return (
    <section
      className="relative overflow-hidden sobre-hero-section"
      style={{
        backgroundImage: `url("${bgSecao1}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        height: '65vh',
        minHeight: '390px',
      }}
    >
      <style>{`
        @media (min-width: 1024px) {
          .sobre-hero-section {
            background-position: center top -90px !important;
            background-color: #e6007e !important;
          }
        }
        @media (max-width: 1024px) {
          .sobre-hero-section {
            background-size: cover !important;
            background-color: #e6007e !important;
          }
          .sobre-hero-section .hero-video-wrapper {
            width: 55% !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10" style={{ paddingTop: '2rem', paddingBottom: '2rem', height: '100%' }}>
        <div className="grid grid-cols-12 gap-8 items-center" style={{ height: '100%' }}>
          {/* Video vertical - 4 columns with 2 column offset */}
          <div className="col-span-12 md:col-start-3 md:col-span-4 flex justify-center hero-video-wrapper" style={{ height: '100%' }}>
            <div
              className="relative overflow-hidden mx-auto"
              style={{
                aspectRatio: '9/16',
                width: 'auto',
                maxWidth: '230px',
                borderRadius: '32px',
              }}
            >
              {videoUrl ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={videoUrl}
                  autoPlay
                  playsInline
                  muted
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground"
                >
                  Carregando vídeo...
                </div>
              )}
            </div>
          </div>

          {/* Empty space - 2 columns, skipping 1 column (col-start-8) */}
          <div className="col-span-12 md:col-start-8 md:col-span-2 flex justify-center items-center">
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreHeroSection;
