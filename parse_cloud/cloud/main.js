stream = require('cloud/getstream.js');
github = require('cloud/github.js');


var streamApiKey = 'hdhuew2dzq5k';
var streamApiSecret = 'enqn9tj4ktmpm777kwwtzwm7zk7qnsgm485p6ekt8twjv5ms7t98yvazs3szakqc';
var streamSite = '738';
var activityModels = ['Tweet', 'Picture', 'Like'];
var followModel = 'Follow';

client = stream.connect(streamApiKey, streamApiSecret, streamSite);

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
		response.success({
			activities : activities,
			feed : feedIdentifier,
			token: feed.token
		});
	});
});

/*
 * Listen to the activityModels afterSave and afterDelete
 * and send the activities to getstream.io
 */
for (var i = 0; i < activityModels.length; i++) { 
    var model = activityModels[i];
    Parse.Cloud.afterSave(model, function(request, response) {
		// trigger fanout
		var parseObject = request.object;
		var activity = parseToActivity(parseObject);
		user1 = client.feed('user:1');
		user1.addActivity(activity);
	});
	
	Parse.Cloud.afterDelete(model, function(request) {
		// trigger fanout to remove
		var parseObject = request.object;
		var activity = parseToActivity(parseObject);
		user1 = client.feed('user:1');
		user1.removeActivity({foreignId: activity.foreign_id});
	});
}

/*
 * Sync the follow state to getstream.io
 */
Parse.Cloud.afterSave(followModel, function(request, response) {
	// trigger fanout & follow
	var parseObject = request.object;
	var activity = parseToActivity(parseObject);
	user1 = client.feed('user:1');
	user1.addActivity(activity);
	flat1 = client.feed('flat:' + parseObject.get('user'));
	flat1.follow('user:' + parseObject.get('target_user'));
});

Parse.Cloud.afterDelete(followModel, function(request) {
    // trigger fanout & unfollow
	var parseObject = request.object;
	var activity = parseToActivity(parseObject);
	user1 = client.feed('user:1');
	user1.removeActivity({foreignId: activity.foreign_id});
	flat1 = client.feed('flat:' + parseObject.get('user'));
	flat1.unfollow('user:' + parseObject.get('target_user'));
});


function parseToActivity(parseObject) {
	var activity = {};
	var activityProperties = ["actor", "verb", "object", "target", "tweet"];
	var arrayLength = activityProperties.length;
	for (var i = 0; i < arrayLength; i++) {
		var field = activityProperties[i];
		var value = parseObject.get(field);
		if (value) {
			activity[field] = value;
		}
	}
	activity.foreign_id = parseObject.cid + ':' + parseObject.id;
	return activity;
};

