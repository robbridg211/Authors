var Controllers = require('../controllers/controllers')



module.exports = function (app) {

//RETRIEVE ALL AUTHORS ROUTE
app.get('/authors', function(req, res) {
    Controllers.authors(req, res)
});

//GET ONE AUTHOR ROUTE
app.get('/author/:id', function(req, res) {
    Controllers.author(req, res)
});

//CREATE NEW AUTHOR ROUTE
app.post('/author', function(req, res) {
    Controllers.post(req, res)
});

//EDIT ONE AUTHOR ROUTE
app.put('/author/:id', function(req, res) {
    Controllers.put(req, res);
});

//DESTROY AUTHOR ROUTE
app.get('/delete/:id', function(req, res) {
    Controllers.delete(req, res)
});


}

