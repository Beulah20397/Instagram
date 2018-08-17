module.exports = {

    'facebookAuth' : {
        'clientID'      : '223029621705614', // your App ID
        'clientSecret'  : '96f6688c0544224beff28a39165c89b9', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=jaspal,arneja,jamesrockstar7@gmail.com',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },
  }