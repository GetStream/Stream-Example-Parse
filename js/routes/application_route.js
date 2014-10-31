App.ApplicationRoute = Ember.Route.extend({
	model: function() {
		session = this.get('session');
		session.authenticate('authenticator:parse', {});
	}
}); 