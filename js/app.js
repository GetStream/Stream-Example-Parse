

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





