// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var signin = document.getElementById('signin');
    signin.style.display = "none";
  } else {
    var signout = document.getElementById('signout');
    signout.style.display = "none";
  }
});

const subjectTextField = document.querySelector("#subjectInput");
const feedbackTextField = document.querySelector("#mainInput");
const sendButton = document.querySelector("#send");
const confirmButton = document.querySelector("#sendconfirm");

sendButton.addEventListener("click", function () {
  const subjectLine = subjectTextField.value.replace(/[^a-zA-Z ]/g, "");
  const feedback = feedbackTextField.value.replace(/[^a-zA-Z ]/g, "");
  db.collection("feedback")
    .add({
      subject: subjectLine,
      message: feedback,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      //alert(
      //"Your message is currently at the very bottom of the message. You can add as many messages as you like, and you can also delete any messages that you don't like."
      //);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  console.log("sending feedback");
});

confirmButton.addEventListener("click", function () {
  window.location.href = "UserTimeline.html"; //relative to domain
  //can be change to "LimitedTimeline.html" for testing
});

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
