import {
  GradeDistributionMockup,
  StudentReviewsMockup,
  AIAssistantMockup,
} from "@/components/landing-mockups";

export default function HeroMockups() {
  return (
    <div className="relative hidden lg:flex flex-col gap-4 subpixel-antialiased [transform:translateZ(0)]">
      <div className="w-full">
        <GradeDistributionMockup />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-full">
          <StudentReviewsMockup />
        </div>
        <div className="h-full">
          <AIAssistantMockup />
        </div>
      </div>
    </div>
  );
}
