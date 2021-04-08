var firebaseConfig = {
  apiKey: "AIzaSyA-6F0DjlfEcZ-PDM1Aa5d3yt8LvB5Zfh8",
  authDomain: "everythingcivil-c82db.firebaseapp.com",
  databaseURL: "https://everythingcivil-c82db-default-rtdb.firebaseio.com",
  projectId: "everythingcivil-c82db",
  storageBucket: "everythingcivil-c82db.appspot.com",
  messagingSenderId: "877076463719",
  appId: "1:877076463719:web:5f6195565bb3b90c1ad4c2",
  measurementId: "G-9GHM9320WY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //console.log(user);
  } else {
    window.location.href = "index.html";
  }
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location = "index.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showposts() {
  document.getElementById("postlist").innerHTML = "";
  firebase
    .firestore()
    .collection("posts")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        document.getElementById("postlist").innerHTML += `
                <tr>
                    <td>${doc.data().title}</td>
                    <td>
                        <button onClick="deletepost('${
                          doc.id
                        }')" class="btn btn-danger">Delete</button>
                    </td>
                </tr><br/>
            `;
      });
    });
}

function deletepost(id) {
  if (confirm("Are you Sure?")) {
    console.log(id);
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        alert("Data Removed Success");
        showposts();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

showposts();
