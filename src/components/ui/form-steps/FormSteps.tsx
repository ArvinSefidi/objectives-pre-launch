'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

interface URLStepProps {
  onSubmit: (url: string) => void;
  text: string;
}


interface EmailStepProps {
  onSubmit: (email: string) => void;
  text: string;
  emails: string[];
  onAddEmail: (email: string) => void;
  onRemoveEmail: (email: string) => void;
  url: string;
}

interface CompletionStepProps {
  initialTimeInSeconds?: number;
}

export const URLStep = ({ onSubmit, text }: URLStepProps) => {
  const [url, setUrl] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <motion.div
      exit={{ x: -300, opacity: 0 }}
      className="flex lg:flex-row flex-col gap-2 text-2xl w-full text-grey"
    >
      <p className="px-3 py-1 ">{text.toLowerCase()}</p>
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your website"
          className="bg-transparent placeholder:text-grey border-grey hover:border-white text-marble w-full lg:w-2xl text-2xl"
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

export const CompletionStep = ({ initialTimeInSeconds = 600 }: CompletionStepProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex flex-col gap-4 text-base text-grey"
    >
      
      <div className="flex flex-col items-center gap-2">
      <p>scan initiated successfully! we&apos;ll send the results to the emails you provided.</p>
        <p className="text-marble text-4xl font-mono">{formatTime(timeLeft)}</p>
        <p className="text-2xl">estimated time remaining</p>
      </div>
    </motion.div>
  );
};

export const EmailStep = ({ 
  text, 
  emails = [], 
  onAddEmail, 
  onRemoveEmail, 
  url,
}: EmailStepProps) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [scanInitiated, setScanInitiated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEmail && currentEmail.includes('@')) {
      if (emails.includes(currentEmail)) {
        setErrorMessage("This email is already added.");
        return;
      }
      onAddEmail(currentEmail);
      setCurrentEmail("");
      setErrorMessage("");
    }
  };

  const handleLaunchTest = async () => {
    if (emails.length === 0) return;
    
    try {
      console.log('Starting scan with:', { url, emails, max_depth: 3, agents: ["visual_regression"] });
      setScanInitiated(true);
      
      // Commented out for now
      /*const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          emails,
          max_depth: 3,
          agents: ["visual_regression"]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start scan');
      }

      const data = await response.json();*/
    } catch (error) {
      console.error('Error starting scan:', error);
    }
  };

  if (scanInitiated) {
    return <CompletionStep />;
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex flex-col gap-4 text-2xl text-grey"
    >
      <p>{text.toLowerCase()}</p>
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <Input
          type="email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-transparent placeholder:text-grey border-grey hover:border-white text-marble w-full lg:w-2xl text-2xl"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-marble text-black hover:bg-grey"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
        <AnimatePresence>
          {emails.map((email) => (
            <motion.div
              key={email}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 bg-grey/20 px-3 py-1 rounded-full text-base"
            >
              <span className="truncate">{email}</span>
              <button
                onClick={() => onRemoveEmail(email)}
                className="hover:text-gold transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {emails.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Button
            onClick={handleLaunchTest}
            className="bg-grey text-marble hover:bg-grey px-6 py-2"
          >
            Launch Test
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}; 