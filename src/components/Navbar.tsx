import Image from "next/image";

export default function Navbar() {
  return (
    <div className="fixed top-0 flex justify-between items-center w-full p-3 md:p-5 text-roundhouse-white z-20">
      <Image src="/logo.svg" alt="Objectives" width={200} height={200} />     
      <div className="flex items-center space-x-2 md:space-x-4 ">
      </div>
    </div>
  );
}