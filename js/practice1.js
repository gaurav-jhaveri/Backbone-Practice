var Person = Backbone.Model.extend({
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

var PeopleCollection = Backbone.Collection.extend({
  model: Person
});

var PeopleView = Backbone.View.extend({
  tagName: 'ul',
  
  render: function(){
    this.collection.each(function(person) {
      var personView = new PersonView({model: person});
      this.$el.append(personView.render().el); 
    }, this);
    return this;
  }
});

var PersonView = Backbone.View.extend({
  tagName: 'li',
  
  template: _.template( $('#personTemplate').html()),
  
  
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var peopleCollection = new PeopleCollection([
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

var peopleView = new PeopleView({collection: peopleCollection});
$(document.body).append(peopleView.render().el);