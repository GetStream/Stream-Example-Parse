App.ApplicationController = Ember.Controller.extend({
	init: function() {
		this._super();
		$('#preember').hide();
	},
	posted: false,
	followed: false,
	user : Ember.computed.alias('session.content.user'),
	username : function() {
		var user = this.get('user');
		if (user) {
			return user.attributes.username;
		}
	}.property('user'),
	userImageUrl: function() {
		var url;
		var user = this.get('user');
		var image = user.get('image');
		if (image) {
			url = image.url();
		} else {
			url = 'https://getstream.parseapp.com/images/profile-pic.png';
		}
		return url;
	}.property('user'),
	displayName: function() {
		var username = this.get('username');
		var name = this.get('user').attributes.name;
		var displayName = (name) ? name.split(' ')[0] : username;
		return displayName; 
	}.property('user')
}); 