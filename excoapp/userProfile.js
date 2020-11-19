//Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    //alert(name);

    //this wasn't working outside this scope not sure why
    document.getElementById("emailContainer").innerHTML += email;
    document.getElementById("picContainer").innerHTML += photoURL;
    //alert(photoUrl);
    window.location.href = "./userProfile.html";
  } else {
    alert("not signed in");
    window.location.href = "./index.html";
  }
});

document.getElementById("usernameContainer").innerHTML += name;

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      alert("Success!");
      window.location.href = "./limitedtimeline.html";
    })
    .catch(function (error) {
      alert("Error!");
      window.location.href = "./userProfile.html";
    });
}
