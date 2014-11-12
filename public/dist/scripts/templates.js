Ember.TEMPLATES["_feed"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n		Yeaaa there are new activities\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "reload", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Show them</button>\n	");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n	\n		<ul>\n			");
  stack1 = helpers.each.call(depth0, "feed.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</ul>\n	");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers['app-activity'] || (depth0 && depth0['app-activity']),options={hash:{
    'activity': ("")
  },hashTypes:{'activity': "ID"},hashContexts:{'activity': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "app-activity", options))));
  data.buffer.push("\n			");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n		<div class=\"empty\">\n			Follow some people to get your feed started\n		</div>\n	");
  }

  data.buffer.push("<div class=\"newsfeed\">\n	");
  stack1 = helpers['if'].call(depth0, "feed.new", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	\n	");
  stack1 = helpers['if'].call(depth0, "feed.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = helpers.unless.call(depth0, "feed.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["_loading"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push(".......");
  
});
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
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n							");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false)
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN"},hashContexts:{'tagName': depth0,'href': depth0},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "profile", "username", options) : helperMissing.call(depth0, "link-to", "profile", "username", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n						");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("<a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("view.href")
  },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">Profile</a>");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n						<li>\n							Hi ");
  stack1 = helpers._triageMustache.call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(", having a good day?\n							<img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("userImageUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" width=\"64px\"/>\n						</li>\n						<li>\n							<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Logout</a>\n						</li>\n						");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n						<li>\n							<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Login with Github</a>\n						</li>\n						");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n					");
  stack1 = helpers['if'].call(depth0, "posted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("	\n				");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n						");
  stack1 = helpers['if'].call(depth0, "followed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n							Great, your ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" will show the content from the people you follow.\n							The best part, it works with 3 users and keeps on working with 3m users.\n							Check out the code &amp; tutorial on <a target=\"_blank\" href=\"https://github.com/tschellenbach/Stream-Example-Parse\">Github</a>!\n						");
  return buffer;
  }
function program15(depth0,data) {
  
  
  data.buffer.push("feed");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n							Nice one! Your own feed is still empty though. How about you follow some ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "people", options) : helperMissing.call(depth0, "link-to", "people", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("?\n						");
  return buffer;
  }
function program18(depth0,data) {
  
  
  data.buffer.push("people");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n						Hi ");
  stack1 = helpers._triageMustache.call(depth0, "displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(", welcome! Now give the example a try by posting your favourite surfing picture.\n					");
  return buffer;
  }

function program22(depth0,data) {
  
  
  data.buffer.push("\n					As we're demoing a social app, you'll need to login:\n				");
  }

function program24(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n				<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Login with Github</a>\n				");
  return buffer;
  }

  data.buffer.push("<div class=\"container\">\n	<div class=\"row clearfix\">\n		<div class=\"col-md-12 column\">\n			<nav class=\"navbar navbar-default\" role=\"navigation\">\n				<div class=\"navbar-header\">\n					<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n						<span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span>\n					</button>\n				</div>	\n				\n				<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n					<ul class=\"nav navbar-nav\">\n						");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false)
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN"},hashContexts:{'tagName': depth0,'href': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n						");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false)
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN"},hashContexts:{'tagName': depth0,'href': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "people", options) : helperMissing.call(depth0, "link-to", "people", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n						");
  stack1 = helpers['if'].call(depth0, "session.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					</ul>\n					<ul class=\"nav navbar-nav navbar-right\">\n						");
  stack1 = helpers['if'].call(depth0, "session.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					</ul>\n				</div>\n\n			</nav>\n			<div class=\"jumbotron\">\n				<h1>Parse cloud code, getstream.io &amp; EmberJS</h1>\n				<p>\n					This app shows you how to build scalable newsfeeds using GetStream.io &amp; parse cloud.\n					The code with explanation is on <a href=\"https://github.com/tschellenbach/Stream-Example-Parse\">Github</a>.\n				</p>\n				<p style=\"font-weight:bolder;\">\n				");
  stack1 = helpers['if'].call(depth0, "session.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(22, program22, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</p>\n				\n				");
  stack1 = helpers.unless.call(depth0, "session.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				\n			</div>\n			<div class=\"row clearfix\">\n				<div class=\"col-md-12 column\">\n					");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n\n\n\n\n\n\n\n");
  return buffer;
  
});
Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n							");
  stack1 = helpers._triageMustache.call(depth0, "errors.status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n							");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n							");
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n							<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Login with Github</a> to share your status\n							");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "loading", options) : helperMissing.call(depth0, "partial", "loading", options))));
  data.buffer.push("\n				");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n				");
  stack1 = helpers['with'].call(depth0, "model.flatFeed", "as", "feed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "feed", options) : helperMissing.call(depth0, "partial", "feed", options))));
  data.buffer.push("\n				");
  return buffer;
  }

function program12(depth0,data) {
  
  
  data.buffer.push("\n				Login!\n				");
  }

  data.buffer.push("<div class=\"container\">\n	<div class=\"row\">\n		<div class=\"col-md-4\">\n			<div class=\"logo-container centered\">\n				<img src=\"images/logo.png\" alt=\"\">\n			</div>\n			<div class=\"activity-container\">\n				<img src=\"images/profile-pic.png\" class=\"actor\">\n				<div id=\"update_status\">\n\n					<form>\n						<div class=\"form-group\">\n							");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("status"),
    'cols': ("40"),
    'rows': ("3"),
    'placeholder': ("What are you looking at?"),
    'class': ("form-control")
  },hashTypes:{'value': "ID",'cols': "STRING",'rows': "STRING",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'cols': depth0,'rows': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n						</div>\n						<div class=\"form-group\">\n							<div class=\"col-sm-12\">\n								<span id=\"selected-image\"></span>\n							</div>\n							<div class=\"col-sm-6\">\n								");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "customFileInput", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n							</div>\n							<div class=\"col-sm-6\">\n								<button class=\"btn btn-primary table-cell\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n									Share\n								</button>\n							</div>\n\n							");
  stack1 = helpers['if'].call(depth0, "errors.status", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n							");
  stack1 = helpers['if'].call(depth0, "session.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n						</div>\n\n					</form>\n				</div>\n			</div>\n		</div>\n		<div class=\"col-md-4 tight\">\n			<div class=\"panel feed\">\n				<h1 class=\"centered upper\">People you follow</h1>\n				");
  stack1 = helpers['if'].call(depth0, "loading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  stack1 = helpers['if'].call(depth0, "model.flatFeed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n		</div>\n		<div class=\"col-md-4 tight\">\n			<div class=\"panel feed\">\n				<h1 class=\"centered upper\">Everyone</h1>\n				");
  stack1 = helpers['if'].call(depth0, "loading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				");
  stack1 = helpers['with'].call(depth0, "model.globalFeed", "as", "feed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</div>\n		</div>\n	</div>\n</div><!-- /.container -->");
  return buffer;
  
});
Ember.TEMPLATES["people"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n<div>\n	<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Login with Github to follow people</a>\n</div>\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n	");
  data.buffer.push(escapeExpression((helper = helpers['app-user'] || (depth0 && depth0['app-user']),options={hash:{
    'user': (""),
    'session': ("session")
  },hashTypes:{'user': "ID",'session': "ID"},hashContexts:{'user': depth0,'session': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "app-user", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("<h2>Follow some people</h2>\n\n");
  stack1 = helpers.unless.call(depth0, "session.isAuthenticated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers.each.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n	");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "feed", options) : helperMissing.call(depth0, "partial", "feed", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("\n\n<h2>Your Profile</h2>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "user", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  stack1 = helpers._triageMustache.call(depth0, "user.attributes.username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers['with'].call(depth0, "model", "as", "feed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});
Ember.TEMPLATES["components/app-activity"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <div class=\"activity-content\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "activity.object_parse.attributes.tweet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n  ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n  	<img class=\"activity-image\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("imageUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n	");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		<div class=\"activity-content\">\n			");
  stack1 = helpers._triageMustache.call(depth0, "username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" likes a ");
  stack1 = helpers._triageMustache.call(depth0, "likedActivity.className", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" activity\n		</div>\n	");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		<div class=\"activity-content\">\n			");
  stack1 = helpers._triageMustache.call(depth0, "activity.actor_parse.attributes.username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" followed\n			");
  stack1 = helpers._triageMustache.call(depth0, "activity.object_parse.attributes.username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			<img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("followImageUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" width=\"150px\"/>\n		</div>\n	");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n			");
  stack1 = helpers['if'].call(depth0, "activity.liked", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			");
  stack1 = helpers['if'].call(depth0, "loading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n				<a class=\"pull-right upper\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "unlike", "activity", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n					Unlike\n				</a>\n			");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n				<a class=\"pull-right upper\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "like", "activity", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n					Like\n				</a>\n			");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n				");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "loading", options) : helperMissing.call(depth0, "partial", "loading", options))));
  data.buffer.push("\n			");
  return buffer;
  }

  data.buffer.push("<li class=\"activity-container\">\n  <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("userImageUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"actor\">\n  <div class=\"activity-time\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "ago", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" <span class=\"icon-clock\"></span>\n  </div>              \n  <div class=\"activity-text\">\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "profile", "username", options) : helperMissing.call(depth0, "link-to", "profile", "username", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = helpers._triageMustache.call(depth0, "activity.verb", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n  ");
  stack1 = helpers['if'].call(depth0, "activity.object_parse.attributes.tweet", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  stack1 = helpers['if'].call(depth0, "isUpload", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  stack1 = helpers['if'].call(depth0, "isLike", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	\n	");
  stack1 = helpers['if'].call(depth0, "isFollow", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("  \n  <div class=\"activity-actions\">\n	");
  stack1 = helpers.unless.call(depth0, "isLike", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    <span class=\"icon-thumbs-up\"></span> x 10\n  </div>\n</li> \n\n");
  return buffer;
  
});
Ember.TEMPLATES["components/app-user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "user.attributes.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n		");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "loading", options) : helperMissing.call(depth0, "partial", "loading", options))));
  data.buffer.push("\n	");
  return buffer;
  }

  data.buffer.push("<li>\n	");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "profile", "user.attributes.username", options) : helperMissing.call(depth0, "link-to", "profile", "user.attributes.username", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	<img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("user.attributes.image._url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" width=\"64px\"/>\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "follow", "user", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n		Follow\n	</button>\n	");
  stack1 = helpers['if'].call(depth0, "loading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</li>");
  return buffer;
  
});
Ember.TEMPLATES["views/custom_file_input"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<span class=\"btn btn-default btn-file\"> <span class=\"icon-image\"></span> Add image\n	<input type=\"file\">\n</span>");
  
});