//=========== Settingan
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.PORT || 5000;


//========== setting database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apiusers', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var User = require('./models/user');

//====== konfigurasi body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//====== middleware 
router.use(function (req, res, next) {
    console.log('MiddleWare Berjalan pada: ', Date.now());
    next();
})

// Tes Router
router.get('/', function (req, res) {
    res.json({
        message: "anda di home!"
    });
});

router.route('/users').post(function (req, res) {
        var user = new User();
        user.name = req.body.name;
        user.password = req.body.password;

        user.save(function (err) {
            if (err) res.send(err)

            res.json({
                message: "user berhasil ditambahkan"
            });
        });

    })
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(err)
            res.json(users)
        })
    })

router.route('/users/:name')
    .get(function (req, res) {
        User.find({
                name: req.params.name
            },
            function (err, user) {
                if (err) res.send(err)
                res.json(user)
            });
    }).put(function (req, res) {
        User.update({
                name: req.params.name
            }, {
                name: req.body.name
            },
            function (err, user) {
                if (err) res.send(err)
                res.json("user berhasil diupdate")
            });
    }).delete(function (req, res) {
        User.remove({
                name: req.params.name
            },
            function (err) {
                if (err) res.send(err)
                res.json("data berhasil dihapus")
            })

    })



// Prefix Api
app.use('/api', router);

app.listen(port);
console.log(' port run on.. ' + port);