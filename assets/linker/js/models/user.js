ConsortiumNodeFramework.User = DS.Model.extend({
    fname: DS.attr(),
    lname: DS.attr(),
    DOB: DS.attr(),
    pNumber: DS.attr(),
    email: DS.attr(),
    multiplier: DS.attr(),
    accessLevel: DS.attr(),
    password: DS.attr(),
});
