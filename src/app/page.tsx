'use client'
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { URLStep, EmailStep } from "@/components/ui/form-steps/FormSteps";

export default function Page() {
  const [step, setStep] = useState(0);
  const [ctaStep, setCtaStep] = useState(0);
  const [url, setUrl] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [ctaEmails, setCtaEmails] = useState<string[]>([]);



  return (
    <div className="min-h-screen bg-black text-marble overflow-x-hidden">
      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen min-w-1/2 flex flex-col justify-center items-center xl:items-end mr-0 md:mr-24">
        <div className="z-10 justify-start items-start w-2xl basis-1/4 xl:mt-0 mt-[-30%]">
            <h2 className="text-4xl md:text-6xl mb-8">never ship a bug again.</h2>
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <URLStep
                  key="url-step"
                  text="find every bug on:"
                  onSubmit={(submittedUrl) => {
                    setUrl(submittedUrl);
                    setStep(1);
                  }}
                />
              ) : (
                <EmailStep
                  key="email-step"
                  text="who should receive the test reports?:"
                  onSubmit={(email) => {
                    setEmails([...emails, email]);
                  }}
                  emails={emails}
                  onAddEmail={(email) => setEmails([...emails, email])}
                  onRemoveEmail={(email) => setEmails(emails.filter(e => e !== email))}
                  url={url}
                />
              )}
            </AnimatePresence>
          </div>
          <div className="absolute left-[0%] bottom-[0%] w-[481px] lg:w-[600px] xl:w-[750px] h-[397.5px] lg:h-[496px] xl:h-[600px] pointer-events-none select-none">
            <Image
              src="/davidAlt.png"
              alt="David statue"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="flex flex-col items-center xl:items-end mr-0 md:mr-24 px-4 md:px-0 mt-48">
          <div className="w-full max-w-xl flex flex-col gap-y-36">
            <div className="text-center xl:text-left"> 
              <h2 className="text-4xl md:text-5xl mb-4">
                visual regression testing on steroids.
              </h2>
              <p className="text-grey text-lg">
                Objectives ai explores millions of user paths to detect and rank visual issues by customer impact.
              </p>
            </div>
            <div className="text-center xl:text-left">
              <h2 className="text-4xl md:text-5xl mb-4">
                full bug reports in <span className="text-gold">minutes</span>
              </h2>
              <p className="text-grey md:text-lg">
                instead of spending hours writing test cases and manually regression testing your ui,
              </p>
            </div>
            <div className="text-center xl:text-left">
              <h2 className="text-4xl md:text-5xl mb-4">
                your url is <span className="text-gold">all you need.</span>
              </h2>
              <p className="text-grey md:text-lg">
                simply enter your url and email address, and Objectives AI will take care of the
                rest.
              </p>
            </div>


            <div className="text-center xl:text-left">
              <h2 className="text-4xl md:text-5xl mb-4">
                move fast <span className="text-gold">without</span>
                <br />
                breaking things.
              </h2>
              <p className="text-grey text-lg">
                using Objectives, your team can ship the best version of your website feeling
                confident that you&apos;re not breaking anything.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative min-h-screen min-w-1/2 flex flex-col justify-center items-center xl:items-end mr-0 md:mr-24">
          <div className="z-10 justify-start items-start max-w-2xl basis-1/4 xl:mt-0 mt-[-30%]">
              <h2 className="text-4xl md:text-6xl mb-8 text-left">ship with absolute confidence.</h2>
            <AnimatePresence mode="wait">
              {ctaStep === 0 ? (
                <URLStep
                  key="cta-url-step"
                  text="your url is all you need."
                  onSubmit={(submittedUrl) => {
                    setCtaUrl(submittedUrl);
                    setCtaStep(1);
                  }}
                />
              ) : (
                <EmailStep
                  key="cta-email-step"
                  text="who should receive the test reports?"
                  onSubmit={(email) => {
                    setCtaEmails([...ctaEmails, email]);
                  }}
                  emails={ctaEmails}
                  onAddEmail={(email) => setCtaEmails([...ctaEmails, email])}
                  onRemoveEmail={(email) => setCtaEmails(ctaEmails.filter(e => e !== email))}
                  url={ctaUrl}
                />
              )}
            </AnimatePresence>
            </div>
          <div className="absolute left-[0%] bottom-[0%] w-[481px] lg:w-[600px] xl:w-[750px] h-[321px] lg:h-[400px] xl:h-[500px] pointer-events-none select-none">
            <Image
              src="/apolloBelvedere.png"
              alt="Apollo statue"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </section>

        <footer className="bottom-0 text-white p-6 z-10 bg-grey">
          <div className="container mx-auto text-left">
            <p className="text-lg">
              for questions and support, contact{" "}
              <a
                href="mailto:arvin@objectives.tech"
                className="underline text-marble"
              >
                arvin@objectives.tech
              </a>
              </p>
            </div>
          </footer>       
      </main>
    </div>

  );
}
