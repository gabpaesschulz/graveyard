"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EPITAPH_QUOTES = [
  "Todo projeto abandonado ainda pulsa em algum commit perdido.",
  "A melhor ideia que você teve foi a que nunca terminou.",
  "Protótipos não morrem. Eles esperam.",
  "O que foi construído não pode ser desconstruído da memória.",
  "Fracasso é arqueologia em tempo real.",
  "Cada MVP abandonado carregava um mundo inteiro dentro de si.",
  "Deixar ir também é uma forma de honrar.",
  "O pior produto que você já fez te ensinou mais que o melhor.",
  "Às vezes o projeto certo chega no momento errado.",
  "Ideias boas não morrem — elas hibernam.",
];

interface RotatingQuoteProps {
  className?: string;
  interval?: number;
}

export function RotatingQuote({ className = "", interval = 6000 }: RotatingQuoteProps) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * EPITAPH_QUOTES.length));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % EPITAPH_QUOTES.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ minHeight: "1.5em" }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-xs text-muted-foreground/50 italic font-serif"
        >
          &ldquo;{EPITAPH_QUOTES[index]}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
