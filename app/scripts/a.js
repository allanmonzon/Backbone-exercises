(function(){
  'use strict';


  window.App = {};
  App.Views = {};
  App.Models = {};
  App.Collections = {};
  App.Routers = {};



// Model

  App.Models.BlogModel = Backbone.Model.extend({

  	defaults: {
  		title: '',

  		body: '',
  	},

    idAttribute: '_id'

  });



// Collection

  App.Collections.BlogCollection = Backbone.Collection.extend({

    model: App.Models.BlogModel,

    url: 'http://tiny-pizza-server.herokuapp.com/collections/posts'

  });



// View

  App.Views.BlogView = Backbone.View.extend({

    template: function(){
      return _.template(this.$template.text());
    },

    initialize: function(options) {
      options = options || {};
      this.$container = $('.container');
      this.$template = options.$template;
      this.$container.append(this.el);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model));
    },

    events: {
      'submit' : 'blogPost'
    },

    blogPost: function(e) {
      e.preventDefault();
      var blogData = {
        title: $('.title').val(),
        body: $('.body').val()
      };
      this.collection.create(blogData);
    }

  });


  $(document).ready(function(){
    var blogView = new App.Views.BlogView({
      collection: new App.Collections.BlogCollection(),
      $template: $('#blog-template')
    });
  });

})();








