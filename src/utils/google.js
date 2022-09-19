import axios from "axios";


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const backendEndpoint = import.meta.env.VITE_GOOGLE_BACKEND_URL;


function googleLoginHandler(window) {
  setGoogleAccounts(window);
  const button = getGoogleButton(window.document);
  addButtonBehavior(button);
}

function setGoogleAccounts(window) {
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleUser,
    });
  }
}

function handleGoogleUser(user) {
  const token = user.credential;
  axios.post(backendEndpoint, {token})
}

function getGoogleButton(document) {
  return document.getElementById("google");
}

function addButtonBehavior(button) {
  button.onclick = function () {
    deleteCookie("g_state")
    google.accounts.id.prompt();
  }
}

function deleteCookie(name) {
  const expiration = "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = name + expiration;
}

export default googleLoginHandler;
