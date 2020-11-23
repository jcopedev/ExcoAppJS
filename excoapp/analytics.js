// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var user = firebase.auth().currentUser;
var name;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var signin = document.getElementById("signin");
    var create = document.getElementById("create");
    document.getElementById("avatar").src = user.photoURL;
    signin.style.display = "none";
    create.style.display = "none";
    name = user.displayName;
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

function makeCard2(postId, userName, message, excoCredits) {
  htmlString = `<div class = "divBreak" id = ${postId} >
					<div class="card" style="width: 35rem; background-color: white; font-size: 35px; border-radius: 25px;
					border: 2px solid #73AD21;
					padding: 20px;
					" >
					<div class="card-body">
					<h5 class="card-title" style="font-weight: bold; font-size: 30px;">${userName}</h5>
					<p class="card-text">${message}</p>
				</div>
					</div>
					</br>
				</div>
				`;
  return htmlString;
}

function loadFirstPage() {
  db.collection("posts")
    .where("credits", "==", 0)
    .where("username", "==", name)
    .orderBy("timeAlive", "desc")
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postId = doc.id;
        userName = doc.data().username.trim();
        message = doc.data().message.trim();
        timeAlive = doc.data().timeAlive;

        cardContainer.innerHTML += makeCard(
          postId,
          userName,
          message,
          timeAlive
        );
      });
    });

  db.collection("posts")
    .where("credits", "==", 1)
    .where("username", "==", name)
    .orderBy("timeAlive", "desc")
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postId = doc.id;
        userName = doc.data().username.trim();
        message = doc.data().message.trim();
        timeAlive = doc.data().timeAlive;

        liveContainer.innerHTML += makeCard2(postId, userName, message);
      });
    });

  db.collection("posts")
    .where("username", "==", name)
    .get()
    .then((querySnapshot) => {
      totalContainer.innerHTML = `
        <h5 class="card-title" style="font-weight: bold; font-size: 30px;">
          ${querySnapshot.size}
        </h5>
      `;
    });

  db.collection("posts")
    .where("credits", "==", 1)
    .where("username", "==", name)
    .get()
    .then((querySnapshot) => {
      activeCountContainer.innerHTML = `
        <h5 class="card-title" style="font-weight: bold; font-size: 30px;">
          ${querySnapshot.size}
        </h5>
      `;
    });
}
