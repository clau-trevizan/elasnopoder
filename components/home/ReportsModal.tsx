"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
const arrowNav = "/assets/arrow-nav.svg";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReportItem {
  capa: string;
  pdf: string;
}

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  modalDescription?: string;
  reportsData?: ReportItem[];
}

const ReportsModal = ({
  isOpen,
  onClose,
  modalTitle = "Title modal",
  modalDescription = "Content description",
  reportsData = []
}: ReportsModalProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'pdf'>('grid');
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const [gridApi, setGridApi] = useState<CarouselApi>();
  const [pdfApi, setPdfApi] = useState<CarouselApi>();
  const [gridCurrent, setGridCurrent] = useState(0);
  const [pdfCurrent, setPdfCurrent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileOrTablet = windowWidth <= 1024;
  const itemsPerSlide = isMobileOrTablet ? 1 : 6;

  // Group reports into slides
  const slides = [];
  for (let i = 0; i < reportsData.length; i += itemsPerSlide) {
    slides.push(reportsData.slice(i, i + itemsPerSlide));
  }

  useEffect(() => {
    if (!gridApi) return;
    gridApi.on("select", () => {
      setGridCurrent(gridApi.selectedScrollSnap());
    });
  }, [gridApi]);

  useEffect(() => {
    if (!pdfApi) return;
    pdfApi.on("select", () => {
      setPdfCurrent(pdfApi.selectedScrollSnap());
    });
  }, [pdfApi]);

  const handleCoverClick = (globalIndex: number) => {
    setSelectedPdfIndex(globalIndex);
    setPdfCurrent(globalIndex);
    setViewMode('pdf');
  };

  const handleBackToGrid = () => {
    setViewMode('grid');
  };

  // Sync PDF carousel to selected index when switching to PDF view
  useEffect(() => {
    if (viewMode === 'pdf' && pdfApi) {
      pdfApi.scrollTo(selectedPdfIndex, true);
    }
  }, [viewMode, pdfApi, selectedPdfIndex]);

  const handleClose = () => {
    setViewMode('grid');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto reports-modal" style={{ maxWidth: isMobileOrTablet ? '95%' : '70%' }}>
        <DialogHeader>
          <DialogTitle className="text-left" style={{ color: '#481276', fontSize: '24px', fontWeight: 700 }}>
            {modalTitle}
          </DialogTitle>
        </DialogHeader>

        <p className="text-left mb-6 reports-modal-description" style={{ color: '#1F1D1D' }}>
          {modalDescription}
        </p>

        {viewMode === 'grid' ? (
          <>
            <Carousel setApi={setGridApi} className="w-full">
              <CarouselContent>
                {slides.map((slideItems, slideIndex) => (
                  <CarouselItem key={slideIndex}>
                    <div className={`grid gap-4 justify-items-center ${isMobileOrTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {slideItems.map((item, itemIndex) => {
                        const globalIndex = slideIndex * itemsPerSlide + itemIndex;
                        return (
                          <div
                            key={globalIndex}
                            className="cursor-pointer group"
                            onClick={() => handleCoverClick(globalIndex)}
                          >
                            <div
                              className="bg-[#D9D9D9] rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-80 transition-opacity"
                              style={{ width: isMobileOrTablet ? '140px' : '230px', height: isMobileOrTablet ? '140px' : '230px' }}
                            >
                              {item.capa ? (
                                <img
                                  src={item.capa}
                                  alt={`Relatório ${globalIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-[#666] text-sm">Cover / PDF</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6" style={{ width: isMobileOrTablet ? '100%' : 'auto' }}>
              <Button
                variant="default"
                size="icon"
                className="rounded-lg"
                style={{ backgroundColor: '#B80F66' }}
                onClick={() => gridApi?.scrollPrev()}
                disabled={gridCurrent === 0}
              >
                <img src={arrowNav} alt="Previous" className="w-4 h-4 rotate-180 invert" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="rounded-lg"
                style={{ backgroundColor: '#B80F66' }}
                onClick={() => gridApi?.scrollNext()}
                disabled={gridCurrent === slides.length - 1}
              >
                <img src={arrowNav} alt="Next" className="w-4 h-4 invert" />
              </Button>
            </div>

            {/* Close button */}
            <div className={`mt-4 ${isMobileOrTablet ? 'flex justify-center' : 'flex justify-end'}`} style={{ width: isMobileOrTablet ? '100%' : 'auto' }}>
              <Button
                variant="default"
                onClick={handleClose}
                style={{ backgroundColor: '#B80F66' }}
              >
                Fechar
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* PDF View */}
            <Carousel
              setApi={setPdfApi}
              className="w-full"
              opts={{ startIndex: selectedPdfIndex }}
            >
              <CarouselContent>
                {reportsData.map((item, index) => (
                  <CarouselItem key={index}>
                    <div
                      className="bg-[#D9D9D9] rounded-lg overflow-hidden flex items-center justify-center"
                      style={{ height: '400px' }}
                    >
                      {item.pdf ? (
                        <iframe
                          src={item.pdf}
                          className="w-full h-full"
                          title={`Relatório ${index + 1}`}
                        />
                      ) : (
                        <span className="text-[#666]">Content / PDF</span>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* PDF Navigation with pagination between arrows */}
            <div className="flex items-center justify-center gap-4 mt-6" style={{ width: isMobileOrTablet ? '100%' : 'auto' }}>
              <Button
                variant="default"
                size="icon"
                className="rounded-lg"
                style={{ backgroundColor: '#B80F66' }}
                onClick={() => pdfApi?.scrollPrev()}
                disabled={pdfCurrent === 0}
              >
                <img src={arrowNav} alt="Previous" className="w-4 h-4 rotate-180 invert" />
              </Button>
              <span className="px-3 py-1 rounded" style={{ backgroundColor: '#1F1D1D', color: '#fff', fontSize: '14px' }}>
                {pdfCurrent + 1} / {reportsData.length}
              </span>
              <Button
                variant="default"
                size="icon"
                className="rounded-lg"
                style={{ backgroundColor: '#B80F66' }}
                onClick={() => pdfApi?.scrollNext()}
                disabled={pdfCurrent === reportsData.length - 1}
              >
                <img src={arrowNav} alt="Next" className="w-4 h-4 invert" />
              </Button>
            </div>

            {/* Action buttons */}
            <div className={`gap-4 mt-4 ${isMobileOrTablet ? 'flex flex-col items-center' : 'flex justify-end'}`} style={{ width: isMobileOrTablet ? '100%' : 'auto' }}>
              <Button
                variant="outline"
                onClick={handleBackToGrid}
                className="hover:bg-[#6b1441] hover:border-[#6b1441] transition-colors back-to-reports-btn"
                style={{ borderColor: '#B80F66', color: '#B80F66', borderRadius: '.5em' }}
              >
                Voltar para Relatórios
              </Button>
              <Button
                variant="default"
                onClick={handleClose}
                style={{ backgroundColor: '#B80F66' }}
              >
                Fechar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportsModal;
