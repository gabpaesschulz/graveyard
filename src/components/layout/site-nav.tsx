"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlowerIcon,
  BookOpenIcon,
  BarChart2Icon,
  SparklesIcon,
  PlusIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { triggerCommandPalette } from "@/components/command-palette";

const NAV_LINKS = [
  { href: "/hall", label: "Salão Memorial", icon: BookOpenIcon },
  { href: "/analytics", label: "Necrologia", icon: BarChart2Icon },
  { href: "/reincarnation", label: "Reencarnação", icon: SparklesIcon },
  { href: "/manifesto", label: "Manifesto", icon: FlowerIcon },
];

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/92 backdrop-blur-xl backdrop-saturate-150">
      {/* Gold hairline at bottom of nav */}
      <div className="absolute bottom-0 left-0 right-0 h-px line-gold" />
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-memorial border border-gold/25 bg-gold/5 group-hover:border-gold/55 group-hover:bg-gold/10 transition-all duration-300">
            <span className="text-gold text-xs font-mono leading-none">⚰</span>
          </div>
          <span className="font-serif font-semibold text-parchment tracking-tight text-[0.9375rem] group-hover:text-gold/90 transition-colors duration-300">
            Graveyard
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-3.5 py-2 text-[0.8125rem] font-medium transition-colors rounded-sm hover-underline-gold",
                  isActive ? "text-parchment" : "text-muted-foreground hover:text-parchment/90",
                )}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3.5 right-3.5 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          {/* ⌘K search trigger */}
          <button
            onClick={triggerCommandPalette}
            className="flex items-center gap-2 h-8 px-3 text-xs text-muted-foreground/55 border border-border/50 rounded-memorial bg-card/30 hover:border-border hover:text-parchment transition-all"
          >
            <SearchIcon className="h-3.5 w-3.5" />
            <span>Buscar</span>
            <kbd className="ml-0.5 text-[10px] border border-border/50 rounded px-1 py-px font-mono opacity-60">⌘K</kbd>
          </button>

          <Link href="/new">
            <Button
              size="sm"
              className="gap-1.5 bg-gold/8 border border-gold/25 text-gold hover:bg-gold/15 hover:border-gold/50 transition-all font-medium text-xs tracking-wide"
              variant="ghost"
            >
              <PlusIcon className="h-3 w-3" />
              Novo funeral
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-parchment transition-colors duration-200 rounded-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "block" }}
            >
              {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-all duration-200",
                      isActive
                        ? "bg-gold/10 text-parchment"
                        : "text-muted-foreground hover:bg-card hover:text-parchment hover:pl-4",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
              <div className="mt-2 pt-2 border-t border-border">
                <Link href="/new" onClick={() => setMobileOpen(false)}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full gap-2 text-gold border border-gold/30 hover:bg-gold/10"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                    Novo funeral
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
