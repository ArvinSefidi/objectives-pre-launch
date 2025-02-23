import Image from "next/image";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-[1000]">
      <div className="fixed flex items-center top-0 left-0 gap-6 p-6 z-1000">
          <h1 className="text-xl font-medium">Objectives.</h1>
          <span className="text-sm text-grey">v0.5.0 free public demo</span>
      </div>
    </div>
  );
}
