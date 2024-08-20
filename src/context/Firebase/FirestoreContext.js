// FirestoreContext.js
import React, { createContext } from "react";
import { FireStore } from "./FirebaseConfig";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    deleteDoc,
} from "firebase/firestore";

const FirestoreContext = createContext(null);

export const FirestoreProvider = ({ children }) => {
    const setArticles = async (name, place, state, article, imageURL) => {
        return await addDoc(collection(FireStore, "articles"), {
            name,
            place,
            state,
            article,
            imageURL,
            writtenOnDate: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        });
    };

    const getArticles = async () => {
        return await getDocs(collection(FireStore, "articles"));
    };

    const getStateBlogs = async (state) => {
        const articlesRef = collection(FireStore, "articles");
        const q = query(articlesRef, where("state", "==", state));
        const querySnapshot = await getDocs(q);

        return querySnapshot.empty ? [] : querySnapshot;
    };

    const getPlaceBlogId = async (id) => {
        const blogRef = doc(FireStore, "articles", id);
        const blogDoc = await getDoc(blogRef);
        return blogDoc.exists() ? blogDoc.data() : null;
    };

    const deleteArticles = async (articleID) => {
        await deleteDoc(doc(FireStore, "articles", articleID));
    };

    return (
        <FirestoreContext.Provider
            value={{
                setArticles,
                getArticles,
                getStateBlogs,
                getPlaceBlogId,
                deleteArticles,
            }}
        >
            {children}
        </FirestoreContext.Provider>
    );
};

export const useFirestore = () => React.useContext(FirestoreContext);
