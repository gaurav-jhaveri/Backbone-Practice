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

var PersonView = Backbone.View.extend({
  tagName: 'li',
  
  template: _.template( $('#personTemplate').html()),
  
  initialize: function(){
    this.render();
  },
  
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});