"use client";
import { motion } from "framer-motion";

interface TimelineItem {
  ano: string;
  texto: string;
}

interface DesktopTimelineProps {
  items: TimelineItem[];
}

const DesktopTimeline = ({ items }: DesktopTimelineProps) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      {/* Main horizontal line */}
      <div
        className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2"
        style={{ backgroundColor: '#B80F66' }}
      />

      {/* Timeline items */}
      <div className="flex justify-between items-start relative">
        {items.map((item, index) => {
          const isTop = index % 2 === 0;

          return (
            <motion.div
              key={item.ano}
              initial={{ opacity: 0, y: isTop ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`relative flex flex-col items-center ${isTop ? 'flex-col' : 'flex-col-reverse'}`}
              style={{
                flex: '1',
                maxWidth: `${100 / items.length}%`,
                paddingTop: isTop ? '0' : '80px',
                paddingBottom: isTop ? '80px' : '0',
              }}
            >
              {/* Content */}
              <div
                className={`text-center px-2 ${isTop ? 'mb-4' : 'mt-4'}`}
                style={{ minHeight: '80px' }}
              >
                {/* Year */}
                <h3
                  className="font-bold mb-1"
                  style={{ color: '#B80F66', fontSize: '1.5rem' }}
                >
                  {item.ano}
                </h3>

                {/* Text */}
                <p
                  className="text-sm leading-tight"
                  style={{ color: '#1F1D1D', fontSize: '0.875rem' }}
                >
                  {item.texto}
                </p>
              </div>

              {/* Vertical connector line */}
              <div
                className={`w-[2px] ${isTop ? 'h-8' : 'h-8'}`}
                style={{ backgroundColor: '#B80F66' }}
              />

              {/* Circle dot on the main line */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[16px] h-[16px] rounded-full border-[3px] z-10"
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#B80F66',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopTimeline;
