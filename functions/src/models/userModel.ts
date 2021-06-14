import * as bcrypt from "bcryptjs";

export const create = async (db: FirebaseFirestore.Firestore, email: string, password: string, names: string, dni: string) => {
  const hashpassword = await bcrypt.hash(password, 12);
  const data = {
    email: email,
    password: hashpassword,
    names: names,
    dni: dni,
  };
  await db.collection("Users").doc(dni).set(data);
  console.log("Added document with ID: ", dni);
};

export const findOneByEmail = async (db: FirebaseFirestore.Firestore, email: string) => {
  const users = db.collection("Users");
  return users.where("email", "==", email).limit(1).get().then((querySnapshot) => {
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.log("No document corresponding to the query!");
      return null;
    }
  });
};

export const findOneByDNI = async (db: FirebaseFirestore.Firestore, dni: string) => {
  const users = db.collection("Users");
  return users.where("dni", "==", dni).limit(1).get().then((querySnapshot) => {
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.log("No document corresponding to the query!");
      return null;
    }
  });
};

export const getAllVisits = async (db: FirebaseFirestore.Firestore, dni: string) => {
  const visitsQuerySnapshot = await db.collection("Users").doc(dni)
      .collection("Visits")
      .orderBy("date", "desc")
      .get();

  console.log(dni);
  const futureVisits = visitsQuerySnapshot.docs.map(async (visitItem) =>{
    const visitData = visitItem.data();
    const docmallName = await db.collection("Malls").doc(visitData.mallId).get();
    const mallName = docmallName.data()?.name;
    const docshopName = await db.collection("Shops").doc(visitData.shopId).get();
    const shopName = docshopName.data()?.name;
    return {
      date: visitData.date.toDate(),
      mallName: mallName,
      shopName: shopName,
    };
  });

  const dataReturn = await Promise.all(futureVisits);
  return dataReturn;
};

export const comparePasswords = async (password: string, storedPassword: string ) => {
  return await bcrypt.compare(password, storedPassword);
};
