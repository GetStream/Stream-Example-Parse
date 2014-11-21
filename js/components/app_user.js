App.AppUserComponent = Ember.Component.extend({
	loading: false,
	followedAction: 'followed',
	reloadAction: 'reload',
	
	actions : {
		follow : function(user) {
			var follow = new Follow();
			var currentUser = Parse.User.current();
			var controller = this;
			controller.set('loading', true);
			
            // configure which feed to write to
			follow.set('feedSlug', 'user');
			follow.set('feedUserId', currentUser.id);
			
			follow.set('to', ['user:all']);
			follow.save({
				actor : currentUser,
				verb : 'follow',
				object : user
			}, {
				success : function(object) {
					console.log('saved follow');
					controller.set('loading', false);
					controller.sendAction('followedAction');
					controller.sendAction('reloadAction');
				},
				error : function(model, error) {
					controller.set('loading', false);
					console.log('error follow');
				}
			});
		}
	}
}); 

App.AppUserHeaderComponent = App.AppUserComponent.extend({
	
});