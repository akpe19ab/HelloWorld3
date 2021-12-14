const { Expo } = require('expo-server-sdk')
const firebase = require('firebase-admin')


let expo = new Expo;

module.exports = async (req, res) => {
console.log(req.body)
    setTimeout(async () => {
        let messages = []
        const db = firebase.database()
        let token
        await db.ref("user").child(`/${req.body.uid}/token`).once("value", (snapshot) => {
            console.log("token")
            console.log(snapshot.val())
            token = snapshot.val()["token"] 
        })

        messages.push({
            to: token,
            sound: 'default',
            body: req.body.task.titel,
            data: {}
        })
        let chunks = expo.chunkPushNotifications(messages)
        
        for (let chunk of chunks) {
            await expo.sendPushNotificationsAsync(chunk)
        }
        
    }, req.body.tidIndtil)

    res.send("Den gik sgu igennem")

}