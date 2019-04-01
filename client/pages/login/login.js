function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    
    // Do not use a user's email address or user ID to communicate the currently 
    // signed-in user to your app's backend server. Instead, send the user's ID token
    // to your backend server and validate the token on the server, or use the server
    // auth code flow.

    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }
