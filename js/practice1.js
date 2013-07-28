var Person = Backbone.Model.extend({
  defaults: {
    name: "Guest User",
    age: 21,
    occupation: "Student"
  },
  work: function() {
    return this.get('name') + 'is working.';
  }
});