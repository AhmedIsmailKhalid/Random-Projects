'use strict';

window.addEventListener('load', function () {
  document.getElementById('sign-out').onclick = function () {
    firebase.auth().signOut().then(function() {
      window.location.href = "/login";
    });
  };

  var uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ]
  };

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById('sign-out').hidden = false;
      document.getElementById('login-info').hidden = false;
      console.log(`Signed in as ${user.displayName} (${user.email})`);
      user.getIdToken().then(function (token) {
        document.cookie = "token=" + token;
      });
    } else {
      document.getElementById('sign-out').hidden = true;
      document.getElementById('login-info').hidden = true;
      document.cookie = "token=";
    }
  }, function (error) {
    console.log(error);
    alert('Unable to log in: ' + error)
  });
});
