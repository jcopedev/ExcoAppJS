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
	} else {
		alert("not signed in");
	}
});

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
				`
    return htmlString;
}


function loadFirstPage(){
		var bottomPost;
		db.collection("posts")
				.where("credits", "==", 0)
				.orderBy("dateCreated", "asc")
				.limit(50)
				.get()
				.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
				
					postId = doc.id;
					userName = doc.data().username.trim();
					message = doc.data().message.trim();
					excoCredits = doc.data().credits;
					bottomPost = doc.data().dateCreated.toDate();
						
					cardContainer.innerHTML += makeCard(postId, userName, message, excoCredits);						
			});
				})

	}