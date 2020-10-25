// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.collection("posts")
  .orderBy("credits", "desc")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().credits > 0) {
        console.log(`${doc.data().username} => ${doc.data().message}`);
        var userName = document.createElement("H2");
        userName.innerHTML = `${doc.data().username}`;
        document.body.appendChild(userName);

        var messageContent = document.createElement("H4");
        messageContent.innerHTML = `${doc.data().message}`;
        document.body.appendChild(messageContent);

        var creditCount = document.createElement("p");
        creditCount.innerHTML = `ExcoCredits: ${doc.data().credits}`;
        document.body.appendChild(creditCount);

        var deleteBtn = document.createElement("BUTTON");
        deleteBtn.innerHTML = "Delete This!";
        document.body.appendChild(deleteBtn);

        deleteBtn.onclick = function () {
          alert(
            "THIS WILL BE A MODAL: In order to delete or post, you need to signup for an account: signup link to be implemented"
          );
          return false;
        };
      }
    });
  });
