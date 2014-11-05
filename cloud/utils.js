var _ = require('underscore');

function serializeId(parseObject) {
	/*
	 * Returns ref:className:id
	 */
	return 'ref:' + parseObject.className + ':' + parseObject.id;
};
exports.serializeId = serializeId;

function normalizeModelClass(className) {
	/*
	 * Take a string value of a className and return something we can use in
	 * A query
	 */
	var modelClass = className;
	var map = {'_User': Parse.User};
	if (className in map) {
		modelClass = map[className];
	}
	return modelClass;
};
exports.normalizeModelClass = normalizeModelClass;

exports.parseToActivity = function parseToActivity(parseObject) {
	/*
	 * Take the parse activity and converts it into the required
	 * activity information for getstream.io
	 * The names are based on:
	 * http://activitystrea.ms/specs/json/1.0/
	 * Also see
	 * http://getstream.io/docs
	 */
	var activity = {};
	var activityProperties = ["actor", "verb", "object", "target", "to", "time"];
	var arrayLength = activityProperties.length;
	for (var i = 0; i < arrayLength; i++) {
		var field = activityProperties[i];
		var value = parseObject.get(field);
		if (value) {
			activity[field] = value;
		}
	}
	activity.actor = serializeId(parseObject.get('actor'));
	// default to the activity if object is not specified
	activity.object = serializeId(parseObject.get('object') || parseObject);
	activity.foreign_id = serializeId(parseObject);
	activity.feed_id = parseObject.get('feedId');
	return activity;
};

function enrich(activities) {
	/*
	 * Takes the given activities from getstream.io and looks up the needed
	 * references from the parse database
	 */
	// Find all the references and add them to the lookup object
	var lookup = {};
	_.each(activities, function(activity) {
		_.each(activity, function(value, field) {
			if (value && value.indexOf('ref') === 0) {
				var parts = value.split(':');
				if (!(parts[1] in lookup)) {
					lookup[parts[1]] = [];
				}
				lookup[parts[1]].push(parts[2]);
			}
		});
	});

	// Query all the needed data in parallel and wait for results
	var promises = [];
	_.each(lookup, function(ids, className) {
		var query = new Parse.Query(normalizeModelClass(className));
		query.containedIn("objectId", ids);
		var promise = query.find();
		promises.push(promise);
	});
	var all = Parse.Promise.when(promises);
	
	// Transform the queries into dictionaries
	// And add the data to the response
	var promise = all.then(function() {
		var resultSets = _.toArray(arguments);
		var resultHash = {};
		_.each(resultSets, function(results) {
			if (results.length) {
				resultHash[results[0].className] = {};
				_.each(results, function(result) {
					resultHash[result.className][result.id] = result;
				});
			}
		});

		// now we set the data
		_.each(activities, function(activity) {
			_.each(activity, function(value, field) {
				if (value && value.indexOf('ref') === 0) {
					var parts = value.split(':');
					var parseModels = resultHash[parts[1]];
					activity[field + '_parse'] = parseModels && parseModels[parts[2]];
				}
			});
		});
		return activities;
	}, function() {
		console.log('failed to query the data needed for enrichment');
	});

	return promise;
}

exports.enrich = enrich;

function createHandler(response) {
	/*
	 * Default error handling behaviour for async requests
	 */
	function errorHandler(result) {
		if (result.data.exception) {
			var msg = 'GetStream.io ' + result.data.exception + ':' + result.data.detail;
			console.error(msg);
			response.error(msg);	
		}
	}
	return errorHandler;
}

exports.createHandler = createHandler;
