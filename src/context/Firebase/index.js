// index.js
import { useAuth } from "./AuthContext";
import { useFirestore } from "./FirestoreContext";
import { useStorage } from "./StorageContext";
import { useRecaptcha } from "./RecaptchaContext";

export { default as FirebaseProvider } from "./FirebaseProvider";

// Aggregate all hooks into a single useFirebase hook
export const useFirebase = () => {
    const auth = useAuth();
    const firestore = useFirestore();
    const storage = useStorage();
    const recaptcha = useRecaptcha();

    return {
        ...auth,
        ...firestore,
        ...storage,
        ...recaptcha,
    };
};
