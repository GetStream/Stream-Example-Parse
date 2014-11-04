(function() {



ParseUser = EmberParseAdapter.ParseUser;

ParseAuthenticator = SimpleAuth.Authenticators.Base.extend({
  restore: function(data) {
    var adapter, sessionToken, store;
    if (data == null) {
      data = {};
    }
    store = this.container.lookup('store:main');
    adapter = store.adapterFor('application');
    
    sessionToken = data.sessionToken;

    adapter.set('sessionToken', sessionToken);
    var currentUser = Parse.User.current();
    var currentSessionToken = currentUser && currentUser._sessionToken;
    
    if (sessionToken && currentSessionToken != sessionToken){
    	Parse.User.become(sessionToken);	
    }
    adapter.set('sessionToken', user._sessionToken);

  },

  authenticate: function(data) {
    var adapter, store, user;
    if (data == null) {
      data = {};
    }
    store = this.container.lookup('store:main');
    adapter = store.adapterFor('application');
    user = data.user;
    
    if (user) {
      adapter.set('sessionToken', user._sessionToken);
      data = {
        userId: user.get('id'),
        user: user,
        sessionToken: user.get('sessionToken')
      };
      return Ember.RSVP.resolve(data);
    }
  },
  invalidate: function() {
    var adapter;
    Parse.User.logOut();
    adapter = this.container.lookup('adapter:application');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      adapter.set('sessionToken', null);
      return resolve();
    });
  }
});


Ember.Application.initializer({
  name: 'authentication',
  initialize: function(container, application) {
    container.register('authenticator:parse', ParseAuthenticator);
  }
});

var App = window.App = Ember.Application.create({
	//LOG_TRANSITIONS: true,
	//LOG_ACTIVE_GENERATION: true,
	//LOG_RESOLVER: true
});


App.ApplicationAdapter = EmberParseAdapter.Adapter.extend({
  applicationId: 'jybMJ0LPeOwp0dZZPDIeqw7Pjp9qyt6RBH2fekGe',
  restApiId: 'YPiCDgt10jpVCgg65EXmOc5wUFnnDs9Cxti1OLWW',
  javascriptId: 'atz5SiuIdVklUx7T0YZXQ9pLIzS5WehDKojrIdG6'
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

	actions : {
		like : function() {
			var component = this;
			component.set('loading', true);
            var like = new Like();
            // polymorphism is weird with parse
            var activity = component.get('activity.object_parse');
            var activity_type = activity.className;
            var activity_field = 'activity_' + activity.className;
            like.set(activity_field, activity);
            
			like.save({
				actor : Parse.User.current(),
				verb : 'like',
				// the activity you like
				activity_type : activity_type
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


})();
(function() {

App.ApplicationController = Ember.Controller.extend({
	user : Ember.computed.alias('session.content.user'),
	username : function() {
		var user = this.get('user');
		if (user) {
			return user.attributes.username;
		}
	}.property('user'),

}); 

})();
(function() {

App.IndexController = Ember.Controller.extend({
	status : '',
	errors: {},
	loading: null,
	
	feedId : 'user:1',
	newActivities: false,
	user: Ember.computed.alias('session.content.user'),
	
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
		status : function() {
			var msg = this.get('status');
			var fileUploadControl = $("#profilePhotoFileUpload")[0];
			var imageUpload = fileUploadControl.files.length > 0;
			var controller = this;
			
			
			if (msg || imageUpload) {
				controller.set('loading', true);
				var update = (imageUpload) ? new Picture() : new Tweet();
				var verb = (imageUpload) ? 'upload' : 'tweet';
				
				update.set('actor', Parse.User.current());
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
						controller.set('loading', false);
						console.log('saved', verb);
						$("form").get(0).reset()
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


})();
(function() {

App.ApplicationRoute = Ember.Route.extend(
	SimpleAuth.ApplicationRouteMixin, {
	model: function() {
		session = this.get('session');
		var user = Parse.User.current();
		if (user) {
			session.authenticate('authenticator:parse', {user: user});
		}
	},
	
	actions: {
		logout: function() {
			this.send('invalidateSession');
		},
		login: function() {
			document.location = '/authorize';		},
		follow : function(user) {
			alert(user);
			var follow = new Follow();
			follow.save({
				actor : Parse.User.current(),
				verb : 'follow',
				target_user : user
			}, {
				success : function(object) {
					console.log('saved follow');
				},
				error : function(model, error) {
					console.log('error follow');
				}
			});
		}
	}
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

		
App.ProfileRoute = Ember.Route.extend(
	SimpleAuth.AuthenticatedRouteMixin,
	{
	user: Ember.computed.alias('session.content.user'),
	model : function(params) {
		var user = this.get('user');
		var feedId = 'user:' + user.id;
		var promise = Parse.Cloud.run('feed', {
			feed : feedId
		});
		return promise;
	}
}); 	
		
		
		
		
		
		
		


})();