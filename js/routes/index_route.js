		
App.IndexRoute = Ember.Route.extend({
	user: Ember.computed.alias('session.content.user'),
	model : function(params) {
		var promises = [];
		// lookup the global feed
		var promise = Parse.Cloud.run('feed', {
			feed : 'user:all'
		});
		promises.push(promise);
		// add the user feed
		var user = this.get('user');
		if (user) {
			promise = Parse.Cloud.run('feed', {
				feed : 'user:' + user.id
			});
			promises.push(promise);
		}
		return Promise.all(promises).then(function(feeds){
			return {'globalFeed': feeds[0], 'flatFeed': feeds[1]};
		});
		
	},
	actions: {
		reload: function () {
			this.refresh();
		}
	}
}); 	
		
		
		
		
		
		
		
