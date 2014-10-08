

(function(){
  'use strict';

  window.App = {};
  App.Views = {};
  App.Collections = {};
  App.Models = {};
  App.Routers = {};



// Model

  App.Models.BlogPost = Backbone.Model.extend({

    idAttribute: '_id'

  });



// Collection

  App.Collections.BlogPosts = Backbone.Collection.extend({

    model: App.Models.BlogPost,

    url: 'http://tiny-pizza-server.herokuapp.com/collections/posts',

    initialize: function() {
      this.fetch();
    }

  });



// Views

  App.Views.PostList = Backbone.View.extend({
    tagName: 'ul',

    template: _.template($('#post-title-template').text()),

    initialize: function(options){
      options = options || {};
      this.$container = $('.left-container');
      this.$container.append(this.el);
      this.render();
      this.listenTo(this.collection, 'add', this.renderChild);
    },

    events: {
      'click': 'cool'
    },

    render: function() {
      _.each(this.collection.models, this.renderChild);
    },

    renderChild: function(child) {
      this.$el.append(this.template(child.attributes));
    },

  });



// Router

  App.Routers.BlogRouter = Backbone.Router.extend({

    initialize: function() {
      this.blogPosts = new App.Collections.BlogPosts();
      new App.Views.PostList({
        collection: this.blogPosts
      });
    },

  });



  $(document).ready(function(){
    var blogRouter = new App.Routers.BlogRouter();
    Backbone.history.start();
  });

})();
