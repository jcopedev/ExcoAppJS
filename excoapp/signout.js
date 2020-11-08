//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }

function signout() {
    firebase.auth().signOut().then(function() {
        alert("Success!");
        window.location.href = './limitedtimeline.html';
      }).catch(function(error) {
        alert("Error!");
        window.location.href = "./userProfile.html";
      });
};