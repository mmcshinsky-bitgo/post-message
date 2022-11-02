const acceptedDomains = [
  'http://127.0.0.1:3001'
]
const childOrigin = 'http://127.0.0.1:3001'

const iframeMessages = document.getElementById('iframe-messages')
let iframeEl = '';
let synced = false;

window.onload = () => {
  initIframe()
  initMessages()
  initButton();
}

function initIframe() {
  const iframeContainer = document.getElementById('iframe-container')

  const iframeId = 'child-iframe'
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', childOrigin)
  iframe.setAttribute('id', iframeId)

  iframeContainer.appendChild(iframe)

  iframe.onload = function () {
    iframeEl = document.getElementById(iframeId)
    appendStatus('Sync with child.')
    sendMessage({
      command: 'SYNC_INIT'
    })
  }
}

function initMessages() {
  window.addEventListener('message', parseData, false)
}

function sendMessage(message) {
  iframeEl.contentWindow.postMessage(message, childOrigin)
}

function parseData(message) {
  if (acceptedDomains.indexOf(message.origin) > -1 && message.data?.command) {
    const { data } = message;
    switch (data.command) {
      case 'SYNC_COMPLETE': {
        synced = true;
        appendStatus('Sync completed successfully.')
        break;
      }
      case 'ACCESS_TOKEN': {
        sessionStorage.setItem('access_token', data.accessToken);
        appendStatus('Received and set access token. Redirecting in 3 seconds.')
        setTimeout(() => {
          window.location.href = childOrigin
        }, 3000)
        break;
      }
      default:
        break;
    }
  }
}

function initButton() {
  const btn = document.getElementById('iframe-login');
  btn.addEventListener('click', function () {
    sendMessage({
      command: 'FETCH_TOKEN'
    })
  })
}

function appendStatus(text) {
  const p = document.createElement("p")
  p.innerText = text
  setTimeout(() => {
    iframeMessages.append(p)
  }, 1000)
}