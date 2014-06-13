ConsortiumNodeFramework.Router.map(function() {
    this.resource('user', {path: '/testing' });
});

ConsortiumNodeFramework.UserRoute = Ember.Route.extend({
    activate: function() {
        this.get('sails').subscribe('user');
    },
    model: function() {
        return this.store.find('user');
    },
    deactivate: function() {
        this.get('sails').unsubscribe('user');
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
