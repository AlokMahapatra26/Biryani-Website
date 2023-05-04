const authController = require('../app/http/controllers/authController.js');
const cartController = require('../app/http/controllers/customers/cartController.js');
const homeController = require('../app/http/controllers/homeController.js')
const guest = require('../app/http/middleware/guest.js')

function routesInit(app){
    app.get("/" , homeController().index);
    app.get("/login" , guest , authController().login)
    app.post("/login" , authController().postLogin)
    app.get("/register" , guest , authController().register)
    app.post("/register" , authController().postRegister)
    app.post("/logout" , authController().logout)

    app.get("/cart" , cartController().index)
    app.post("/update-cart" , cartController().update)
    
}

module.exports = routesInit;