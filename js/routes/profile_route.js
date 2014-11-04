		
App.ProfileRoute = Ember.Route.extend(
	SimpleAuth.AuthenticatedRouteMixin,
	{
	user: Ember.computed.alias('session.content.user'),
	model : function(params) {
		var user = this.get('user');
		var feedId = 'user:' + user.id;
		var promise = Parse.Cloud.run('feed', {
			feed : feedId
		});
		return promise;
	}
}); 	
		
		
		
		
		
		
		
