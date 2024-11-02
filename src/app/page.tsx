/**
 * Home Page Component
 * 
 * This component renders the pre-launch front page for Objectives with a Hero section
 * and a Contact Info Modal to collect user contact information.
 */
"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import Button from "@/components/animatedButton";
import Navbar from "@/components/Navbar";

/**
 * Home Component
 * 
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /**
   * Opens the contact modal.
   */
  const openModal = () => setIsModalOpen(true);

  /**
   * Closes the contact modal.
   */
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col items-center w-full h-full text-left justify-evenly p-8 sm:p-20">
      {/* Hero Section */}
      <Navbar/>
      <h1 className="h1 mb-4">
        Make Startup Management Simple.
        </h1>
        <p className="h4 w-1/2 mb-8">
          Objectives helps you break down objectives into issues, manage docs, dependencies, and deadlines.
        </p>
        <Button
          onClick={openModal}
          className="bg-dark-blue text-white h2 transition-all duration-300"
          text="Join the waitlist"
        />

      {/* Contact Info Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
