/**
 * Contact Info Modal Component
 * 
 * This component renders a modal with a form to collect the user's name and email.
 * Upon submission, the contact information is stored in Firebase Firestore.
 */

import { useState } from "react";
import { addContactInfo } from "@/firebase/service";
import Button from "./animatedButton";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ContactModal Component
 * 
 * @param {ContactModalProps} props - Props containing `isOpen` and `onClose` handler.
 * @returns {JSX.Element} The rendered modal component.
 */
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /**
   * Handles the form submission by adding contact info to Firestore.
   * Displays an error message if submission fails.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addContactInfo(name, email, company);
      setLoading(false);
      onClose();
      // Optionally, reset form fields here
      setName("");
      setEmail("");
      setCompany("");
      alert("Thank you for your interest!");
    } catch (error) {
      setLoading(false);
      setError("Failed to submit. Please try again.");
      console.error("Submission error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border border-evening rounded-lg p-12 w-full max-w-md relative">
        <h2 className="h3 mb-4">Sign up for updates and a free six months of Objectives.</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">
            Name:
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="mb-2">
            Company:
            <input
              type="text"
              className="input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
          <label className="mb-4">
            Email:
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button
            text={loading ? "Submitting..." : "Submit"}
            className="bg-dark-blue h3 text-white py-2 rounded"
            type="submit"
            disabled={loading}
          />
        </form>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactModal; 