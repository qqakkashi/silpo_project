import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import firebaseApp from "../lib/firebase";

const db = getFirestore(firebaseApp);
const path = "esp32desk";
const colRef = collection(db, path);

class Esp32Api {
  subscribeOnEsp32(setData) {
    try {
      const unsub = onSnapshot(colRef, (snapshot) => {
        setData(() =>
          snapshot.docs?.reduce(
            (arr, eps32) => [...arr, { ...eps32.data(), id: eps32.id }],
            []
          )
        );
      });
      return unsub;
    } catch (error) {
      console.log(error);
    }
  }
}

export const esp32Api = new Esp32Api();
