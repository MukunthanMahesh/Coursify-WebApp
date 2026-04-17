"use client";

import dynamic from "next/dynamic";

const HeroMockups = dynamic(
  () => import("@/components/landing/HeroMockups"),
  { ssr: false }
);

export default function HeroMockupsLoader() {
  return <HeroMockups />;
}
