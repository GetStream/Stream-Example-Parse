		
App.ProfileRoute = Ember.Route.extend({
	model : function(params) {
		var promise = Parse.Cloud.run('feed', {
			feed : 'user:1'
		});
		return promise;
	}
}); 	
		
		
		
		
		
		
		
