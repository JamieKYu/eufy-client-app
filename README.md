
# eufy-client-app

Simple client application to send an SMS message when person is detected on a Eufy device

## Pre-requisite Installations

Requires that you have eufy-security-ws and textbelt services up and running.  See:

```bash
  https://github.com/bropat/eufy-security-ws
  https://github.com/typpo/textbelt
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/JamieKYu/eufy-client-app
```

Go to the project directory

```bash
  cd eufy-client-app
```

Install npm packages

```bash
  npm install
```

Create a .env file at the git repo root folder

```bash
  nano .env
```

Paste the following lines with environment variables/values and save/exit.

```bash
  EUFY_SERVER=nnn.nnn.nnn.nnn
  EUFY_PORT=nnnn
  TEXTBELT_SERVER=nnn.nnn.nnn.nnn
  TEXTBELT_PORT=nnnn
  TEXTBELT_RECIPIENT=nnnnnnnnnn
```

Build the solution

```bash
  tsc
```

Run the application locally

```bash
  node ./dist/client.js
```


## Docker deployment

Build the project

```bash
  docker build -t jamiekyu/eufy-client-app .
```

Deploy and run the container

```bash
  docker run --name eufy-client-app -d -e EUFY_SERVER=nnn.nnn.nnn.nnn -e EUFY_PORT=nnnn
  -e TEXTBELT_SERVER=nnn.nnn.nnn.nnn -e TEXTBELT_PORT=nnnn -e TEXTBELT_RECIPIENT=nnnnnnnnnn
  jamiekyu/eufy-client-app

```
