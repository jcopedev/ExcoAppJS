// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var cardContainer = document.getElementById("cardContainer");

//Set the initial background color in RGB
var RED_COUNT = 255;
var BLUE_COUNT = 255;
var GREEN_COUNT = 255;
var bottomPost;

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

//Change the background color as your scroll
const [red, green, blue] = [2, 214, 210];
const section1 = document.getElementById("mainBody");

window.addEventListener("scroll", () => {
  let y = 1 + (window.scrollY || window.pageYOffset) / 3000;
  y = y < 1 ? 1 : y; // ensure y is always >= 1 (due to Safari's elastic scroll)
  const [r, g, b] = [red / y, green / y, blue / y].map(Math.round);
  section1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});

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
  } else {
    //alert("not signed in");
    //window.location.href = "./limitedTimeline.html";
  }
});


function signInPrompt(message) {
  alert(
    `${message} Sorry, you can't delete messages until you are signed in. Please sign in to delete this message.`
  );
}

function deletePost(postId, message) {
  signInPrompt(message);
}

function makeCard(postId, userName, message, excoCredits) {
  htmlString = `<div class = "divBreak" id = ${postId} >
					<div class="card" style="width: 28rem;  background-color: #41403E; border:solid 7px #41403E; border-radius: 25px;  box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;">
					<div class="card-body" style="background-color:  white; border:solid 7px #41403E;border-radius: 25px;  box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;" >
					<h5 class="card-title">${userName}</h5>
				    <h6 class="card-subtitle mb-2 text-muted">Exco Credits: ${excoCredits}</h6>
					<p class="card-text">${message}</p>
					<button class="float-right" onclick="deletePost('${postId}','${message}')" id = "deleteBtn" style="font-weight: bold; color: white; background-color: #666462;">Delete This!</button>
				</div>
					</div>
					</br>
				</div>
				`;
  return htmlString;
}

function loadNextPosts(/*prevBottomPost*/) {
  db.collection("posts")
    .where("credits", "==", 1)
    .orderBy("dateCreated", "asc")
    .startAfter(bottomPost)
    .limit(9)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postId = doc.id;
        userName = doc.data().username.trim();
        message = doc.data().message.trim();
        excoCredits = doc.data().credits;
        bottomPost = doc;

        cardContainer.innerHTML += makeCard(
          postId,
          userName,
          message,
          excoCredits
        );
      });
    });
}

function incrementRedBackground() {
  // RED_COUNT++;
  // GREEN_COUNT--;
  // BLUE_COUNT--;
  // if (RED_COUNT > 255) {
  //   RED_COUNT = 255;
  // }
  // if (GREEN_COUNT < 0) {
  //   GREEN_COUNT = 0;
  // }
  // if (BLUE_COUNT < 0) {
  //   BLUE_COUNT = 0;
  // }
  // document.body.style.backgroundColor = "Red";
  // // alert(document.body.style.backgroundColor);
  // document.getElementById("mainBody").style.backgroundColor = "Red";
}


function loadNextPage(/*bottomPost*/) {
  //incrementRedBackground();
  //TO DO: load ad
  loadNextPosts(/*bottomPost*/);
  return undefined;
}

	
$(window).on("scroll", function() {
  var scrollHeight = $(document).height();
  var scrollPos = $(window).height() + $(window).scrollTop();
  if ((scrollHeight - scrollPos) / scrollHeight == 0) {
	loadNextPage();
  }
});

function loadFirstPage() {
  // var bottomPost;
  document.getElementById("mainBody").style.backgroundColor =
    "rgb(2, 214, 210)";

  db.collection("posts")
    .where("credits", "==", 1)
    .orderBy("dateCreated", "asc")
    .limit(10)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postId = doc.id;
        userName = doc.data().username.trim();
        message = doc.data().message.trim();
        excoCredits = doc.data().credits;
        bottomPost = doc;

        cardContainer.innerHTML += makeCard(
          postId,
          userName,
          message,
          excoCredits
        );
      });
    });
}
