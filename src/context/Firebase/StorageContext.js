// StorageContext.js
import React, { createContext } from "react";
import { storage } from "./FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const StorageContext = createContext(null);

export const StorageProvider = ({ children }) => {
    const uploadFile = async (path, file) => {
        const fileRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
        const uploadResult = await uploadBytes(fileRef, file);
        return uploadResult.ref.fullPath;
    };

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
    };

    return (
        <StorageContext.Provider value={{ uploadFile, getImageURL }}>
            {children}
        </StorageContext.Provider>
    );
};

export const useStorage = () => React.useContext(StorageContext);
