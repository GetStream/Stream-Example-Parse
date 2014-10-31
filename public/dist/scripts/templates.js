Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("view.href")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Feed</a>");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("view.href")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">People</a>");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("view.href")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Profile</a>");
  return buffer;
  }

  data.buffer.push("\n<div id=\"main\">\n	\n<ol class=\"navigation\">\n");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false)
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN"},hashContexts:{'tagName': depth0,'href': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false)
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN"},hashContexts:{'tagName': depth0,'href': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "people", options) : helperMissing.call(depth0, "link-to", "people", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false)
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN"},hashContexts:{'tagName': depth0,'href': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["STRING","STRING"],data:data},helper ? helper.call(depth0, "profile", "admin", options) : helperMissing.call(depth0, "link-to", "profile", "admin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ol>\n\n<h2>Hello, Welcome to Ember.js</h2>\n\n<ul>\n	<li>\n		<a href=\"https://www.parse.com/docs/js_guide\">Parse JavaScript Guide</a>\n	</li>\n	<li>\n		<a href=\"https://getstream.io/get_started/#intro\">GetStream.io Tutorial</a>\n	</li>\n	<li>\n		<a href=\"http://emberjs.com/\">EmberJS</a>\n	</li>\n</ul>\n\n\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n	Yeaaa there are new activities\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "reload", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Show them</button>\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n	<li>\n		");
  data.buffer.push(escapeExpression((helper = helpers['app-activity'] || (depth0 && depth0['app-activity']),options={hash:{
    'activity': ("")
  },hashTypes:{'activity': "ID"},hashContexts:{'activity': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "app-activity", options))));
  data.buffer.push("\n	</li>\n	");
  return buffer;
  }

  data.buffer.push("\n<h2>Your feed</h2>\n\n<div id=\"update_status\">\n	<form>\n		<div>\n			Update your status\n		</div>\n		<div>\n			");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("status"),
    'cols': ("40"),
    'rows': ("3"),
    'placeholder': ("What's on your mind?")
  },hashTypes:{'value': "ID",'cols': "STRING",'rows': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'cols': depth0,'rows': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n		</div>\n		<div>\n			Or upload an image\n			<input type=\"file\" id=\"profilePhotoFileUpload\">\n		</div>\n		\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Update Status</button>\n	</form>\n</div>\n<div id=\"newsfeed\">\n	");
  stack1 = helpers['if'].call(depth0, "newActivities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	\n	");
  stack1 = helpers.each.call(depth0, "model.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES["people"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n<li>\n	");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = helpers._triageMustache.call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "follow", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n		Follow\n	</button>\n</li>\n");
  return buffer;
  }

  data.buffer.push("<h2>Follow some people</h2>\n\n");
  stack1 = helpers.each.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("\n\n<h2>Your Profile</h2>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["components/app-activity"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  stack1 = helpers._triageMustache.call(depth0, "activity.verb", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = helpers._triageMustache.call(depth0, "activity.actor_parse", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("imageUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" width=\"200px\"/>\n\n<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "like", "activity", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n	Like\n</button>");
  return buffer;
  
});