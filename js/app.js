
import Base from 'simple-auth/authenticators/base';
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

export default ParseAuthenticator;

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

