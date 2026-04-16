"use client";
import { useWordPressPage } from "@/hooks/useWordPressPage";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

const Hero = () => {
  const { data } = useWordPressPage();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = data?.acf?.video_banner || "";

  // Force autoplay when video is loaded
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.play().catch(() => {
        // Autoplay failed, video will show but not play automatically
      });
    }
  }, [videoUrl]);

  return (
    <section className="overflow-hidden rounded-b-[16px]" style={{ backgroundColor: '#e6007c', height: isMobile ? '25vh' : '65vh', minHeight: isMobile ? 'auto' : '450px' }}>
      <div style={{ position: 'relative', overflow: 'hidden', maxWidth: '100%', paddingBottom: '0', height: '100%' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#e6007c]">
            <div className="relative flex items-center justify-center">
              {/* Pulsing ring */}
              <div className="absolute w-24 h-24 rounded-full border-4 border-white/30 animate-ping" />
              {/* Play icon container */}
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        )}
        {videoUrl && (
          <video
            ref={videoRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            className="pointer-events-none"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onLoadedData={() => setIsLoading(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
