import axios from "axios";


const app_id = import.meta.env.VITE_FACEBOOK_APP_ID;
const api_version = import.meta.env.VITE_FACEBOOK_API_VERSION;
const backendEndpoint = import.meta.env.VITE_FACEBOOK_BACKEND_URL;


function facebookLoginHandler(window) {
  initializeFacebook(window);
  addFacebookFunctionality();
  const button = getFacebookButton(document);
  addButtonBehavior(button);
}

function initializeFacebook(window) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : app_id,
      cookie     : true,
      xfbml      : true,
      version    : api_version
    });
    FB.AppEvents.logPageView();
    onLoadLogout();
  };
}

function addFacebookFunctionality() {
  var js, facebook_js = document.getElementsByTagName("script")[0];
  if (document.getElementById("facebook-jssdk")) return;
  js = document.createElement("script");
  js.id = "facebook-jssdk";
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  facebook_js.parentNode.insertBefore(js, facebook_js);
}

function onLoadLogout() {
  FB.getLoginStatus(function(response) {
    if (response.status === "connected") logout();
  });
}

function logout() {
  FB.logout(function(response) {});
}

function getFacebookButton(document) {
  return document.getElementById("facebook");
}

function addButtonBehavior(button) {
  button.onclick = function () {
    login();
  }
}

function login() {
  FB.login(function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }, {
    scope: 'email,public_profile'
  });
}

function statusChangeCallback(response) {
  if (response.status === "connected") {
    const token = response.authResponse.accessToken;
    axios.post(backendEndpoint, {token})
  };
}

export default facebookLoginHandler;
