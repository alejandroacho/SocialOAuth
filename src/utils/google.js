import axios from "axios";


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const backendEndpoint = import.meta.env.VITE_GOOGLE_BACKEND_URL;


function googleLoginHandler(window) {
  setGoogleAccounts(window);
  const button = getGoogleButton(window.document);
  attachGoogleToButton(button);
}

function setGoogleAccounts(window) {
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleUser,
    });
  }
}

function getGoogleButton(document) {
  return document.getElementById("google");
}

function attachGoogleToButton(button) {
  button.onclick = function () {
    google.accounts.id.prompt();
  }
}

function handleGoogleUser(user) {
  const token = user.credential;
  axios.post(backendEndpoint, {token})
}

export default googleLoginHandler;
