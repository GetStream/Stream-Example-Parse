App.Router.map(function () {
  this.route('people');
  this.resource('profile', { path: '/profile/:username/' });
});
