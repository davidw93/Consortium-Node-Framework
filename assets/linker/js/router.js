ConsortiumNodeFramework.Router.map(function() {
    this.resource('user', {path: '/' });
});

ConsortiumNodeFramework.UserRoute = Ember.Route.extend({
    activate: function() {
        this.get('sails').subscribe('User/all');
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
