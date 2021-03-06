// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "UserTimeline.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,

    //Other "Federated" Sign in options:
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "tos.html",
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign("tos.html");
  },
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

function GetCookie(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) return "here";
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}
function manageVisitor() {
  //do something if brand new user
  var visit = GetCookie("FirstTimeVisitCookie");
  if (visit == null) {
    var expire = new Date();
    expire = new Date(expire.getTime() + 7776000000);
    document.cookie =
      "FirstTimeVisitCookie=here; expires=" + expire + ";path=/";
  } else {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //Do something if user is already logged in
        window.location.href = "usertimeline.html"; // Returning visitor goes to timeline
      } else {
        //Do something if user is returning, but not logged in
        //pass through to authenticate
        //window.location.href = 'limitedtimeline.html'; // Returning visitor goes to timeline (limitetimeline.html in excoappjs)
      }
    });
  }
}
function validateAdmin() {
  var password = document.getElementById("pass").value;
  console.log(password);
  if (password === "admin123") {
    document.getElementById("pass").value = "";
    window.location.href = "AdvertiserApproval.html";
  } else {
    document.getElementById("passError").innerText =
      "wrong password try again!";
  }
  document.getElementById("pass").value = "";
}
$(document).ready(function () {
  manageVisitor();
});
