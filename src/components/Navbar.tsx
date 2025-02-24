// import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-[1000] w-full flex justify-between">
      <div className="fixed flex items-center top-0 left-0 gap-6 p-6 z-1000">
          <h1 className="text-2xl font-medium">Objectives.</h1>
          <span className="text-base text-grey">v0.5.0 free public demo</span>
      </div>
      <div className="fixed flex items-center top-0 right-0 gap-6 p-6 z-1000">
        {/* <Link href="/blog" className="">blog</Link> */}
      </div>
    </div>
  );
}
