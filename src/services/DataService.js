import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const DB_KEY = 'portfolio_db_v1';

// Initial Data same as before...
const initialData = {
    profile: {
        name: "Ravindra Khillare",
        title: "Computer Teacher & Tech Enthusiast",
        location: "Phulambri, Chhatrapati Sambhaji Nagar",
        bio: "I am a passionate educator and technologist with expertise in software, hardware, robotoics, and coding. I focus on creating digital assets for kids education.",
        social: {
            email: "contact@example.com",
            phone: "+91 1234567890"
        },
        image: "https://placehold.co/400x400?text=RK"
    },
    services: [
        { id: 1, title: "Software & Hardware", description: "Comprehensive solutions and troubleshooting.", icon: "Cpu" },
        { id: 2, title: "Teaching & Coding", description: "Expert guidance in programming and computer science.", icon: "Code" },
        { id: 3, title: "Robotics", description: "Hands-on robotics training and workshop.", icon: "Bot" },
        { id: 4, title: "Digital Education", description: "Creating engaging online games, videos, and ebooks for kids.", icon: "BookOpen" }
    ],
    slider: [
        { id: 1, text: "Empowering Students with Digital Skills", active: true },
        { id: 2, text: "Innovative Solutions for Modern Education", active: true },
        { id: 3, text: "Building the Future with Robotics & Code", active: true }
    ],
    ads: [
        {
            id: 1,
            title: "Local Book Store",
            content: "Get 20% off on all coding books!",
            startDate: "2024-01-01",
            endDate: "2025-12-31",
            active: true
        }
    ],
    messages: []
};

// Internal helper for LocalStorage
const getLocal = () => {
    const s = localStorage.getItem(DB_KEY);
    return s ? JSON.parse(s) : initialData;
};
const setLocal = (data) => localStorage.setItem(DB_KEY, JSON.stringify(data));

// Ensure local storage is seeded
if (!localStorage.getItem(DB_KEY)) setLocal(initialData);

export const DataService = {
    get: async () => {
        if (db) {
            try {
                const docRef = doc(db, "portfolio", "main");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return docSnap.data();
                } else {
                    // Seed Firestore if empty
                    await setDoc(docRef, initialData);
                    return initialData;
                }
            } catch (e) {
                console.error("Error fetching from Firebase", e);
                return getLocal();
            }
        } else {
            return getLocal();
        }
    },

    // Because this is a simple portfolio, we can just save the whole section or object
    // A cleaner approach for production is sub-collections, but one document is fine for small data
    update: async (section, data) => {
        // Optimistic update for UI speed
        const currentLocal = getLocal();
        currentLocal[section] = data;
        setLocal(currentLocal);

        if (db) {
            try {
                const docRef = doc(db, "portfolio", "main");
                await updateDoc(docRef, { [section]: data });
            } catch (e) {
                console.error("Error updating Firebase", e);
            }
        }
        return currentLocal;
    },

    addMessage: async (msg) => {
        const newMsg = { id: Date.now(), ...msg, date: new Date().toISOString() };

        // Local update
        const currentLocal = getLocal();
        currentLocal.messages.push(newMsg);
        setLocal(currentLocal);

        if (db) {
            try {
                const docRef = doc(db, "portfolio", "main");
                // Use arrayUnion to append atomically
                await updateDoc(docRef, {
                    messages: arrayUnion(newMsg)
                });
            } catch (e) {
                console.error("Error sending message to Firebase", e);
            }
        }
        return newMsg;
    }
};
