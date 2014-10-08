(function(){
  'use strict';


  window.App = {};
  App.Views = {};
  App.Models = {};
  App.Collections = {};
  App.Routers = {};



  // Model

  App.Models.TodoModel = Backbone.Model.extend({

    defaults: {
      title: ""
    }

  });



  // Collection

  App.Collections.TodoCollection = Backbone.Collection.extend({

    model: App.Models.TodoModel,

    url: "http://tiny-pizza-server.herokuapp.com/collections/todosa"

  });



  // Views

  App.Views.CreateTodo = Backbone.View.extend({

    template: _.template($('#create-todo-template').text()),

    attributes: {
      type: "text"
    },

    events: {
      'keyup': 'addTodos'
    },

    addTodos: function(event){
      if(event.keyCode === 13){
        var title = this.$('.title').val();
         this.$('input').val('');
        this.collection.create({title: title});
      }
    },

    render: function(){
      this.$el.html(this.template());
      $('.todos').append(this.el);
    }

  });




  App.Views.TodoList = Backbone.View.extend({

    tagName: 'ul',

    initialize: function(options){
      options = options || {};
      this.$container = options.$container;
      this.$container.append(this.el);
      this.listenTo(this.collection, 'add', this.renderChild);
    },

    renderChild: function(todo){
      var todoItem = new App.Views.TodoItem({ model: todo });
      todoItem.render();
      this.$el.append(todoItem.el);
    }

  });




  App.Views.TodoItem = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#todo-item-template').text()),

    initialize: function(){
      this.listenTo(this.model, 'destroy', this.remove);
    },

    events: {
      'click button': 'destroyTodo'
    },

    destroyTodo: function(){
      this.model.destroy();
    },

    render: function(){
      this.$el.html(this.template(this.model.attributes));
    }

  });



  $(document).ready(function(){
    var todoCollection = new App.Collections.TodoCollection();

    var createTodo = new App.Views.CreateTodo({collection: todoCollection});
    createTodo.render();

    var todoList = new App.Views.TodoList({
      $container: $('.todos'),
      collection: todoCollection
    });
  });

})();