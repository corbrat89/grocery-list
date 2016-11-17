var Item = require('./models/item');

function getItems(res) {
    Item.find(function (err, items) {

        // if error send the error
        if (err) {
            res.send(err);
        }
		
        res.json(items); // else return all items in JSON
    });
};

module.exports = function (app) {

    // get all items
    app.get('/api/items', function (req, res) {
        // get all the items from the database
        getItems(res);
    });

    // add item and return all items in list
    app.post('/api/items', function (req, res) {
        // add the item, get info from angular
        Item.create({
            text: req.body.text,
			qty: req.body.qty,
            done: false
        }, function (err, item) {
            if (err)
                res.send(err);
            getItems(res);
        });

    });

    // delete item from list
    app.delete('/api/items/:item_id', function (req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function (err, item) {
            if (err)
                res.send(err);
            getItems(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // angular handles updates on page
    });
};
