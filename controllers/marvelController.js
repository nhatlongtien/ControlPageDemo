const Marvel = require("../Models/Marvel");
// Config multer
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        console.log(file);
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    },
    limits: {
        fileSize: 25 * 1000 * 1000
    }
}).single("image");

module.exports.insertNewMarvel = function(req, res) {
        upload(req, res, function(error) {
            if (error instanceof multer.MulterError) {
                res.json({
                    result: "Fail",
                    message: "A Multer error occurred when uploading."
                })
            } else if (error) {
                res.json({
                    result: "Fail",
                    message: "An unknown error occurred when uploading."
                })
            } else {
                // save to mongoose
                var newCharacter = new Marvel({
                    name: req.body.name,
                    level: req.body.level,
                    image: req.file.filename
                })
                newCharacter.save(function(error) {
                    if (error) {
                        res.json({
                            result: "Fail",
                            message: error
                        })
                    } else {
                        res.redirect("/marvel/listMarvel")
                    }
                })

            }
        });
    }
    //Get all marvel
module.exports.getAllMarvel = function(req, res) {
        Marvel.find(function(error, data) {
            if (error) {
                res.json({
                    result: "Fail",
                    Character: [],
                    message: `Fail to get all character from database. error is: ${error}`
                })
            } else {
                res.render('marvelList', { listCharacter: data })
            }
        });
    }
    // get marvel to edit
module.exports.getInfoCharacter = function(req, res) {
        if (req.params.idCharacter) {
            Marvel.findById(req.params.idCharacter, function(error, data) {
                if (error) {
                    res.json({
                        result: "Fail",
                        message: `Can not get character, error is: ${error}`
                    })
                } else {
                    res.render('marvelEdit', { selectedCharacter: data })
                }
            })
        } else {
            res.json({
                result: "Fail",
                message: "You need to input your IdCharacter"
            })
        }
    }
    // edit character
module.exports.editCharacter = function(req, res) {

        upload(req, res, function(error) {
            console.log(req.body)
                // check file is exit or not
            if (!req.file) { // File is not exist
                Marvel.updateOne({ _id: req.body.IdChracter }, {
                    name: req.body.name,
                    level: req.body.level
                }, function(error) {
                    if (error) {
                        res.json({
                            result: "Fail",
                            message: `Can not update character. Error is: ${error}`
                        })
                    } else {
                        res.redirect("/marvel/listMarvel")
                    }
                });
            } else {
                if (error instanceof multer.MulterError) {
                    res.json({
                        result: "Fail",
                        message: "A Multer error occurred when uploading."
                    })
                } else if (error) {
                    res.json({
                        result: "Fail",
                        message: "An unknown error occurred when uploading."
                    })
                } else {
                    // file is exist
                    Marvel.updateOne({ _id: req.body.IdChracter }, {
                        name: req.body.name,
                        level: req.body.level,
                        image: req.file.filename
                    }, function(error) {
                        if (error) {
                            res.json({
                                result: "Fail",
                                message: `Can not update character. Error is: ${error}`
                            })
                        } else {
                            res.redirect("/marvel/listMarvel")
                        }
                    });
                }
            }
        });
    }
    // delete
module.exports.deleteSelectedMarvel = function(req, res) {
    Marvel.findByIdAndDelete(req.params.idCharacter, function(error) {
        if (error) {
            res.json({
                result: "Fail",
                message: `Can not delete this character. Error is: ${error}`
            })
        } else {
            res.redirect('/marvel/listMarvel')
        }
    })
}