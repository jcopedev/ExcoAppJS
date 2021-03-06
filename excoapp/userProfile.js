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
    document.getElementById("picContainerImg").src = photoUrl;
    //window.location.href = "./userProfile.html";
    document.getElementById("avatar").src = photoUrl;
  } else {
    // alert("not signed in");
    window.location.href = "./index.html";
  }
});

document.getElementById("usernameContainer").innerHTML += name;
document.getElementById("titleContainer").innerHTML += name;
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//delete fields
var deleteEmailField = document.getElementById("deleteEmail");
var deletePasswordField = document.getElementById("deletePassword");

//username field
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

function onModalClose() {
  deleteEmailField.value = "";
  deletePasswordField.value = "";
  usernameField.value = "";
  newEmailField.value = "";
  oldEmailField.value = "";
  passField.value = "";
  oldPasswordField.value = "";
  newPasswordField.value = "";
  newPasswordCheckField.value = "";
  emailField.value = "";
}

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
  var method;
  var credential;
  user.providerData.forEach(function (profile) {
    method = profile.providerId;
  });

  var posts = db.collection("posts");

  if (deleteEmailField.value != "" && deletePasswordField.value != "") {
    if (method == "password") {
      credential = firebase.auth.EmailAuthProvider.credential(
        deleteEmailField.value,
        deletePasswordField.value
      );
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          posts
            .where("userID", "==", user.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref
                  .delete()
                  .then(() => {
                    console.log("Success!");
                    onModalClose();
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
        })
        .catch((err) => {
          alert(err.message);
          onModalClose();
        });
    } else if (method == "google.com") {
      // Creates the provider object.
      var provider = new firebase.auth.GoogleAuthProvider();
      // Reauthenticate with popup:
      user
        .reauthenticateWithPopup(provider)
        .then(
          function (result) {
            // The firebase.User instance:
            var user = result.user;
            // The Facebook firebase.auth.AuthCredential containing the Facebook
            // access token:
            credential = result.credential;
          },
          function (error) {
            // An error happened.
          }
        )
        .then(() => {
          posts
            .where("userID", "==", user.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref
                  .delete()
                  .then(() => {
                    console.log("Success!");
                    onModalClose();
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
        })
        .catch((err) => {
          alert(err.message);
          onModalClose();
        });
    }
  }
}

function updateUsername() {
  var user = firebase.auth().currentUser;

  if (usernameField.value != "") {
    var name = user.displayName;
    user
      .updateProfile({ displayName: usernameField.value })
      .then(() => {
        console.log("username: successfully updated");
        name = usernameField.value;
        document.getElementById("usernameContainer").innerHTML = name;
        document.getElementById("titleContainer").innerHTML = name;
        onModalClose();
      })
      .then(updatePosts(name, usernameField.value));
  }
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
            onModalClose();
          })
          .catch(function (error) {
            console.error("Error updating: ", error);
            onModalClose();
          });
      });
    })
    .catch(function (error) {
      console.error("Error getting documents: ", error);
      onModalClose();
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
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updateEmail(newEmailField.value)
          .then(() => {
            console.log("email: successfully updated");
            onModalClose();
          })
          .catch((err) => {
            console.log("email: " + err.message);
            onModalClose();
          });
      })
      .catch((err) => {
        alert(err.message);
        onModalClose();
      });
  }
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
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updatePassword(newPasswordField.value)
          .then(() => {
            console.log("password: successfully updated");
            onModalClose();
          })
          .catch((err) => {
            console.log("password: " + err.message);
            onModalClose();
          });
      })
      .catch((err) => {
        alert(err.message);
        onModalClose();
      });
  } else if (newPasswordField.value != newPasswordCheckField.value) {
    alert("Password Mismatch! Update failed");
    onModalClose();
  }
}
