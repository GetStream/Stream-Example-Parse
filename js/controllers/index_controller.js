App.IndexController = Ember.Controller.extend({
	status : '',
	errors: {},
	loading: null,
	
	feedId : function() {
		return 'user:everybody';
		return 'flat:' + this.get('user').id;
	}.property('user'),
	
	newActivities: {},
	user: Ember.computed.alias('session.content.user'),
	userImageUrl: function() {
		var user = this.get('user');
		var image = user.get('image');
		return image.url();
	}.property('user'),
	
	getFeedData: function(name) {
		var data = this.get('model.' + name);
		if (data) {
			var token = data.token;
			var feedId = data.feed;
			var feed = StreamClient.feed(feedId, token);
			return feed;
		}
	},
	
	globalFeed: function() {
		return this.getFeedData('globalFeed');
	}.property('model.globalFeed.token'),
	
	flatFeed: function() {
		return this.getFeedData('flatFeed');
	}.property('model.flatFeed.token'),
	
	listenToChanges: function() {
		var controller = this;
		_.each(['globalFeed', 'flatFeed'], function(feedName) {
			var feed = controller.get(feedName);
			if (feed) {
				console.log('listening to', feed);
				feed.subscribe(function callback(data) {
				    controller.set('model.' + feedName + '.new', true);
				});
			}
		});
	}.observes('model'),

	actions : {
		status : function() {
			var msg = this.get('status');
			var fileUploadControl = $("#profilePhotoFileUpload")[0];
			var imageUpload = fileUploadControl.files.length > 0;
			var controller = this;
			
			
			if (msg || imageUpload) {
				controller.set('loading', true);
				var update = (imageUpload) ? new Picture() : new Tweet();
				var verb = (imageUpload) ? 'upload' : 'tweet';
				
				var user = Parse.User.current();
				// we write to the user feed
				update.set('feedSlug', 'user');
				update.set('feedUserId', user.id);
				// the feed data
				update.set('actor', user);
				update.set('verb', verb);
				update.set('tweet', msg);
				// to is also often used for things such as @mentions
				// see the docs https://getstream.io/docs/#targetting
				// think of it as ccing an email
				update.set('to', ['user:all']);
				
				if (imageUpload) {
					var file = fileUploadControl.files[0];
					var name = "photo.jpg";

					var parseFile = new Parse.File(name, file);
					parseFile.save().then(function() {
						// The file has been saved to Parse.
					}, function(error) {
						// The file either could not be read, or could not be saved to Parse.
					});
					update.set('image', parseFile);
				}
				 
				update.save(null, {
					success : function(object) {
						controller.set('loading', false);
						console.log('saved', verb);
						$("form").get(0).reset();
						controller.send('posted');
					},
					error : function(model, error) {
						controller.set('loading', false);
						var errors = {status: error};
						controller.set('errors', errors);
					}
				});
			} else {
				var errors = {status: 'Please write a status message or select a picture'};
				controller.set('errors', errors);
			}
		}
	}
});
