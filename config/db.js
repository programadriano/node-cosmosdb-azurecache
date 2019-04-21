var mongoose = require('mongoose');

mongoose.connect("mongodb://{seu host}:{sua porta}/?ssl=true&replicaSet=globaldb", {
    auth: {
      user: "{seu user}",
      password: "{seu password}"
    }
  })

PersonSchema = require('../models/person');

var Person = mongoose.model('Person', PersonSchema);
module.exports = Person;