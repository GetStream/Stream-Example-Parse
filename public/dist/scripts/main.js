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


})();
(function() {

App.AppUserComponent = Ember.Component.extend({
	loading: false,
	followedAction: 'followed',
	reloadAction: 'reload',
	
	actions : {
		follow : function(user) {
			var follow = new Follow();
			var currentUser = Parse.User.current();
			var controller = this;
			controller.set('loading', true);
			
            // configure which feed to write to
			follow.set('feedSlug', 'user');
			follow.set('feedUserId', currentUser.id);
			
			follow.set('to', ['user:all']);
			follow.save({
				actor : currentUser,
				verb : 'follow',
				object : user
			}, {
				success : function(object) {
					console.log('saved follow');
					controller.set('loading', false);
					controller.sendAction('followedAction');
					controller.sendAction('reloadAction');
				},
				error : function(model, error) {
					controller.set('loading', false);
					console.log('error follow');
				}
			});
		}
	}
}); 

})();
(function() {

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
		var user = this.get('user');
		var image = user.get('image');
		return image.url();
	}.property('user'),
	displayName: function() {
		var username = this.get('username');
		var name = this.get('user').attributes.name;
		var displayName = (name) ? name.split(' ')[0] : username;
		return displayName; 
	}.property('user')
}); 

})();
(function() {

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
		followed: function() {
			var controller = this.get('controller');
			controller.set('followed', true);
		},
		posted: function() {
			var controller = this.get('controller');
			controller.set('posted', true);
		}
	}
}); 

})();
(function() {

		
App.IndexRoute = Ember.Route.extend({
	user: Ember.computed.alias('session.content.user'),
	model : function(params) {
		var promises = [];
		// lookup the global feed
		var promise = Parse.Cloud.run('feed', {
			feed : 'user:all'
		});
		promises.push(promise);
		// add the user feed
		var user = this.get('user');
		if (user) {
			promise = Parse.Cloud.run('feed', {
				feed : 'flat:' + user.id
			});
			promises.push(promise);
		}
		return Promise.all(promises).then(function(feeds){
			return {'globalFeed': feeds[0], 'flatFeed': feeds[1]};
		});
		
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
(function() {

App.CustomFileInputView = Ember.View.extend({
	templateName : 'views/custom_file_input',
	initialize : function() {
		$(document).on('change', '.btn-file :file', function() {
			var input = $(this), numFiles = input.get(0).files ? input.get(0).files.length : 1, label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
		});
		$(document).ready(function() {
			$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
				console.log(numFiles);
				console.log(label);
				$('#selected-image').html(label);
			});
		});
	}.on('didInsertElement'),
});


})();