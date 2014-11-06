App.ApplicationRoute = Ember.Route.extend(
	SimpleAuth.ApplicationRouteMixin, {
	model: function() {
		session = this.get('session');
		var user = Parse.User.current();
		if (user) {
			session.authenticate('authenticator:parse', {user: user});
		}
	},
	
	actions: {
		logout: function() {
			this.send('invalidateSession');
		},
		login: function() {
			document.location = '/authorize';		},
		followed: function() {
			var controller = this.get('controller');
			controller.set('followed', true);
		},
		posted: function() {
			var controller = this.get('controller');
			controller.set('posted', true);
		}
	}
}); 