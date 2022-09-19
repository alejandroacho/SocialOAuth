import axios from "axios";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const pluginName = import.meta.env.VITE_GOOGLE_PLUGIN_NAME;
const auth2Settings = {client_id: clientId, plugin_name: pluginName};

function googleLoginHandler(window) {
  window.gapi.load("auth2", () => {
    const auth2 = window.gapi.auth2.init(auth2Settings);
    const button = getGoogleButton(window.document);
    attachGoogleToButton(auth2, button);
  });
}

function getGoogleButton(document) {
  return document.getElementById("google");
}

function attachGoogleToButton(auth2, button) {
  auth2.attachClickHandler(button, {},
    (googleUser) => handleGoogleUser(googleUser),
    (error) => handleError(error)
  );
}

function handleGoogleUser(user) {
  const token = user.getAuthResponse().id_token;
  axios.post(import.meta.env.VITE_GOOGLE_BACKEND_URL, {token})
}

function handleError(error) {
  console.log("Google error:", JSON.stringify(error, undefined, 2));
}

export default googleLoginHandler;


