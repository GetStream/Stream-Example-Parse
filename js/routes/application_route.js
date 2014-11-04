App.ApplicationRoute = Ember.Route.extend(SimpleAuth.ApplicationRouteMixin, {
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
		follow : function(user) {
			alert(user);
			var follow = new Follow();
			follow.save({
				actor : Parse.User.current(),
				verb : 'follow',
				target_user : user
			}, {
				success : function(object) {
					console.log('saved follow');
				},
				error : function(model, error) {
					console.log('error follow');
				}
			});
		}
	}
}); 