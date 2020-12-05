// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var signin = document.getElementById("signin");
    var create = document.getElementById("create");
    signin.style.display = "none";
    create.style.display = "none";
    document.getElementById("avatar").src = user.photoURL;
  } else {
    var signout = document.getElementById("signout");
    signout.style.display = "none";
  }
});

function makeCard(
  postId,
  ccName,
  ccNumber,
  cvc,
  email,
  firstName,
  lastName,
  companyName,
  phone1,
  phone2,
  productInfo,
  website
) {
  console.log(email);
  htmlString = `<div class = "divBreak" id = ${postId} >
					<div class="card" style="width: 65rem; background-color: white; font-size: 18px; border-radius: 25px;
					border: 2px solid #73AD21;
					padding: 20px;
					" >
					<div class="card-body">
					<h5 class="card-title" style="font-weight: bold; font-size: 30px;">Advertiser: ${ccName}</h5>
					<p class="card-text">Credit Card Number: ${ccNumber}</p>
					<p class="card-text">CVC: ${cvc}</p>
					<p class="card-text">Email: ${email}</p>
					<p class="card-text">First Name: ${firstName}</p>
					<p class="card-text">Last Name: ${lastName}</p>
					<p class="card-text">Company Name: ${companyName}</p>
					<p class="card-text">Phone1: ${phone1}</p>
					<p class="card-text">Phone2: ${phone2}</p>
					<p class="card-text">Product Info: ${productInfo}</p>
					<p class="card-text">Website: ${website}</p>
					<div class="form-check form-check-inline">
					<div style=" zoom: 1.5;
					transform: scale(1.5);
					-ms-transform: scale(1.5);
					-webkit-transform: scale(1.5);
					-o-transform: scale(1.5);
					-moz-transform: scale(1.5);
					transform-origin: 0 0;
					-ms-transform-origin: 0 0;
					-webkit-transform-origin: 0 0;
					-o-transform-origin: 0 0;
					-moz-transform-origin: 0 0;">
					<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
					</div>
					&nbsp;&nbsp;
					<div style=" zoom: 1.5;
					transform: scale(1.5);
					-ms-transform: scale(1.5);
					-webkit-transform: scale(1.5);
					-o-transform: scale(1.5);
					-moz-transform: scale(1.5);
					transform-origin: 0 0;
					-ms-transform-origin: 0 0;
					-webkit-transform-origin: 0 0;
					-o-transform-origin: 0 0;
					-moz-transform-origin: 0 0;">
					<label class="form-check-label" for="inlineCheckbox1">Approve</label>
					</div>
					</div>
					<br/>
					<br/>
					<button style="background-color: #03d6d2;
					font-weight: bold;
					border: none;
					border-radius: 20px;
					width: 100%;
					color: black;
					padding: 12px 16px;
					font-size: 16px;
					cursor: pointer;
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);" onclick="sendEmail('${email}')">Send Email Notification</button>
					</div>
					</div>
					</br>
				
				</div>
				`;
  return htmlString;
}

function sendEmail(emailAdd) {
  console.log(`inside`);
  window.location = `mailto:${emailAdd}`;
}

function loadFirstPage() {
  var bottomPost;
  db.collection("advertiser_application")
    .limit(50)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postId = doc.id;
        ccName = doc.data().ccName.trim();
        ccNumber = doc.data().ccNumber.trim();
        cvc = doc.data().cvc;
        email = doc.data().email;
        firstName = doc.data().firstName;
        lastName = doc.data().lastName;
        companyName = doc.data().name;
        phone1 = doc.data().phone1;
        phone2 = doc.data().phone2;
        productInfo = doc.data().productInfo;
        website = doc.data().website;

        cardContainer.innerHTML += makeCard(
          postId,
          ccName,
          ccNumber,
          cvc,
          email,
          firstName,
          lastName,
          companyName,
          phone1,
          phone2,
          productInfo,
          website
        );
      });
    });
}
