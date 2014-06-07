var Winery = require('../models/wineries.js');
var Wine = require('../models/wines.js');
var LinkedIn = require('../models/linkedin.js');

exports.findAll = function(req, res) {
	var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			Winery.find(function(err, wineries) {
				if (!err) {
					res.send(wineries);
				} else {
					res.statusCode = 500;
					res.send('500');
				}
			});
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('403');
		}
	);
};
 
exports.findById = function(req, res) {
	var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			var _id = req.params._id;
			Winery.findById(_id, function(err, winery) {
				if (!err) {
					if (winery) {	
						res.send(winery);
					} else {
						res.statusCode = 404;
						res.send('404');
					}
				} else {
					res.statusCode = 500;
					res.send('500');
				}
			});
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('403');
		}
	);
};


exports.delete = function(req, res) {
	var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			var _id = req.params._id;
			Wine.remove({winery: _id}, function(err) {
				if (!err) {
					Winery.findByIdAndRemove(_id, function(err, winery) {
						if (!err) {
							if (winery) {	
								res.send(winery);
							} else {
								res.statusCode = 404;
								res.send('404');
							}
						} else {
							res.statusCode = 500;
							res.send('500');
						}
					});
				} else {
					res.statusCode = 500;
					res.send('500');
				}
			});	
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('403');
		}
	);
};

 
exports.add = function(req, res) {
	var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			if (req.is('application/json')) {
				var winery = new Winery({name: req.body.name});		
				winery.save(function(err) {
					if (!err) {
						res.send(winery);
					} else {
						res.statusCode = 400;
						res.send('400');
					}		
				});
			} else {
				res.statusCode = 400;
				res.send('400');
			}
		},
		function () {
			// ERROR
			res.statusCode = 403;
			res.send('403');
		}
	);
}
 
exports.update = function(req, res) {
	var token = req.query.token;
	LinkedIn.authenticated(token,
		function() {
			// SUCCESS
			if (req.is('application/json')) {
				var _id = req.params._id;
				Winery.findById(_id, function(err, winery) {
					if (!err) {
						if (winery) {	
							winery.name = req.body.name;
							winery.save(function(err) {
								if (!err) {
									res.send(winery);
								} else {
									res.statusCode = 400;
									res.send('400');
								}		
							});
						} else {
							res.statusCode = 404;
							res.send('404');
						}
					} else {
						res.statusCode = 500;
						res.send('500');
					}
				});
			} else {
				res.statusCode = 400;
				res.send('400');
			}
		},
		function() {
			// ERROR
			res.statusCode = 403;
			res.send('403');
		}
	);
}
