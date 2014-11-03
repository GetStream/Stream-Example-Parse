App.ApplicationController = Ember.Controller.extend({
	username: function() {
		var user = this.get('session.content.user');
		if (user) {
			return user.get('username');
		}
	}.property('session.content.user')
});