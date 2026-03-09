"use client";

import dynamic from "next/dynamic";

export const CommandPaletteDynamic = dynamic(
  () => import("@/components/command-palette").then((m) => ({ default: m.CommandPalette })),
  { ssr: false, loading: () => null },
);
