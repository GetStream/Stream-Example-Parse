App.AppActivityComponent = Ember.Component.extend({
	imageUrl : function() {
		var parseObject = this.get('activity').object_parse;
		if (parseObject) {
			var image = parseObject.get('image');
			return image.url();
		}
	}.property('activity')
});
