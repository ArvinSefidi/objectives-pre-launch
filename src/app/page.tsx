import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-marble overflow-x-hidden">
      <Navbar />

      {/* Main Content */}
        {/* Hero Section */}
        <section className="justify center relative min-h-screen min-w-1/2 flex flex-col justify-center z-10">
          <div className="m-12 w-5xl md:mt-0 mt-[-10%]">
            <h2 className="text-6xl mb-8"><span className="text-white">never</span> ship a bug again.</h2>
            <div className="flex gap-2 text-2xl text-grey">
              run a full end-to-end test on:
              <Input
                placeholder="your website"
                className="bg-transparent border-grey hover:border-white text-marble w-2xl"
              />
              <Button
                size="icon"
                className="bg-marble text-black hover:bg-grey"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="absolute right-[0%] bottom-[-5%] w-[400px] md:w-[600px] h-[500px] md:h-[750px] pointer-events-none select-none -z-10 border-white">
            <Image
              src="/david.png"
              alt="David statue"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 flex flex-col gap-24 px-24">
          <div className="flex flex-col gap-24 max-w-xl">
            <div className="align-right">
              <h2 className="text-5xl mb-4">
                test every user flow in
                <br />
                minutes
              </h2>
              <p className="text-grey text-lg">
                instead of spending hours writing test cases and manually testing your ui, simply enter your
                url and email address, and Objectives AI will take care of the
                rest.
              </p>
            </div>
            <div className="align-left">
              <h2 className="text-5xl">
                what you don't know
                <br />
                can hurt you.
              </h2>
              <p className="text-grey text-xl mb-4">
                Traditional testing can't account for unknown edge cases.
                Trivial bugs slip through the cracks along with your
                conversions.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-24 max-w-xl ml-auto">
            <div className="align-left">
              <h2 className="text-5xl">
                never lose a client to
                <br />
                bugs again.
              </h2>

              <p className="text-grey text-xl mb-4">
                Objectives scans through every single way users might interact
                with your website and performs visual regression testing to
                ensure full functionality.
              </p>
            </div>
            <div>
              <h2 className="text-4xl mb-4">
                move fast without
                <br />
                breaking things.
              </h2>
              <p className="text-grey text-lg">
                Using Objectives, you can ship the best version feeling
                confident that you're not breaking things.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative min-h-screen flex flex-col justify-center z-10">
          <div className="m-12 w-5xl md:mt-0 mt-[-10%]">
            <h2 className="text-6xl mb-8"><span className="text-white">ready to never</span> ship a bug again?</h2>
            <div className="flex gap-2 text-2xl text-grey">
              run a full end-to-end test on:
              <Input
                placeholder="your website"
                className="bg-transparent border-grey hover:border-white text-marble w-2xl"
              />
              <Button
                size="icon"
                className="bg-marble text-black hover:bg-grey"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="absolute right-[0%] bottom-[-8%] w-[400px] sm:w-[400px] h-[500px] pointer-events-none select-none -z-10">
            <Image
              src="/apollo.png"
              alt="Apollo statue"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </section>


        
        <footer className="bottom-0 text-white p-6 z-10">
          <div className="container mx-auto text-left">
            <p className="text-lg">
              Contact us at{" "}
              <a
                href="mailto:arvin@objectives.tech"
                className="underline text-marble"
              >
                arvin@objectives.tech
              </a>
              </p>
            </div>
          </footer>       
    </div>
  );
}
