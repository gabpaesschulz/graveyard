import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto · Graveyard",
  description: "Sobre a dignidade de fracassar em público e a honestidade dos projetos abandonados.",
};

export default function ManifestoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
