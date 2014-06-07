var Credential = require('./credentials');
var https = require('https');
var LinkedIn = {};

LinkedIn.cache = function(token, success, error) {
	credential = new Credential({token: token});
	credential.save(function(err) {
		if (!err) {
			success();
		} else {
			error();
		}
	});
}

LinkedIn.authenticated = function(token, success, error) {
	Credential.findOne({'token': token}, function(err, credential) {
		if (!err) {
			if (credential) {
				success();
			} else {
				var options = {
					hostname: 'api.linkedin.com',
					port: 443,
					path: '/v1/people/~?oauth2_access_token=' + token,
					method: 'GET'
				}
				var req = https.request(options, function(res) {
					if (res.statusCode == 200) {
						LinkedIn.cache(token, success, error);
					} else {
						error();
					}
				});
				req.on('error', function(e) {
					error();
				});
				req.end();
			}
                } else {
			error();
		}
	});
}

module.exports = LinkedIn;
