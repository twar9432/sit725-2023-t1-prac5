let collection = require('../models/Cats');

const postCat = (req,res) => {
    let cat = req.body;
    collection.postCat(cat, (err,result) => {
        if (!err) {
            res.json({statusCode:201, data:result.ops, message:'success'});
        } else {
            res.json({statusCode:500, message:'Error posting cat', error: err});
        }
    });
}

const getAllCats = (req,res) => {
    collection.getAllCats((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const deleteCat = (req,res) => {
    let cat = req.body;
    collection.deleteOne(cat, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

module.exports = {postCat,getAllCats}