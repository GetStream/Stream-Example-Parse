var _ = require('underscore');


function serializeId(parseObject) {
	return 'ref:' + parseObject.cid + ':' + parseObject.id;
};
exports.serializeId = serializeId;


exports.parseToActivity = function parseToActivity(parseObject) {
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
    activity.foreign_id = serializeId(parseObject);
    return activity;
};


function enrich(activities) {
	/*
	 * TODO:
	 *
	 * Figure out how to handle the CID -> Follow/User etc conversion
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
			if (result_set.length) {
				resultHash[result_set[0].cid] = {};
				_.each(result_set, function(result) {
					resultsHash[result.cid][result.id] = result;				
				});
			}
		});

		// now we set the data
		for (var i = 0; i < activities.length; i++) {
			var activity = activities[0];
			for (var field in activity) {
				if (activity.hasOwnProperty(field)) {
					var value = activity[field];
					if (value && value.indexOf('ref') == 0) {
						var parts = value.split(':');
						// TODO: fix this part of the lookup
						activity[field + '_object'] = resultHash[parts[1]] && resultHash[parts[1]][parts[2]];
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

exports.enrich = enrich;