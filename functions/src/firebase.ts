import * as admin from "firebase-admin";

// Initialize our project application
admin.initializeApp();

// Set up database connection
const firestoreDb: FirebaseFirestore.Firestore = admin.firestore();
firestoreDb.settings({timestampsInSnapshots: true});

// Export our references
export const db = firestoreDb;
