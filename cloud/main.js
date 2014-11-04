var stream = require('cloud/getstream.js');
var github = require('cloud/github.js');
var utils = require('cloud/utils.js');
var _ = require('underscore');

/*
 * Settings are defined below
 */

// define your stream connection details
var streamApiKey = 'hdhuew2dzq5k';
var streamApiSecret = 'enqn9tj4ktmpm777kwwtzwm7zk7qnsgm485p6ekt8twjv5ms7t98yvazs3szakqc';
var streamSite = '738';
// define which parse models you want to treat as getstream.io activities
var activityModels = ['Tweet', 'Picture', 'Like'];
// define which parse model stores your follow state
var followModel = 'Follow';


var client = stream.connect(streamApiKey, streamApiSecret, streamSite);

/*
 * Listen to the activityModels afterSave and afterDelete
 * and send the activities to getstream.io
 */
_.each(activityModels, function(model) {
	Parse.Cloud.afterSave(model, function(request, response) {
		// trigger fanout
		var activity = utils.parseToActivity(request.object);
		user1 = client.feed('user:1');
		user1.addActivity(activity);
	});

	Parse.Cloud.afterDelete(model, function(request) {
		// trigger fanout to remove
		var activity = utils.parseToActivity(request.object);
		user1 = client.feed('user:1');
		user1.removeActivity({
			foreignId : activity.foreign_id
		});
	});
});

/*
 * Sync the follow state to getstream.io
 */
Parse.Cloud.afterSave(followModel, function(request, response) {
	// trigger fanout & follow
	var parseObject = request.object;
	var activity = utils.parseToActivity(parseObject);
	user1 = client.feed('user:1');
	user1.addActivity(activity);
	flat1 = client.feed('flat:' + parseObject.get('user'));
	flat1.follow('user:' + parseObject.get('target_user'));
});

Parse.Cloud.afterDelete(followModel, function(request) {
	// trigger fanout & unfollow
	var parseObject = request.object;
	var activity = utils.parseToActivity(parseObject);
	user1 = client.feed('user:1');
	user1.removeActivity({
		foreignId : activity.foreign_id
	});
	flat1 = client.feed('flat:' + parseObject.get('user'));
	flat1.unfollow('user:' + parseObject.get('target_user'));
});

/*
 * View to retrieve the feed, expects feed in the format user:1
 */
Parse.Cloud.define("feed", function(request, response) {
	var activities = [];
	var feedIdentifier = request.params.feed;
	var feed = client.feed(feedIdentifier);
	feed.get({
		limit : 20
	}, function(httpResponse) {
		activities = httpResponse.data;
		var promise = utils.enrich(activities.results);
		promise.then(function(activities) {
			response.success({
				activities : activities,
				feed : feedIdentifier,
				token : feed.token
			});
		});
	});
});


