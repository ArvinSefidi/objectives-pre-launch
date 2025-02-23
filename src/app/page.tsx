'use client'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Create components for each step
const URLStep = ({ onSubmit, text }: { onSubmit: (url: string) => void, text: string }) => {
  const [url, setUrl] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex md:flex-row flex-col gap-2 text-2xl text-grey"
    >
      <p>{text}</p>
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your website"
          className="bg-transparent placeholder:text-grey border-grey hover:border-white text-marble w-2xl text-2xl"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-marble text-black hover:bg-grey"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  );
};

const EmailStep = ({ 
  onSubmit, 
  text, 
  emails = [], 
  onAddEmail, 
  onRemoveEmail, 
  url,
}: { 
  onSubmit: (email: string) => void;
  text: string;
  emails: string[];
  onAddEmail: (email: string) => void;
  onRemoveEmail: (email: string) => void;
  url: string;
}) => {
  const [currentEmail, setCurrentEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEmail && currentEmail.includes('@')) {
      onAddEmail(currentEmail);
      setCurrentEmail("");
    }
  };

  const handleLaunchTest = async () => {
    if (emails.length === 0) return;
    
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          emails,
          max_depth: 3,  // Using default value, adjust as needed
          agents: ["visual_regression"]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start scan');
      }

      const data = await response.json();
      console.log('Scan started:', data);
      // Handle success (maybe show a success message or redirect)
    } catch (error) {
      console.error('Error starting scan:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex flex-col gap-4 text-2xl text-grey"
    >
      <p>{text}</p>
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <Input
          type="email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-transparent placeholder:text-grey border-grey hover:border-white text-marble w-2xl text-2xl"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-marble text-black hover:bg-grey"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Email list */}
      <div className="flex flex-wrap gap-2 mt-2">
        <AnimatePresence>
          {emails.map((email) => (
            <motion.div
              key={email}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 bg-grey/20 px-3 py-1 rounded-full text-base"
            >
              <span>{email}</span>
              <button
                onClick={() => onRemoveEmail(email)}
                className="hover:text-red-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Launch button */}
      {emails.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Button
            onClick={handleLaunchTest}
            className="bg-marble text-black hover:bg-grey px-6 py-2"
          >
            Launch Test
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function Page() {
  const [step, setStep] = useState(0);
  const [ctaStep, setCtaStep] = useState(0);
  const [url, setUrl] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [ctaEmails, setCtaEmails] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log("Launching test with emails:", emails);
    // Add your API call here
  };

  return (
    <div className="min-h-screen bg-black text-marble overflow-x-hidden">
      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen min-w-1/2 flex flex-col justify-center items-end md:mr-24">
          <div className="justify-end w-5xl lg:mt-0 mt-[-30%] right-[0%]">
            <h2 className="text-4xl md:text-6xl mb-8">never ship a bug again.</h2>
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <URLStep
                  key="url-step"
                  text="rapidly test every user flow on:"
                  onSubmit={(submittedUrl) => {
                    setUrl(submittedUrl);
                    setStep(1);
                  }}
                />
              ) : (
                <EmailStep
                  key="email-step"
                  text=" who should recieve the test reports?:"
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
          <div className="absolute left-[0%] bottom-[0%] w-[481px] lg:w-[750px] h-[397.5px] lg:h-[600px] pointer-events-none select-none">
            <Image
              src="/davidAlt.png"
              alt="David statue"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="flex flex-col gap-24 max-w-xl ml-auto gap-y-36 mt-48 align-right">
          <div className="">
              <h2 className="text-4xl md:text-5xl mb-4">
                comprehensive visual testing in <span className="text-gold">minutes</span>
              </h2>
              <p className="text-grey md:text-lg">
                instead of spending hours writing test cases and manually testing your ui, simply enter your
                url and email address, and Objectives AI will take care of the
                rest.
              </p>
            </div>
            <div className="align-left">
              <h2 className="text-4xl md:text-5xl mb-4">
                never lose a client to
                bugs again.
              </h2>
              <p className="text-grey text-lg">
                Objectives scans through every single way users might interact
                with your website and performs visual regression testing to
                ensure full functionality.
              </p>
            </div>
            <div className="align-left">
              <h2 className="text-4xl md:text-5xl mb-4">
                move fast without
                <br />
                breaking things.
              </h2>
              <p className="text-grey text-lg">
                Using Objectives, you can ship the best version feeling
                confident that you&apos;re not breaking things.
              </p>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative min-h-screen flex flex-col justify-center z-10">
          <div className="justify-end w-5xl lg:mt-0 mt-[-30%] right-[0%] ml-12 ">
            <h2 className="text-4xl md:text-6xl mb-8">Are you ready <br /> to never ship a bug again?</h2>
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

          <div className="absolute right-[0%] bottom-[0%] w-[400px] sm:w-[400px] h-[500px] pointer-events-none select-none -z-10">
            <Image
              src="/apollo.png"
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
              for questions and support, contact us at{" "}
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
