"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { Mouse } from "lucide-react";
import { RefObject, useState } from "react";

type ScrollEncouragerProps = {
  targetRef: RefObject<HTMLElement | null>;
};

const ScrollEncourager = ({ targetRef }: ScrollEncouragerProps) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsVisible(latest > 0.03 && latest < 0.65);
  });

  const barHeight = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
      <div className="flex flex-row items-center gap-3 px-4 py-3 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse className="w-6 h-6 text-white" />
        </motion.div>
        <div className="relative h-6 w-[2px] bg-white/30 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white rounded-full"
            style={{ height: barHeight }}
          />
        </div>
      </div>
    </div>
  );
};

export { ScrollEncourager };
