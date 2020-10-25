// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//if signed in
db.collection("posts")
  .orderBy("credits", "desc")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().credits > 0) {
        console.log(
          `${doc.data().username} => ${doc.data().message}, ${
            doc.data().dateCreated
          }`
        );
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
            "Warning: You are about to delete this message from the entire website. It will be the last time anyone ever sees it. Are you sure you want to do that? Also, you will probably make the person who wrote this message sad."
          );
          doc.ref.update({
            credits: firebase.firestore.FieldValue.increment(-1),
          });
          if (doc.data().credits == 0) {
            doc.ref.update({ dateDeleted: date.now() });
          }
          return false;
        };
      }
    });
  });
