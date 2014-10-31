App.IndexController = Ember.Controller.extend({
	status : '',
	feedId : 'user:1',
	newActivities: false,
	
	feed: function() {
		var token = this.get('model.token');
		var feed = StreamClient.feed(this.get('feedId'), token);
		return feed;
	}.property('model.token'),
	
	listenToChanges: function() {
		var feed = this.get('feed');
		var controller = this;
		feed.subscribe(function callback(data) {
		    controller.set('newActivities', true);
		});
	}.observes('model'),

	actions : {
		like: function(activity) {
			like = new Like();
			like.save({
				actor : 1,
				verb : 'like',
				object : 1,
				target : 1,
				item : activity.foreign_id,
				user: users[0]
			}, {
				success : function(object) {
					console.log('saved like');
				},
				error : function(model, error) {
					console.log('error like');
				}
			});
		},
		
		status : function() {
			var msg = this.get('status');
			var fileUploadControl = $("#profilePhotoFileUpload")[0];
			var imageUpload = fileUploadControl.files.length > 0;
			
			if (msg || imageUpload) {
				
				var update = (imageUpload) ? new Picture() : new Tweet();
				var verb = (imageUpload) ? 'upload' : 'tweet';
				
				update.set('actor', Parse.User.current);
				update.set('verb', verb);
				update.set('tweet', msg);
				
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
						console.log('saved', verb);
					},
					error : function(model, error) {
						console.log('error', verb);
					}
				});
			}
		}
	}
});
