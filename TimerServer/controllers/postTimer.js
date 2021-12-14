const { Expo } = require('expo-server-sdk')
const firebase = require('firebase-admin')




let expo = new Expo;

module.exports = async (req, res) => {
    let messages = []
    console.log("hej fra serveren")
    /*
    const userToken = await firebase.database().ref(`user/${req.body.uid}/token`)
    console.log("usertoken")
    console.log(userToken)
    console.log("task")
    console.log(req.body.task)
    */

    messages.push({
        to: "ExponentPushToken[gonXYEAoOksdOa9CABmx6-]",
        sound: 'default',
        body: "This is a test notification",
        data: {}
    })

    let chunks = expo.chunkPushNotifications(messages)
    for (let chunk of chunks) {
        await expo.sendPushNotificationsAsync(chunk)
    }

    res.send("Den gik sgu igennem")

}