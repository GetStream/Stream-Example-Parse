(function() {

var App = window.App = Ember.Application.create({
	//LOG_TRANSITIONS: true,
	//LOG_ACTIVE_GENERATION: true,
	//LOG_RESOLVER: true
});



})();
(function() {

App.Router.map(function () {
  this.route('people');
  this.resource('profile', { path: '/profile/:username/' });
});


})();
(function() {

App.AppActivityComponent = Ember.Component.extend({
	imageUrl : function() {
		var parseObject = this.get('activity').object_parse;
		if (parseObject) {
			var image = parseObject.get('image');
			return image.url();
		}
	}.property('activity')
});


})();
(function() {

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
			if (msg) {
				tweet = new Tweet();
				tweet.save({
					actor : 1,
					verb : 'tweet',
					object : 1,
					target : 1,
					tweet : msg
				}, {
					success : function(object) {
						console.log('saved');
					},
					error : function(model, error) {
						console.log('error');
					}
				});
			} else {
				// file upload
				var fileUploadControl = $("#profilePhotoFileUpload")[0];
				if (fileUploadControl.files.length > 0) {
					var file = fileUploadControl.files[0];
					var name = "photo.jpg";

					var parseFile = new Parse.File(name, file);
					parseFile.save().then(function() {
						// The file has been saved to Parse.
					}, function(error) {
						// The file either could not be read, or could not be saved to Parse.
					});
					var picture = new Picture();
					picture.save({
						actor : 1,
						verb : 'upload',
						target : 1,
						image : parseFile
					}).then(function() {
						console.log('saved succeed', arguments);
					}, function() {
						console.log('save failed', arguments);
					});
				}
			}
		}
	}
});


})();
(function() {

App.ApplicationRoute = Ember.Route.extend({

}); 

})();
(function() {

		
App.IndexRoute = Ember.Route.extend({
	model : function(params) {
		var promise = Parse.Cloud.run('feed', {
			feed : 'user:1'
		});
		return promise;
	},
	actions: {
		reload: function () {
			this.refresh();
		}
	}
}); 	
		
		
		
		
		
		
		


})();
(function() {

App.PeopleRoute = Ember.Route.extend({
	model : function(params) {
		q = new Parse.Query(Parse.User);
		q.limit(10);
		var promise = q.find(function(users) {
			return users;
		});
		return promise;
	}
}); 

})();
(function() {

		
App.ProfileRoute = Ember.Route.extend({
	model : function(params) {
		var promise = Parse.Cloud.run('feed', {
			feed : 'user:1'
		});
		return promise;
	}
}); 	
		
		
		
		
		
		
		


})();