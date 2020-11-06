// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//if signed in
db.collection("posts")
  .orderBy("credits", "desc")
  .get()
  .then((querySnapshot) => {
    document.body.style.backgroundImage =
      "linear-gradient( 135deg, #92FFC0 10%, #002661 100%)";

    //Overall Timeline Div
    var timelineDiv = document.createElement("div");
    timelineDiv.id = "timelineDiv";
    timelineDiv.className = "timelineDiv";
    document.body.appendChild(timelineDiv);

    timelineDiv.style.textAlign = "center";
    timelineDiv.style.width = "80%";
    timelineDiv.style.paddingLeft = "20%";

    var count = 1;
    querySnapshot.forEach((doc) => {
      if (doc.data().credits > 0) {
        console.log(
          `${doc.data().username} => ${doc.data().message}, ${
            doc.data().dateCreated
          }`
        );

        //post Div
        var postDiv = document.createElement("div");
        postDiv.id = "postDiv" + count;
        postDiv.className = "postDiv";
        document.getElementById("timelineDiv").appendChild(postDiv);

        var userName = document.createElement("h4");
        userName.innerHTML = `${doc.data().username}`;
        document.getElementById("postDiv" + count).appendChild(userName);
        userName.style.textAlign = "left";
        userName.style.padding = "2.5%";

        var messageContent = document.createElement("p");
        messageContent.innerHTML = `${doc.data().message}`;
        document.getElementById("postDiv" + count).appendChild(messageContent);
        messageContent.style.textAlign = "left";
        messageContent.style.padding = "2.5%";

        var creditCount = document.createElement("p");
        creditCount.innerHTML = `ExcoCredits: ${doc.data().credits}`;
        document.getElementById("postDiv" + count).appendChild(creditCount);
        creditCount.style.textAlign = "right";
        creditCount.style.padding = "2.5%";

        var deleteBtn = document.createElement("BUTTON");
        deleteBtn.innerHTML = "Delete This!";
        document.getElementById("postDiv" + count).appendChild(deleteBtn);
        deleteBtn.style.textAlign = "right";
        deleteBtn.style.display = "inline-block";
        deleteBtn.style.padding = "0.35em 1.2em";
        deleteBtn.style.border = "0.1em solid #FFFFFF";
        deleteBtn.style.margin = "0 0.3em 0.3em 0";
        deleteBtn.style.borderRadius = "0.12em";
        deleteBtn.style.boxSizing = "border-box";
        deleteBtn.style.fontFamily = "'Roboto',sans-serif";
        deleteBtn.style.fontWeight = "300";
        deleteBtn.style.color = "#FFFFFF";
        deleteBtn.style.transition = "all 0.2s";
        deleteBtn.style.backgroundColor = "#343A40";

        var breakElement = document.createElement("br");
        document.getElementById("postDiv" + count).appendChild(breakElement);

        document.getElementById("postDiv" + count).style.border =
          "5px solid #0BB5B3	";
        document.getElementById("postDiv" + count).style.boxShadow =
          "20px 20px rgba(0,0,0,.15)";
        document.getElementById("postDiv" + count).style.borderRadius = "25px";
        document.getElementById("postDiv" + count).style.marginBottom = "25px";
        document.getElementById("postDiv" + count).style.marginTop = "15px";
        count++;

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