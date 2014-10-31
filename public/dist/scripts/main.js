(function() {

define("app",
  ["simple-auth/authenticators/base","exports"],
  function(__dependency1__, __exports__) {
    "use strict";

    var Base = __dependency1__["default"];
    var ParseAuthenticator, ParseUser;

    ParseUser = EmberParseAdapter.ParseUser;

    ParseAuthenticator = Base.extend({
      restore: function(data) {
        var adapter, sessionToken, store;
        if (data == null) {
          data = {};
        }
        store = this.container.lookup('store:main');
        adapter = store.adapterFor('application');
        sessionToken = data.sessionToken;

        adapter.set('sessionToken', sessionToken);

        return store.modelFor('parseUser').current(store, data).then(function(user) {
          adapter.set('sessionToken', user.get('sessionToken'));
          data = {
            userId: user.get('id'),
            sessionToken: user.get('sessionToken')
          };
          return data;
        });
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
          adapter.set('sessionToken', user.get('sessionToken'));
          data = {
            userId: user.get('id'),
            sessionToken: user.get('sessionToken')
          };
          return Ember.RSVP.resolve(data);
        } else {
          return store.modelFor('user').login(store, data).then(function(user) {
            adapter.set('sessionToken', user.get('sessionToken'));
            data = {
              userId: user.get('id'),
              sessionToken: user.get('sessionToken')
            };
            return data;
          });
        }
      },
      invalidate: function() {
        var adapter;
        adapter = this.container.lookup('adapter:application');
        return new Ember.RSVP.Promise(function(resolve, reject) {
          adapter.set('sessionToken', null);
          return resolve();
        });
      }
    });

    __exports__["default"] = ParseAuthenticator;

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
  });

})();
(function() {

define("router",
  [],
  function() {
    "use strict";
    App.Router.map(function () {
      this.route('people');
      this.resource('profile', { path: '/profile/:username/' });
    });
  });

})();
(function() {

define("app_activity",
  [],
  function() {
    "use strict";
    App.AppActivityComponent = Ember.Component.extend({
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
  });

})();
(function() {

define("index_controller",
  [],
  function() {
    "use strict";
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
  });

})();
(function() {

define("application_route",
  [],
  function() {
    "use strict";
    App.ApplicationRoute = Ember.Route.extend({
    	model: function() {
    		session = this.get('session');
    		session.authenticate('authenticator:parse', {});
    	}
    });
  });

})();
(function() {

define("index_route",
  [],
  function() {
    "use strict";
    		
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
  });

})();
(function() {

define("people_route",
  [],
  function() {
    "use strict";
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
  });

})();
(function() {

define("profile_route",
  [],
  function() {
    "use strict";
    		
    App.ProfileRoute = Ember.Route.extend({
    	model : function(params) {
    		var promise = Parse.Cloud.run('feed', {
    			feed : 'user:1'
    		});
    		return promise;
    	}
    });
  });

})();