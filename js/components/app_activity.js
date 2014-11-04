App.AppActivityComponent = Ember.Component.extend({
	likeAction: 'like',
	
	loading: false,
	isTweet : Ember.computed.equal('activity.verb', 'tweet'),
	isUpload : Ember.computed.equal('activity.verb', 'upload'),
	isLike : Ember.computed.equal('activity.verb', 'like'),
	isFollow : Ember.computed.equal('activity.verb', 'follow'),

	ago : function() {
		var parsedDate = this.get('time');
		var ago = moment(parsedDate).fromNow();
		return ago;
	}.property('time'),

	username : function() {
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
	}.property('activity'),

	actions : {
		like : function() {
			var component = this;
			component.set('loading', true);
            var like = new Like();
			like.save({
				actor : Parse.User.current(),
				verb : 'like',
				item : component.get('activity.foreign_id'),
			}, {
				success : function(object) {
					component.set('loading', false);
					console.log('saved like');
				},
				error : function(model, error) {
					component.set('loading', false);
					console.log('error like');
				}
			});
		}
	}

});
