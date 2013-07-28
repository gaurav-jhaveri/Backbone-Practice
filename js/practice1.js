(function () {

  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.template = function(id) {
  	return _.template( $('#' + id).html() );
  };

  App.Models.Person = Backbone.Model.extend({
    defaults: {
      name: "Guest User",
      age: 21,
      occupation: "Student"
    },
  
    validate: function(attributes) {
      if (attributes.age < 0) {
        return 'Age must be positive.';
      }
    
      if (!attributes.name) {
        return 'Every person must have a name.';
      }
    },
  
    work: function() {
      return this.get('name') + 'is working.';
    }
  });

  App.Collections.People = Backbone.Collection.extend({
    model: App.Models.Person
  });

  App.Views.People = Backbone.View.extend({
    tagName: 'ul',
  
    render: function(){
      this.collection.each(function(person) {
        var personView = new App.Views.Person({model: person});
        this.$el.append(personView.render().el);
      }, this);
      return this;
    }
  });

  App.Views.Person = Backbone.View.extend({
    tagName: 'li',
  
    template: template('personTemplate'),
  
  
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var peopleCollection = new App.Collections.People([
      {
          name: 'Gaurav Jhaveri',
          age: 20,
          occupation: "Programmer"
      },
      {
          name: 'Bruce Wayne',
          age: 74,
          occupation: 'Vigilante'
      },
      {
          name: 'Superman',
          age: 75,
          occupation: 'Superhero'
      }
  ]);

  var peopleView = new App.Views.People({collection: peopleCollection});
  $(document.body).append(peopleView.render().el);

})();