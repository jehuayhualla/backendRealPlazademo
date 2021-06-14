export const create = async (db: FirebaseFirestore.Firestore, name: string) => {
  const data = {
    name: name,
  };
  await db.collection("Malls").add(data);
};

export const removeByID = async (db: FirebaseFirestore.Firestore, id: string) => {
  await db.collection("Malls").doc(id).delete();
};

export const getByID = async (db: FirebaseFirestore.Firestore, id: string) => {
  const mallsRef = db.collection("Malls").doc(id);
  const doc = await mallsRef.get();
  if (!doc.exists) {
    return null;
  } else {
    return {...doc.data(), id: doc.id};
  }
};

export const getAll = async (db: FirebaseFirestore.Firestore) => {
  return db.collection("Malls")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          return {...doc.data(), id: doc.id};
        });
      })
      .catch((error) => {
        return null;
      });
};

