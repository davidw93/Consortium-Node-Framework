window.ConsortiumNodeFramework = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true
});

ConsortiumNodeFramework.Sails = Ember.Object.extend({
    channel: null,

    init: function() {
        var self = this, io = window.io || {};

        if(typeof io.connect === 'function') {
            this.socket = io.connect();
            this.socket.on('message', function(message) {
                console.log("handling message");
                console.log(message);
                self.handleMessage(message);
            });
        }
    },

    subscribe: function(channel) {
        this.channel = channel;
        console.log(this.channel);
        if(this.socket) {
            this.socket.request('/api/v1/' + channel);
        }
    },

    unsubscribe: function(channel) {
        this.channel = null;
    },

    handleMessage: function(message) {
        if(message.model !== this.channel) return;
        var router = this.get('container').lookup('router:main');
        try {
            router.send(message.verb, message);
        } catch(e) {
            throw e;
        }
    }
});

Ember.Application.initializer({
    name: "sails",
    initialize: function(container, application) {
        container.optionsForType('sails', {singleton: true });
        container.register('sails:main', ConsortiumNodeFramework.Sails);
        container.typeInjection('route', 'sails', 'sails:main');
    }
});


ConsortiumNodeFramework.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api/v1',
    pathForType: function(type) {
        return type;
    }
});

