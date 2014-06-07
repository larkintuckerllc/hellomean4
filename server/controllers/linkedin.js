var LinkedIn = require('../models/linkedin');

// TODO - JET Set clientID and clientSecret 
var OAuth2 = require('simple-oauth2')({
	clientID: '',
	clientSecret: '',
	site: 'https://www.linkedin.com',
	authorizationPath: '/uas/oauth2/authorization',
	tokenPath: '/uas/oauth2/accessToken'
});

// TODO - JET Set to DNS name of the server, e.g.
// var redirectURI = 'http://ec2-23-20-0-159.compute-1.amazonaws.com/linkedin/callback';
var redirectURI = 'http://localhost:3000/linkedin/callback';

exports.login = function(req, res) {
	var state = req.query.state;
	if (state) {
		var authorization_uri = OAuth2.AuthCode.authorizeURL({
			redirect_uri: redirectURI,
			scope: 'r_basicprofile',
			state: state
		});
		res.redirect(authorization_uri);
	} else {
		res.redirect('/');
	}
};

exports.callback = function(req, res) {
	var code = req.query.code; 
	var state = req.query.state; 
	if (code) {
		OAuth2.AuthCode.getToken({
			code: code,
			redirect_uri: redirectURI
		}, function (error, result) {
    			if (!error) { 
   				var token = OAuth2.AccessToken.create(result);
				LinkedIn.cache(token.token.access_token,
				function() {
					// SUCCESS
					res.redirect('/#/?token=' + token.token.access_token + '&state=' + state);
				},
				function() {
					// ERROR
					res.redirect('/');
				});
			} else {
				res.redirect('/');
			}
  		});
	} else {
		res.redirect('/');
	}
};
