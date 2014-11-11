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
	
	likedActivity: function() {
		var likeActivity = this.get('activity.object_parse');
		if (likeActivity) {
			var activityType = likeActivity.get('activity_type');
			var activity = likeActivity.get('activity_' + activityType);
			return activity;
		}
	}.property('activity.object_parse'),

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
	
	followImageUrl: function() {
		var parseObject = this.get('activity.object_parse.attributes.image._url');
		return parseObject;
	}.property('activity'),
	
	likedActivity: function() {
		var activityType = this.get('activity.object_parse.attributes.activity_type');
		var activity = this.get('activity.object_parse.attributes.activity_' + activityType);
		return activity;
	}.property('activity'),

	actions : {
		like : function() {
			var component = this;
			component.set('loading', true);
            var like = new Like();
            var user = Parse.User.current();
            // polymorphism is weird with parse
            var activity = component.get('activity');
            var parseActivity = component.get('activity.foreign_id_parse');
            var activityType = parseActivity.className;
            var activityField = 'activity_' + activityType;
            like.set(activityField, parseActivity);
            var streamActivityId = activity.id;
            like.set('activityId', streamActivityId);
            like.set('to', ['user:all']);
            
            // configure which feed to write to
			like.set('feedSlug', 'user');
			like.set('feedUserId', user.id);
            
			like.save({
				actor : user,
				verb : 'like',
				// the activity you like
				activity_type : activityType
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
