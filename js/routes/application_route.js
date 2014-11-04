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
		follow : function(user) {
			var follow = new Follow();
			var user = Parse.User.current();
			follow.save({
				// write to the user feed
				feedId: 'user:' + user.id,
				actor : user,
				verb : 'follow',
				object : user
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