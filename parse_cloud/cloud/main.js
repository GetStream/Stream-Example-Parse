var stream = require('cloud/getstream.js');
var github = require('cloud/github.js');
var utils = require('cloud/utils.js');
var _ = require('underscore');

var streamApiKey = 'hdhuew2dzq5k';
var streamApiSecret = 'enqn9tj4ktmpm777kwwtzwm7zk7qnsgm485p6ekt8twjv5ms7t98yvazs3szakqc';
var streamSite = '738';
var activityModels = ['Tweet', 'Picture', 'Like'];
var followModel = 'Follow';

client = stream.connect(streamApiKey, streamApiSecret, streamSite);

/*
 * Listen to the activityModels afterSave and afterDelete
 * and send the activities to getstream.io
 */
for (var i = 0; i < activityModels.length; i++) {
	var model = activityModels[i];
	Parse.Cloud.afterSave(model, function(request, response) {
		// trigger fanout
		var parseObject = request.object;
		var activity = utils.parseToActivity(parseObject);
		user1 = client.feed('user:1');
		user1.addActivity(activity);
	});

	Parse.Cloud.afterDelete(model, function(request) {
		// trigger fanout to remove
		var parseObject = request.object;
		var activity = utils.parseToActivity(parseObject);
		user1 = client.feed('user:1');
		user1.removeActivity({
			foreignId : activity.foreign_id
		});
	});
}

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
		response.success({
			activities : enrich(activities.results),
			feed : feedIdentifier,
			token : feed.token
		});
	});
});

function enrich(activities) {
	/*
	 * TODO:
	 *
	 * Figure out the format for promise.when
	 * Turn that into a dictionary
	 * And set it on the data
	 *
	 */
	var lookup = {};
	for (var i = 0; i < activities.length; i++) {
		var activity = activities[0];
		for (var field in activity) {
			if (activity.hasOwnProperty(field)) {
				var value = activity[field];
				if (value.indexOf('ref') == 0) {
					var parts = value.split(':');
					if (!(parts[1] in lookup)) {
						lookup[parts[1]] = [];
					}
					lookup[parts[1]].push(parts[2]);
				}
			}
		}
	}

	console.log(lookup);

	var promises = [];
	for (var field in lookup) {
		if (lookup.hasOwnProperty(field)) {
			var query = new Parse.Query(Parse.User);
			query.containedIn("id", lookup[field]);
			var promise = query.find();
			promises.push(promise);
		}
	}
	var all = Parse.Promise.when(promises);
	var resultHash = {};
	console.log('pre the then');
	var promise = all.then(function(result_sets) {
		_.each(result_sets, function(result_set) {
			resultHash['c1'] = {};
			_.each(result_set, function(result) {
				resultsHash['c1'][result.id] = result;				
			});
		});

		// now we set the data
		for (var i = 0; i < activities.length; i++) {
			var activity = activities[0];
			for (var field in activity) {
				if (activity.hasOwnProperty(field)) {
					var value = activity[field];
					if (value.indexOf('ref') == 0) {
						var parts = value.split(':');
						activity[field + '_object'] = resultHash[parts[1]][parts[2]];
					}
				}
			}
		}
		return activities;
	}, function() {
		console.log('neeee');
	});

	return promise;
}

