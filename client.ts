import {WebsocketBuilder} from 'websocket-ts';
import {v4 as uuidv4} from 'uuid';

const dotenv = require('dotenv').config();
const eufyServer = process.env.EUFY_SERVER;
const eufyPort = process.env.EUFY_PORT;
const WebSocket = require('ws');
const ws = new WebSocket('ws://' + eufyServer + ':' + eufyPort);
const textbeltServer = process.env.TEXTBELT_SERVER;
const textbeltPort = process.env.TEXTBELT_PORT;
const textbeltRecipient = process.env.TEXTBELT_RECIPIENT;
const speakServer = process.env.SPEAK_SERVER;
const speakPort = process.env.SPEAK_PORT;

ws.onopen = (event: any) => {
    log(`Open event received`);
}

ws.onclose = (event: any) => {
    log(`Close event received`);
}

ws.onmessage = (event: any) => {
    log(`Message event received`);
    handleMessage(JSON.parse(event.data));
}

ws.onerror = (error: any) => {
    log(`Error event received`);
    log(`${error.data}`);
}

function log (msg: string): void {
    console.log('[' + (new Date()).toLocaleString() + ']: ' + msg);
}

function handleMessage(msg: any): void {
    log('Handling message');
    log(JSON.stringify(msg));
    if (msg.type == 'result')
    {
        log('Message type: result');
        if (msg.success == true)
        {
            log('Result success');
        }
    }
    else if (msg.type == 'version')
    {
        log('Message type: version');
        let msgid = uuidv4();
        let msg = {"messageId": msgid, "command": "start_listening"}
        sendMessage(msg);
    }
    else if (msg.type == 'event')
    {
        log('Message type: event, source: ' + msg.event.source);
        if (msg.event.source == 'driver' || msg.event.source == 'station')
        {
            return;
        }
        handleDeviceEvent(msg.event);
    }
}

function handleDeviceEvent(event: any): void {
    log('Device Event: ' + event.event);
    if (event.name == 'personDetected' && event.value == true)
    {
        speak("There is someone at the door");
        sendText(event.name);
    }
}

function sendMessage(msg: any): void {
    let msgString = JSON.stringify(msg);
    log('Sending message');
    log(msgString);
    ws.send(msgString);
}

async function sendText(msg: string) {
    var requestUrl = 'http://' + textbeltServer + ':' + textbeltPort + '/text';
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("number", textbeltRecipient);
    urlencoded.append("message", msg);

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: urlencoded
    };

    fetch(requestUrl, requestOptions)
    .then(response => response.text())
    .then(result => log(result))
    .catch(error => log('ERROR: ' + error));
  }


  async function speak(msg: string) {
    var requestUrl = 'http://' + speakServer + ':' + speakPort + '/speak';
    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    var body = JSON.stringify({ text : msg });

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: body
    };

    fetch(requestUrl, requestOptions)
    .then(response => response.text())
    .then(result => log(result))
    .catch(error => log('ERROR: ' + error));
  }
