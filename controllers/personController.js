
var redis = require("redis");

var client = redis.createClient(6380, "{seu hostname}",
    { auth_pass: "{sua key}", tls: { servername: "{seu hostname}" } });

const PersonService = require('../services/personService');

exports.get = (req, res, next) => {

    client.get('allpersons', function (err, reply) {
        if (reply) {
            console.log('redis');
            res.send(reply)
        } else {
            console.log('db');
            PersonService.getAll()
                .then((person) => {
                    client.set('allpersons', JSON.stringify(person));
                    client.expire('allpersons', 300);
                    res.status(200).send(person);
                }).catch(err => res.status(500).send(err))
        }
    });
};


exports.getById = (req, res, next) => {
    const _id = req.params.id;

    PersonService.getById(_id)
        .then((person) => {
            res.status(200).send(person);
        }).catch(err => res.status(500).send(err))
};

exports.post = (req, res, next) => {
    const vm = req.body;

    PersonService.create(vm)
        .then(() => {
            res.status(200).send(`Pessoa criada com sucesso!`);
        }).catch(err => res.status(500).send(err))
};


exports.put = (req, res, next) => {
    let id = req.params.id;
    const vm = req.body;

    PersonService.update(id, vm)
        .then(() => {
            res.status(200).send(`Pessoa atualizada com sucesso!`);
        }).catch(err => res.status(500).send(err))

};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    PersonService.delete(id)
        .then(() => {
            res.status(200).send(`Pessoa deletada com sucesso!`);
        }).catch(err => res.status(500).send(err))
};