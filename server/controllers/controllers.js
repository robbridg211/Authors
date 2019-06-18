const collections = require('../models/models');
const Author = collections.Author;


module.exports = {
//RETRIEVE ALL AUTHORS ROUTE
    authors: function(req, res) {
        Author.find({}, function(err, authors) {
            if(err) {
                console.log('something went wrong with retrieving all authors');
                res.json({message: "Error", error: err});
            } 
            else {
                console.log('success: viewing all authors in database');
                res.json({status: "Success", authors: authors});
            }
        })
    },
//GET ONE AUTHOR ROUTE
    author: function(req, res) {
        Author.find({_id: req.params._id}, function(err, author) {
            if(err) {
                console.log('something went wrong with showing one author');
                res.json({message: "Error", error: err})
            } 
            else {
                console.log("success: viewing selected author in database");
                res.json({status: "Success", author: author})
            }
        });
    }, 
//CREATE NEW AUTHOR ROUTE
    post: function(req, res) {
        Author.create(req.body, function(err, author) {
            if(err) {
                let data = {}
                for (let key in err.errors) {
                    data[key] = err.errors[key].message;
                }
                console.log('We have an error', err);
                res.json({message: "Error", error: err})
                } 
            else {
                console.log('successfully added author!');
                res.json({status: "Successfully added!", author: author});
            }
        });
    },

//EDIT ONE AUTHOR ROUTE
    put: function(req, res) {
        Author.findByIdAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}}, function(err) {
            if(err) {
                console.log('something went wrong with updating an author');
                res.json({message: "Error", error: err})
            } 
            else {
                console.log("success: edited selected author in database");
                res.json({status: "Edit Success"})
            }  
        })
    },
//DELETE AN AUTHOR ROUTE
    delete: function(req, res) {
        Author.deleteOne({_id: req.params.id}, function(err) {
            if(err) {
                console.log('something went wrong with destroying an author', err);
                res.json({message: "Error", error: err})
            } 
            else {
                console.log("successfully deleted author!");
                res.json({status: "Delete Success"})
            }
        })
    },


}