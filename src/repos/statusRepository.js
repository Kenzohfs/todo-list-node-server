const { db } = require("../../config/firebase");
const { COLLECTIONS } = require("../consts/collections");

exports.getAllStatus = async () => {
  const statusSnap = await db.collection(COLLECTIONS.STATUS).get();
  const status = [];

  statusSnap.forEach((doc) => {
    status.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return status;
};

exports.getStatusById = async (id) => {
  const statusDoc = await db.collection(COLLECTIONS.STATUS).doc(id).get();

  if (!statusDoc.exists) return null;

  return { id: statusDoc.id, ...statusDoc.data() };
};

exports.createStatus = async (data) => {
  const statusRef = await db.collection(COLLECTIONS.STATUS).add(data);
  const statusDoc = await statusRef.get();

  return { id: statusRef.id, ...statusDoc.data() };
};

exports.updateStatus = async (id, updateData) => {
  await db.collection(COLLECTIONS.STATUS).doc(id).update(updateData);
};

exports.deleteStatus = async (id) => {
  await db.collection(COLLECTIONS.STATUS).doc(id).delete();
};
