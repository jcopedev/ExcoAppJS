// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

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
        //alert(email);
        //alert(photoUrl);
        document.getElementById('avatar').src = photoUrl;
        var signin = document.getElementById('signin');
        signin.style.display = "none";
    } else {
        // alert("not signed in");
        var signout = document.getElementById('signout');
        signout.style.display = "none";
    }
});

const inputTextField = document.querySelector("#mainInput");
const saveButton = document.querySelector("#saveconfirm");

saveButton.addEventListener("click", function () {
  const textToSave = inputTextField.value.replace(/[^a-zA-Z ]/g, "");
  db.collection("posts")
    .add({
      username: "Anonymous",
      message: textToSave,
      credits: 1,
      shieldPoints: 0,
      isPaid: false,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      dateDeleted: 0,
      isHidden: false,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      //alert(
		//"Your message is currently at the very bottom of the message. You can add as many messages as you like, and you can also delete any messages that you don't like." 
      //);
      window.location.href = "UserTimeline.html"; //relative to domain
      //can be change to "LimitedTimeline.html" for testing
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  console.log("saving exco-message");
});

var el;

function countCharacters(e) {
  var textEntered, countRemaining, counter;
  textEntered = document.getElementById("mainInput").value;
  counter = 500 - textEntered.length;
  countRemaining = document.getElementById("charactersRemaining");
  countRemaining.textContent = counter + " characters remaining...";
}
el = document.getElementById("mainInput");
el.addEventListener("keyup", countCharacters, false);

//This works but it's annoying when you are working so I commented it out.
// function GetCookie(name) {
  // var arg=name+"=";
  // var alen=arg.length;
  // var clen=document.cookie.length;
  // var i=0;
  // while (i<clen) {
    // var j=i+alen;
    // if (document.cookie.substring(i,j)==arg)
      // return "here";
    // i=document.cookie.indexOf(" ",i)+1;
    // if (i==0) break;
  // }
  // return null;
// }
// function manageVisitor(){
  // //do something if brand new user
  // var visit=GetCookie("FirstTimeVisitCookie");
  // if (visit==null){
    // var expire=new Date();
    // expire=new Date(expire.getTime()+7776000000);
    // document.cookie="FirstTimeVisitCookie=here; expires="+expire + ";path=/";
  // } else {
    // firebase.auth().onAuthStateChanged(function(user) {
      // if (user) {
        // //Do something if user is already logged in
        // window.location.href = 'userProfile.html'; // Returning visitor goes to timeline
      // } else {
        // //Do something if user is returning, but not logged in
        // window.location.href = 'limitedtimeline.html'; // Returning visitor goes to timeline (limitetimeline.html in excoappjs)
      // }
    // });

  // }
// }
// $(document).ready(function(){
  // manageVisitor();
// });