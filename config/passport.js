const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("config");
const User = require("../models/authModel/userModel");

module.exports = function(passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
	opts.secretOrKey = config.get("jwtSecret");
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id, (err, user) => {
				if (err) return done(err, false);

				if (user) return done(null, user);
				else return done(null, false);
			});
		})
	);
};
