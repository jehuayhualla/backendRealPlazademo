export const create = async (db: FirebaseFirestore.Firestore, name: string, malls: Array<string>) => {
  const data = {
    name: name,
    malls: malls,
  };
  await db.collection("Shops").add(data);
};

export const removeByID = async (db: FirebaseFirestore.Firestore, id: string) => {
  await db.collection("Shops").doc(id).delete();
};

export const getByID = async (db: FirebaseFirestore.Firestore, id: string) => {
  const shopsRef = db.collection("Shops").doc(id);
  const doc = await shopsRef.get();
  if (!doc.exists) {
    return null;
  } else {
    return {...doc.data(), id: doc.id};
  }
};

export const getAll = async (db: FirebaseFirestore.Firestore) => {
  return db.collection("Shops")
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

export const getAllByMall = async (db: FirebaseFirestore.Firestore, mallId: string) => {
  return db.collection("Shops")
      .where("malls", "array-contains", mallId)
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

export const addVisitor = async (db: FirebaseFirestore.Firestore, shopId: string, userId: string, mallId: string) => {
  const data = {
    userId: userId,
    mallId: mallId,
    date: new Date(),
  };

  const dataUser = {
    shopId: shopId,
    mallId: mallId,
    date: new Date(),
  };
  await db.collection("Shops").doc(shopId).collection("Visits").add(data);
  await db.collection("Users").doc(userId).collection("Visits").add(dataUser);
};


