(function(){
  'use strict';


  window.App = {};
  App.Views = {};
  App.Models = {};
  App.Collections = {};
  App.Routers = {};



// Model

  App.Models.UserModel = Backbone.Model.extend({

    validate: function(attributes){

      if(! attributes.firstName) {
        return "First name required"
      }

      if(! attributes.lastName) {
        return "Last name required"
      }

      if(! attributes.address) {
        return "Address required"
      }

      if(attributes.phone.length < 10) {
        return "Phone number required"
      }
    },   

    idAttribute: '_id'

  });



// Collection

  App.Collections.UserCollection = Backbone.Collection.extend({

    model: App.Models.UserModel,

    url: 'http://tiny-pizza-server.herokuapp.com/collections/people'

  });



// View

  App.Views.UserView = Backbone.View.extend({

    template: function(){
      return _.template(this.$template.text());
    },

    initialize: function(options) {
      options = options || {};
      this.$container = $('.container');
      this.$template = options.$template;
      this.$container.append(this.el);
      this.render();
      this.listenTo(this.collection, 'invalid', this.invalidUser)
    },

    render: function() {
      this.$el.html(this.template(this.model));
    },

    events: {
      'submit form' : 'postUser'
    },

    postUser: function(e) {
      e.preventDefault();
      var userData = {
        firstName: $('.first-name').val(),
        lastName: $('.last-name').val(),
        address: $('.address').val(), 
        phone: $('.phone').val()
      };
      this.collection.create(userData);
    },

    invalidUser: function(model, error){
      this.$el.addClass('invalid');
      alert(error);
    }

  });


  $(document).ready(function(){
    var userView = new App.Views.UserView({
      collection: new App.Collections.UserCollection(),
      $template: $('#form-template')
    });  
  });

})();
