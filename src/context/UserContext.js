import { createContext, useState, useContext, useEffect } from "react";
import { firestore } from "../firebase/firebase";
const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUserProfile, setCurrentUserProfile] = useState();

  async function updateUserProfile(userData) {
    const result = await firestore
      .collection("users")
      .add(userData)
      .then(() => console.log("added"))
      .catch((err) => {
        console.log(err);
      });

    setCurrentUserProfile(userData);
    return result;
  }

  async function getCurrentUserProfile(uid) {
    const result = await firestore
      .collection("users")
      .where("id", "==", uid)
      .get();

    const user = result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));

    return user;
  }

  const value = {
    currentUserProfile,
    updateUserProfile,
    getCurrentUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
