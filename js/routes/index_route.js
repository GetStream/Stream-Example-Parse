		
App.IndexRoute = Ember.Route.extend({
	user: Ember.computed.alias('session.content.user'),
	model : function(params) {
		var user = this.get('user');
		if (user) {
			var feedId = 'flat:' + user.id;
			var promise = Parse.Cloud.run('feed', {
				feed : feedId
			});
			return promise;
		}
	},
	actions: {
		reload: function () {
			this.refresh();
		}
	}
}); 	
		
		
		
		
		
		
		
