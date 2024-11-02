/**
 * Firebase Service for Contact Information
 * 
 * This service provides functions to interact with Firestore for storing contact information.
 */

import { db } from "./config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/**
 * Adds contact information to the Firestore 'waitlist' collection.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} company - The company of the contact.
 * @returns {Promise<void>} A promise that resolves when the document is added.
 */
export const addContactInfo = async (name: string, email: string, company: string): Promise<void> => {
  try {
    await addDoc(collection(db, "waitlist"), {
      name,
      email,
      company,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error adding contact info: ", error);
    throw new Error("Unable to add contact information at this time.");
  }
}; 