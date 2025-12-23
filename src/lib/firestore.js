import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const EVENTS_COLLECTION = 'events';

export const getEvents = async () => {
    try {
        const q = query(collection(db, EVENTS_COLLECTION), orderBy('date', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // handle timestamps if needed
            date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(doc.data().date)
        }));
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
            ...eventData,
            createdAt: serverTimestamp(),
            date: new Date(eventData.date) // ensure it's a date object or standard string
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        await deleteDoc(doc(db, EVENTS_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};
