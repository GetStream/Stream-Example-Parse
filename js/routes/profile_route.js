		
App.ProfileRoute = Ember.Route.extend(
{
	user: Ember.computed.alias('session.content.user'),
	model : function(params) {
		q = new Parse.Query(Parse.User);
		q.equalTo('username', params.username);
		var userPromise = q.first();
		var modelPromise = userPromise.then(function(user) {
			return feedPromise = Parse.Cloud.run('feed', {
				feed : 'user:' + user.id
			}).then(function(feed) {
				return {profile: user, feed:feed};
			});
		});
		return modelPromise;
	}
});
		
		
		
		
		
		
		
