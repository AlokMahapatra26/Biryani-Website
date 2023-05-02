const Menu = require('../../models/menu');
function homeController(){
    return {
        async index(req , res){
           const items = await Menu.find();
           return res.render('index' , {items : items});
            
        }
    }
}

module.exports = homeController;