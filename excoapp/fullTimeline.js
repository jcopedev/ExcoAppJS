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
  } else {
    alert("not signed in");
  }
});

const inputTextField = document.querySelector("#mainInput");
const saveButton = document.querySelector("#save");

saveButton.addEventListener("click", function () {
  const textToSave = inputTextField.value.replace(/[^a-zA-Z ]/g, "");
  db.collection("posts")
    .add({
      username: name,
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

function condescend() {
  return undefined;
}

function hidePost(postId) {
  var selectedPost = document.getElementById(postId);
  selectedPost.style.display = "none";
}

function updateFirebase(postId, surviveTime) {
   
  db.collection("posts").doc(postId).update({
    credits: 0,
	timeAlive: surviveTime,
    dateDeleted: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function deleteWarning(message) {
  alert(
    `${message} Warning: You are about to delete this message from the entire website. It will be the last time anyone ever sees it. Are you sure you want to do that? Also, you will probably make the person who wrote this message sad.`
  );
}

function getDateCreated(_callback){
	var createdDate, dateRightNow;
	var docRef = db.collection("posts").doc(postId);

	docRef.get().then(function(doc) {
		if (doc.exists) {
			createdDate = doc.data().dateCreated.seconds;
			dateRightNow = Math.floor(Date.now() / 1000);
		} else {
			console.log("No such document!");
		}
		}).catch(function(error) {
		console.log("Error getting document:", error);
		}).then(() => {
			updateFirebase(postId, dateRightNow - createdDate);
		});
    _callback();    
}

function deletePost(postId, message) {
  deleteWarning(message);
  getDateCreated(function(postId) {
        console.log('huzzah, I\'m done!');
    }); 
  hidePost(postId);
  condescend();
}

function makeCard(postId, userName, message, excoCredits) {
  htmlString = `<div class = "divBreak" id = ${postId}>
					<div class="card" style="width: 28rem;">
					<div class="card-body">
					<h5 class="card-title">${userName}</h5>
				    <h6 class="card-subtitle mb-2 text-muted">Exco Credits: ${excoCredits}</h6>
					<p class="card-text">${message}</p>
					<button class="float-right" onclick="deletePost('${postId}','${message}')" id = "deleteBtn">Delete This!</button>
				</div>
					</div>
					</br>
				</div>
				`;
  return htmlString;
}

function loadNextPosts(/*prevBottomPost*/) {
  // var bottomPost;
  //const convertedDate = prevBottomPost.toDate();
  // var currentDate = new Date(prevBottomPost);
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
        // bottomPost = doc.data().dateCreated.toDate();

        cardContainer.innerHTML += makeCard(
          postId,
          userName,
          message,
          excoCredits
        );
      });
    })
    .then(() => {
      moreContainer.innerHTML += makeMoreButton(/*bottomPost*/);
    });
}

function incrementRedBackground() {
  RED_COUNT++;
  GREEN_COUNT--;
  BLUE_COUNT--;
  if (RED_COUNT > 255) {
    RED_COUNT = 255;
  }
  if (GREEN_COUNT < 0) {
    GREEN_COUNT = 0;
  }
  if (BLUE_COUNT < 0) {
    BLUE_COUNT = 0;
  }
  document.body.style.backgroundColor = `rgb(${RED_COUNT},${GREEN_COUNT},${BLUE_COUNT})`;
  alert(document.body.style.backgroundColor);
}

function hideMoreButton() {
  var selectedMoreButton = document.getElementById("moreButton");
  selectedMoreButton.style.display = "none";
  selectedMoreButton.remove();
}

function loadNextPage(/*bottomPost*/) {
  hideMoreButton();
  incrementRedBackground();
  //TO DO: load ad
  loadNextPosts(/*bottomPost*/);
  return undefined;
}

function makeMoreButton(/*bottomPost*/) {
  return `<div class="container">
				  <div class="row">
					<div class="col text-center">
					  <button class="" id = "moreButton" onclick="loadNextPage()">More</button>
					</div>
				  </div>
				</div>
			   </br>
						`;
}

function loadFirstPage() {
  // var bottomPost;
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
        // bottomPost = doc.data().dateCreated.toDate();

        cardContainer.innerHTML += makeCard(
          postId,
          userName,
          message,
          excoCredits
        );
      });
    })
    .then(() => {
      console.log("last", bottomPost);
      moreContainer.innerHTML += makeMoreButton(bottomPost);
    });
}

var fixmeTop = $(".postingTool").offset().top;
$(window).scroll(function () {
  var currentScroll = $(window).scrollTop();
  if (currentScroll >= fixmeTop) {
    $(".postingTool").css({
      position: "fixed",
      top: "0",
      left: "0",
    });
  } else {
    $(".postingTool").css({
      position: "static",
    });
  }
});
