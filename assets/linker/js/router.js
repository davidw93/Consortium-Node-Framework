ConsortiumNodeFramework.Router.map(function() {
    this.resource('exampleRoute', {path: '/exampleRoute' });
});

ConsortiumNodeFramework.ExampleRoute = Ember.Route.extend({
    activate: function() {
        //this.get('sails').subscribe('example');
    },
    model: function() {
        //return this.store.find('example');
    },
    deactivate: function() {
        //this.get('sails').unsubscribe('example');
    },
    actions: {
        update: function(message) {
            var data = message.data;
            this.store.push(message.model, data);
        }
    },
    renderTemplate: function(controller) {
        this.render('exampleRoute/index', {controller: controller});
    }
});
