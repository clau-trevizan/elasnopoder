"use client";
import { motion } from "framer-motion";

interface TimelineItem {
  ano: string;
  texto: string;
}

interface MobileTimelineProps {
  items: TimelineItem[];
}

const MobileTimeline = ({ items }: MobileTimelineProps) => {
  return (
    <div className="relative pl-8 mobile-timeline">
      <style>{`
        @media (max-width: 1024px) {
          .mobile-timeline .timeline-dot {
            top: 1rem !important;
            left: -1.7rem !important;
          }
        }
      `}</style>
      {/* Vertical line */}
      <div
        className="absolute left-[10px] top-2 bottom-2 w-[2px]"
        style={{ backgroundColor: '#B80F66' }}
      />

      {items.map((item, index) => (
        <motion.div
          key={item.ano}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
          className="relative mb-8 last:mb-0"
        >
          {/* Dot */}
          <div
            className="timeline-dot absolute top-2 -left-8 w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: '#B80F66' }}
          />

          {/* Year */}
          <h3
            className="font-bold mb-2"
            style={{ color: '#B80F66', fontSize: '1.75rem' }}
          >
            {item.ano}
          </h3>

          {/* Text */}
          <p
            className="whitespace-pre-line"
            style={{ color: '#1F1D1D', fontSize: '1rem', lineHeight: '1.5' }}
          >
            {item.texto}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default MobileTimeline;
