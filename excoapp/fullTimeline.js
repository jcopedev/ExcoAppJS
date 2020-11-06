// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var cardContainer = document.getElementById('cardContainer');

function condescend(){
	return undefined;
}

function hidePost(postId){
    var selectedPost = document.getElementById(postId);
	selectedPost.style.display = "none";	
}

function updateFirebase(postId){
    db.collection("posts").doc(postId).update({
		credits: 0,
		dateDeleted: firebase.firestore.FieldValue.serverTimestamp()
    });	
}

function deleteWarning(message){
	alert(`${message} Warning: You are about to delete this message from the entire website. It will be the last time anyone ever sees it. Are you sure you want to do that? Also, you will probably make the person who wrote this message sad.`);
}

function deletePost(postId, message){
	deleteWarning(message);
	updateFirebase(postId);
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
				`
    return htmlString;
}

function loadNextPosts(prevBottomPost){
		var bottomPost;
		//const convertedDate = prevBottomPost.toDate();
		var currentDate = new Date(prevBottomPost);
		db.collection("posts")
		    .where("credits", "==", 1)
			.orderBy("dateCreated", "asc")
			.where("dateCreated", ">", currentDate)
			.limit(9)
			.get()
			.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				
				postId = doc.id;
				userName = doc.data().username.trim();
				message = doc.data().message.trim();
				excoCredits = doc.data().credits;
				bottomPost = doc.data().dateCreated;
						
				cardContainer.innerHTML += makeCard(postId, userName, message, excoCredits);             
						
			});
		  }) 
			.then(() => {
				moreContainer.innerHTML += makeMoreButton(bottomPost); 
		});
	
}

function hideMoreButton(){
	var selectedMoreButton = document.getElementById('moreButton');
	selectedMoreButton.style.display = "none";
	selectedMoreButton.remove();
}

function loadNextPage(bottomPost){
	    hideMoreButton();
		//TO DO: load ad
		loadNextPosts(bottomPost);
		return undefined;
}

function makeMoreButton(bottomPost){
		return `<div class="container">
				  <div class="row">
					<div class="col text-center">
					  <button class="" id = "moreButton" onclick="loadNextPage('${bottomPost}')">More</button>
					</div>
				  </div>
				</div>
						`
		}

function loadFirstPage(){
		var bottomPost;
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
					bottomPost = doc.data().dateCreated;
						
					cardContainer.innerHTML += makeCard(postId, userName, message, excoCredits);
						
			});
		  }) 
			.then(() => {
				moreContainer.innerHTML += makeMoreButton(bottomPost); 
		});		
	}