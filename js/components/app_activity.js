App.AppActivityComponent = Ember.Component.extend({
	isTweet: Ember.computed.equal('activity.verb', 'tweet'),
	isUpload: Ember.computed.equal('activity.verb', 'upload'),
	isLike: Ember.computed.equal('activity.verb', 'like'),
	
	ago : function() {
		var parsedDate = this.get('time');
		var ago = moment(parsedDate).fromNow();
		return ago;
	}.property('time'),
	
	username: function() {
		var username = this.get('activity.actor_parse.attributes.username');
		return username;
	}.property('user'),
	
	imageUrl : function() {
		var parseObject = this.get('activity').object_parse;
		if (parseObject) {
			var image = parseObject.get('image');
			if (image) {
				return image.url();
			}
		}
	}.property('activity')
});
