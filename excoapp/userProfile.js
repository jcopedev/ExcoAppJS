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
    alert(name);
		
	//this wasn't working outside this scope not sure why
	document.getElementById("emailContainer").innerHTML += email;
	document.getElementById("picContainer").innerHTML += photoURL;
    //alert(photoUrl);
  } else {
    alert("not signed in");
  }
});

document.getElementById("usernameContainer").innerHTML += name;

