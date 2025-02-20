import Image from "next/image";

export default function Navbar() {
  return (
    <div className="fixed flex items-center top-0 left-0 gap-6 p-6">
        <Image src="/logo.png" alt="Objectives" width={100} height={100} />
        <h1 className="text-xl font-medium">Objectives.</h1>
        <span className="text-sm text-grey">v0.5.0 free public demo</span>
    </div>
  );
}
