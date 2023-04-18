const express = require('express');
const botsdk = require('@line/bot-sdk')

const app = express();

const port = 3000;

const  config = {
    channelAccessToken: "2xBA/01QDNTXCmFhUzyJ79KqPLayCjEziJ7SEAxDYRBWRs9kLRzULYc0pnrtwEUa8fyvQL0gcaYhvosccWfgb7v1g2Zx0HPbsjP9CTh7R3WCwbZ12f63LCyPNFbRKpVCfE0lD0tJURHUGrxhfPksrQdB04t89/1O/w1cDnyilFU=",
    channelSecret: "5d1e2e5fa7fb05bf9d58cc534a02a44a"
}
const  client = new botsdk.Client(config)

app.get('/', (req, res) => {
    res.send('哈囉')
})


app.post('/webhook', botsdk.middleware(config), (req, res) => {
    req.body.events.map((event) => {
        console.log(JSON.stringify(event, null, 2))
        if (event.message.type == 'text') {
            client.replyMessage(event.replyToken, { type: 'text', text: event.message.text })
        }
    })
    res.end()
})

app.listen(port, () => {
    console.log('server start')
});