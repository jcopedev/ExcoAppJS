// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var signin = document.getElementById('signin');
    var create = document.getElementById('create');
    signin.style.display = "none";
      create.style.display = "none";
      document.getElementById('avatar').src = user.photoURL;
  } else {
    var signout = document.getElementById("signout");
    signout.style.display = "none";
  }
});

function makeCard(postId, userName, message, excoCredits) {
  htmlString = `<div class = "divBreak" id = ${postId} >
					<div class="card" style="width: 35rem; background-color: white; font-size: 35px; border-radius: 25px;
					border: 2px solid #73AD21;
					padding: 20px;
					" >
					<div class="card-body">
					<h5 class="card-title" style="font-weight: bold; font-size: 30px;">${userName}</h5>
				    <h6 class="card-subtitle mb-2 text-muted">Survival Time (sec.): ${excoCredits}</h6>
					<p class="card-text">${message}</p>
				</div>
					</div>
					</br>
				</div>
				`;
  return htmlString;
}

function loadFirstPage() {
  var bottomPost;
  db.collection("posts")
    .where("credits", "==", 0)
    .orderBy("timeAlive", "desc")
    .limit(50)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postId = doc.id;
        userName = doc.data().username.trim();
        message = doc.data().message.trim();
        timeAlive = doc.data().timeAlive;
        bottomPost = doc.data().dateCreated.toDate();

        cardContainer.innerHTML += makeCard(
          postId,
          userName,
          message,
          timeAlive
        );
      });
    });
}
