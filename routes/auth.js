var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: '595ec00b8485f325dc3a',
    clientSecret: '3474b6d41ca7ba5d6d432aff565a1d93a48f1336',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));


router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    console.log(req.session)
    res.redirect('/');
  });



module.exports = router