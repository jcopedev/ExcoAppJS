// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

const inputTextField = document.querySelector("#mainInput");
const saveButton = document.querySelector("#save");

saveButton.addEventListener("click", function () {
  const textToSave = inputTextField.value.replace(/[^a-zA-Z ]/g, "");
  db.collection("posts")
    .add({
      username: "Anonymous",
      message: textToSave,
      credits: 5,
      shieldPoints: 0,
      isPaid: false,
      dateCreated: Date.now(),
      dateDeleted: 0,
      isHidden: false,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      alert(
        "Congratulations! You shared your thoughts with the world. We filed your message in very special location: at the very bottom of the website!"
      );
      window.location.href = "Usertimeline.html"; //relative to domain
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
