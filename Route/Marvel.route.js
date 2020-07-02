var express = require('express')
var router = express.Router()
const controller = require('../controllers/marvelController');
const { collection } = require('../Models/Marvel');
//Test server
router.get('/', function(req, res) {
    res.send('Hello World')
});
//Add marvel
router.get('/addMarvel', function(req, res) {
    res.render('marvelAdd')
});
router.post('/addMarvel', controller.insertNewMarvel)
    //Get All Marvel
router.get('/listMarvel', controller.getAllMarvel);
// Edit Marvel
router.get('/edit/:idCharacter', controller.getInfoCharacter)
router.post('/edit', controller.editCharacter)
    // delete Character
router.get('/delete/:idCharacter', controller.deleteSelectedMarvel)
module.exports = router