const db = require("../../config/firebase");
const { COLLECTIONS } = require("../consts/collections");

exports.getAllTasks = async () => {
  const tasksSnap = await db.collection(COLLECTIONS.TASKS).get();
  const tasks = [];

  tasksSnap.forEach((doc) => {
    tasks.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return tasks;
};

exports.createTask = async (data) => {
  const taskRef = await db.collection(COLLECTIONS.TASKS).add(data);
  const taskDoc = await taskRef.get();

  return { id: taskRef.id, ...taskDoc.data() };
};

exports.updateTask = async (id, updateData) => {
  await db.collection(COLLECTIONS.TASKS).doc(id).update(updateData);
};

exports.deleteTask = async (id) => {
  await db.collection(COLLECTIONS.TASKS).doc(id).delete();
};
