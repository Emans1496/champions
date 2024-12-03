// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyDwGnDgY77Pv4pc_6u9LqRlzyZhBmNkzbQ",
//     authDomain: "championsfcg.firebaseapp.com",
//     projectId: "championsfcg",
//     storageBucket: "championsfcg.firebasestorage.app",
//     messagingSenderId: "731263315412",
//     appId: "1:731263315412:web:bb999ceaa9e1027f5afa41"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// export { auth };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
