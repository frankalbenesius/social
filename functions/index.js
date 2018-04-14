const admin = require('firebase-admin')
const functions = require('firebase-functions')
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

exports.onRequestUpdate = functions.firestore
  .document('/users/{userId}/requests/{friendId}')
  .onUpdate((change, context) => {
    const data = change.after.data()
    const previousData = change.before.data()
    if (data.accepted === previousData.accepted) return Promise.resolve()
    if (data.accepted !== true) return Promise.resolve()

    const userId = context.params.userId
    const friendId = context.params.friendId
    const batch = db.batch()
    batch.set(db.doc(`/users/${userId}/friends/${friendId}`), {
      user: friendId,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    })
    batch.set(db.doc(`/users/${friendId}/friends/${userId}`), {
      user: userId,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    })
    batch.delete(change.after.ref)
    return batch.commit()
  })
