import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { hashPassword } from '../utils/hash';

export const authenticateAdmin = async (orgName, password) => {
  try {
    const docRef = doc(firestore, 'organizations', orgName);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Organization not found.');
    }

    const storedHash = docSnap.data().adminPasswordHash;
    const enteredHash = await hashPassword(password);

    if (enteredHash !== storedHash) {
      throw new Error('Incorrect password.');
    }

    return { success: true, orgName };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const authenticateDriver = async (accessCode) => {
  try {
    const normalizedID = accessCode.trim().toLowerCase();
    console.log("[Auth] Attempting with Driver ID:", normalizedID);

    const docRef = doc(firestore, 'drivers', normalizedID);
    console.log("[Auth] Firebase document path:", docRef.path);
    console.log("[Auth] Firebase document ID:", docRef.id);
    
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error(`[Auth] No profile found for ID: "${normalizedID}"`);
      throw new Error('Driver not found.');
    }

    console.log("[Auth] Profile found:", docSnap.data());
    return { success: true, driverData: docSnap.data() };
  } catch (error) {
    console.error("[Auth] Error:", error.message);
    return { success: false, error: error.message };
  }
};