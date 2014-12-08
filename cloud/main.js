var stream = require('cloud/getstream.js');
var github = require('cloud/github.js');
var utils = require('cloud/utils.js');
var settings = require('cloud/settings.js');
var _ = require('underscore');


// initialize the getstream.io client
var client = stream.connect(settings.streamApiKey, settings.streamApiSecret, settings.streamApp);

/*
 * Listen to the activityModels afterSave and afterDelete
 * and send the activities to getstream.io
 */
_.each(settings.activityModels, function(model) {
	Parse.Cloud.afterSave(model, function(request) {
		// trigger fanout
		var activity = utils.parseToActivity(request.object);
		var feed = client.feed(activity.feed_slug, activity.feed_user_id);
		feed.addActivity(activity, utils.createHandler());
	});

	Parse.Cloud.afterDelete(model, function(request) {
		// trigger fanout to remove
		var activity = utils.parseToActivity(request.object);
		var feed = client.feed(activity.feed_slug, activity.feed_user_id);
		// remove by foreign id
		feed.removeActivity({
			foreignId : activity.foreign_id
		}, utils.createHandler());
	});
});

/*
 * Sync the follow state to getstream.io
 */
Parse.Cloud.afterSave(settings.followModel, function(request) {
	// trigger fanout & follow
	var parseObject = request.object;
	var activity = utils.parseToActivity(parseObject);
	var feed = client.feed(activity.feed_slug, activity.feed_user_id);
	feed.addActivity(activity, utils.createHandler());
	// flat feed of user will follow user feed of target
	var flat = client.feed('flat', parseObject.get('actor').id);
	flat.follow('user', parseObject.get('object').id, utils.createHandler());
});

Parse.Cloud.afterDelete(settings.followModel, function(request) {
	// trigger fanout & unfollow
	var parseObject = request.object;
	var activity = utils.parseToActivity(parseObject);
	var feed = client.feed(activity.feed_slug, activity.feed_user_id);
	feed.removeActivity({
		foreignId : activity.foreign_id
	}, utils.createHandler());
	// flat feed of user will follow user feed of target
	var flat = client.feed('flat', parseObject.get('actor').id);
	flat.unfollow('user', parseObject.get('object').id, utils.createHandler());
});

/*
 * View to retrieve the feed, expects feed in the format user:1
 * Accepts params
 *
 * feed: the feed id in the format user:1
 * limit: how many activities to get
 * id_lte: filter by activity id less than or equal to (for pagination)
 *
 */
Parse.Cloud.define("feed", function(request, response) {
	var feedIdentifier = request.params.feed;
	var feedParts = feedIdentifier.split(':');
	var feedSlug = feedParts[0];
	var userId = feedParts[1];
	var id_lte = request.params.id_lte || undefined;
	var limit = request.params.limit || 50;
	var params = {
		limit : limit
	};
	if (id_lte) {
		params.id_lte = limit;
	}
	// initialize the feed class
	var feed = client.feed(feedSlug, userId);
	feed.get(params, function(httpResponse) {
		var activities = httpResponse.data;
		// enrich the response with the database values where needed
		var promise = utils.enrich(activities.results);
		promise.then(function(activities) {
			response.success({
				activities : activities,
				feed : feedIdentifier,
				token : feed.token
			});
		});
	}, utils.createHandler(response));
});

/*
 * Bit of extra logic for likes
 */

Parse.Cloud.afterSave("Like", function(request) {
	// trigger fanout
	var activity = utils.parseToActivity(request.object);
	var feed = client.feed(activity.feed_slug, activity.feed_user_id);
	feed.addActivity(activity, utils.createHandler());
	// get the related object
	var like = request.object;
	var activityType = like.get('activity_type');
	var pointer = like.get('activity_' + activityType);
	var query = new Parse.Query(pointer.className);
	query.get(pointer.id, function(activity){
		// increment the likes
		activity.increment('likes');
		activity.save();
	});
});

Parse.Cloud.afterDelete("Like", function(request) {
	// trigger fanout to remove
	var activity = utils.parseToActivity(request.object);
	var feed = client.feed(activity.feed_slug, activity.feed_user_id);
	// remove by foreign id
	feed.removeActivity({
		foreignId : activity.foreign_id
	}, utils.createHandler());
	// get the related object
	var like = request.object;
	var activityType = like.get('activity_type');
	var pointer = like.get('activity_' + activityType);
	var query = new Parse.Query(pointer.className);
	query.get(pointer.id, function(activity){
		// decrement the likes
		activity.increment('likes', -1);
		activity.save();
	});
});


