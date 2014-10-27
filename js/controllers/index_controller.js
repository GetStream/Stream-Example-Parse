App.IndexController = Ember.Controller.extend({
	status : '',

	actions : {
		status : function() {
			var msg = this.get('status');
			if (msg) {
				tweet = new Tweet();
				tweet.save({
					actor : 1,
					verb : 'tweet',
					object : 1,
					target : 1,
					tweet : msg
				}, {
					success : function(object) {
						console.log('saved');
					},
					error : function(model, error) {
						console.log('error');
					}
				});
			} else {
				// file upload
				var fileUploadControl = $("#profilePhotoFileUpload")[0];
				if (fileUploadControl.files.length > 0) {
					var file = fileUploadControl.files[0];
					var name = "photo.jpg";

					var parseFile = new Parse.File(name, file);
					parseFile.save().then(function() {
						// The file has been saved to Parse.
					}, function(error) {
						// The file either could not be read, or could not be saved to Parse.
					});
					var picture = new Picture();
					picture.save({
						actor : 1,
						verb : 'watch',
						youtube_id : 'z_AbfPXTKms',
						object : 1,
						target : 1,
						image : parseFile
					}).then(function() {
						console.log('saved succeed', arguments);
					}, function() {
						console.log('save failed', arguments);
					});
				}
			}
		}
	}
});
