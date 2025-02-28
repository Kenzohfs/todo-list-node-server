const { db } = require("../../config/firebase");
const { COLLECTIONS } = require("../consts/collections");

exports.createUser = async (userData) => {
  const docRef = await db.collection(COLLECTIONS.USERS).add(userData);
  const doc = await docRef.get();

  return { id: doc.id, ...doc.data() };
};

exports.getUserByEmail = async (email) => {
  const snapshot = await db
    .collection(COLLECTIONS.USERS)
    .where("email", "==", email)
    .get();

  if (snapshot.empty) return null;

  let user;
  snapshot.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });

  return user;
};

exports.getUserById = async (id) => {
  const doc = await db.collection(COLLECTIONS.USERS).doc(id).get();

  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
};
