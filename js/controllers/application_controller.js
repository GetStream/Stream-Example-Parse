App.ApplicationController = Ember.Controller.extend({
	user : Ember.computed.alias('session.content.user'),
	username : function() {
		var user = this.get('user');
		if (user) {
			return user.attributes.username;
		}
	}.property('user'),

}); 