import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration provided by the Firebase environment setup
const firebaseConfig = {
  apiKey: "AIzaSyBwRi5MVtcsdMWCVE5QHRB4AMvOWrSsleQ",
  authDomain: "hybrid-ward-k07pf.firebaseapp.com",
  projectId: "hybrid-ward-k07pf",
  storageBucket: "hybrid-ward-k07pf.firebasestorage.app",
  messagingSenderId: "1035139610303",
  appId: "1:1035139610303:web:9b86ac6c836f5180b7f80a"
};

// Initialize the core Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the custom database ID provisioned for this applet
const db = getFirestore(app, "ai-studio-glamourtechaiaut-310f1366-d17d-4b0a-96d5-4750c9e17d70");

// Initialize Authentication
const auth = getAuth(app);

/**
 * Interface representing a form submission payload.
 */
export interface SubmissionPayload {
  name: string;
  email: string;
  company: string;
  role?: string;
  country?: string;
  phone?: string;
  budget?: string;
  description: string;
  formType: 'home' | 'contact';
  [key: string]: any;
}

/**
 * Saves a new lead/audit submission to Firebase Firestore.
 * 
 * @param payload The submission details to save.
 * @returns A promise that resolves when the document is successfully added.
 */
export async function saveSubmission(payload: SubmissionPayload) {
  try {
    const submissionsRef = collection(db, 'submissions');
    const docRef = await addDoc(submissionsRef, {
      ...payload,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    console.log('[Firebase] Submission saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[Firebase] Error saving submission to Firestore:', error);
    throw error;
  }
}

export { app, db, auth };
