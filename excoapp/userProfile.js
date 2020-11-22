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

var usernameField = document.getElementById("newUsername");

//email fields
var newEmailField = document.getElementById("newEmail");
var oldEmailField = document.getElementById("oldEmail");
var passField = document.getElementById("pass");

//password fields
var oldPasswordField = document.getElementById("oldPass");
var newPasswordField = document.getElementById("newPass");
var newPasswordCheckField = document.getElementById("newPassCheck");
var emailField = document.getElementById("email");

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

function deleteAccount() {
  var user = firebase.auth().currentUser;
  var db = firebase.firestore();

  var posts = db.collection("posts");

  posts
    .where("username", "==", user.displayName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref
          .delete()
          .then(() => {
            console.log("Success!");
          })
          .catch(function (error) {
            console.error("Error deleting: ", error);
          });
      });
      user
        .delete()
        .then(function () {
          alert("Your account and posts have been deleted!");
        })
        .catch(function (error) {
          alert(error);
        });
    })
    .catch(function (error) {
      console.error("Error getting documents: ", error);
    });
}

function updateUsername() {
  var user = firebase.auth().currentUser;

  //var preUpdateTest = "";

  if (usernameField.value != "") {
    var name = user.displayName;
    //preUpdateTest += "New Username: " + usernameField.value;
    user
      .updateProfile({ displayName: usernameField.value })
      .then(() => {
        console.log("username: successfully updated");
      })
      .then(updatePosts(name, usernameField.value));
  }
  //alert(preUpdateTest);
}

function updatePosts(oldName, newName) {
  var db = firebase.firestore();
  var posts = db.collection("posts");

  posts
    .where("username", "==", oldName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref
          .update({ username: newName })
          .then(() => {
            console.log("Success!");
          })
          .catch(function (error) {
            console.error("Error updating: ", error);
          });
      });
    })
    .catch(function (error) {
      console.error("Error getting documents: ", error);
    });
}

function updateEmail() {
  var user = firebase.auth().currentUser;

  if (
    newEmailField.value != "" &&
    oldEmailField.value != "" &&
    passField.value != ""
  ) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      oldEmailField.value,
      passField.value
    );
    user.reauthenticateWithCredential(credential);
    //preUpdateTest += "New Email: " + emailField.value;
    user
      .updateEmail(newEmailField.value)
      .then(() => {
        console.log("email: successfully updated");
      })
      .catch((err) => {
        console.log("email: " + err.message);
      });
  }
  //alert(preUpdateTest);
}

function updatePassword() {
  var user = firebase.auth().currentUser;

  if (
    emailField.value != "" &&
    oldPasswordField.value != "" &&
    newPasswordField.value != "" &&
    newPasswordField.value == newPasswordCheckField.value
  ) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      emailField.value,
      oldPasswordField.value
    );
    user.reauthenticateWithCredential(credential);
    //preUpdateTest += "New Email: " + emailField.value;

    user
      .updatePassword(newPasswordField.value)
      .then(() => {
        console.log("password: successfully updated");
      })
      .catch((err) => {
        console.log("password: " + err.message);
      });
  } else if (newPasswordField.value != newPasswordCheckField.value) {
    alert("Password Mismatch! Update failed");
  }
  //alert(preUpdateTest);
}
