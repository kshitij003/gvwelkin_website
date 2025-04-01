
import Image from "next/image";

export default function RulesPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <Image
                src="/bg.png"
                alt="background"
                fill
                style={{ objectFit: "cover"}}
              />

      {/* Centered Image */}
      <div className="absolute z-10 flex items-center justify-center">
        <Image
          src="/rules.png"
          alt="rules"
          width={900}
          height={400}
          className="relative"
        />
      </div>
    </div>
  );
}
