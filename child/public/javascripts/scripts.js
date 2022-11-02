const acceptedDomains = [
  'http://127.0.0.1:3000'
]

const iframeMessages = document.getElementById('iframe-messages')
let parentOrigin = '';

window.onload = () => {
  window.addEventListener('message', parseData, false)
  checkAuth()
}

function sendMessage(message) {
  if (window.self !== window.top) {
    window.parent.postMessage(message, parentOrigin)
  }
}

function parseData(message) {
  if (acceptedDomains.indexOf(message.origin) > -1 && message.data?.command) {
    const { data } = message;
    console.log('data', data)
    switch (data.command) {
      case 'SYNC_INIT':
        parentOrigin = message.origin;
        console.log('Sync with parent')
        appendStatus('Sync with parent.')
        sendMessage({
          command: 'SYNC_COMPLETE'
        })
        break;
      case 'FETCH_TOKEN':
        const accessToken = Math.random();
        sessionStorage.setItem('access_token', accessToken)
        appendStatus('Token set.')
        sendMessage({
          command: 'ACCESS_TOKEN',
          accessToken,
        })
        break;
      default:
        break;
    }
  }
}

function checkAuth() {
  const accessToken = sessionStorage.getItem('access_token')
  if (accessToken && window.self === window.top) {
    const message = `User is logged in with access token: ${accessToken}`
    appendStatus(message)
  }
}

function appendStatus(text) {
  const p = document.createElement("p")
  p.innerText = text
  setTimeout(() => {
    iframeMessages.append(p)
  }, 1000)
}