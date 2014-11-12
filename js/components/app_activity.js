App.AppActivityComponent = Ember.Component.extend({
	likeAction: 'like',
	unlikeAction: 'unlike',
	
	loading: false,
	isTweet : Ember.computed.equal('activity.verb', 'tweet'),
	isUpload : Ember.computed.equal('activity.verb', 'upload'),
	isLike : Ember.computed.equal('activity.verb', 'like'),
	isFollow : Ember.computed.equal('activity.verb', 'follow'),

	ago : function() {
		// small hack to force UTC
		var parsedDate = this.get('activity.time') + 'Z';
		var ago = moment(parsedDate).fromNow();
		return ago;
	}.property('time'),
	
	likedActivity: function() {
		var likeActivity = this.get('activity.object_parse');
		if (likeActivity) {
			var activityType = likeActivity.get('activityType');
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
	
	userImageUrl: function() {
		var parseObject = this.get('activity.actor_parse.attributes.image._url');
		return parseObject;
	}.property('activity'),
	
	followImageUrl: function() {
		var parseObject = this.get('activity.object_parse.attributes.image._url');
		return parseObject;
	}.property('activity'),
	
	likedActivity: function() {
		var activityType = this.get('activity.object_parse.attributes.activityType');
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
					component.set('activity.liked', true);
					console.log('saved like');
				},
				error : function(model, error) {
					component.set('loading', false);
					console.log('error like');
				}
			});
		},
		unlike: function() {
			var component = this;
			component.set('loading', true);
			var activity = component.get('activity');
			var currentUser = Parse.User.current();
			var doILikeQuery = new Parse.Query('Like');
			doILikeQuery.equalTo('activityId', activity.id);
			doILikeQuery.equalTo('actor', currentUser);
			var likePromise = doILikeQuery.find();
			likePromise.then(function(results) {
				var promises = [];
				if (results.length) {
					_.each(results, function(like) {
						promises.push(like.destroy());
					});
				}
				var all = Parse.Promise.when(promises);
				all.then(function() {
					component.set('loading', false);
					component.set('activity.liked', false);
				});
			});
		}
	}

});
