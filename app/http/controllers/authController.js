const passport = require('passport');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

function authController(){
    return {
        login(req , res){
            res.render('auth/login');
        },
        register(req , res ){
            res.render('auth/register');
        },
        postLogin(req , res , next){
            passport.authenticate('local' , (err , user , info) =>{
                if(err){
                    req.fash('error' , info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error' , info.message)
                    return res.redirect('/login')

                }
                req.login(user , (err)=>{
                    if(err){
                        flash('error' , info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req , res , next)
            console.log(req.body);
           
        },
        async postRegister(req , res){
            const { name ,email , password  } = req.body

            //validation
            if(!name || !email || !password){
                req.flash('error' , 'All fields are require')
                req.flash('name' , name)
                req.flash('email' , email)
                return res.redirect('/register');
            }

            // Check if email exist 
            // User.exists({ email: email} , (err , result) => {
            //     if(result){
            //         req.flash('error' , 'Email already exist')
            //         req.flash('name' , name)
            //         req.flash('email' , email)
            //         return res.redirect('/register');
            //     }
            // })

            //Hashing password
            const hashedPassword = await bcrypt.hash(password , 10)

            //create a user

            const user = new User({
                name : name,
                email : email,
                password : hashedPassword})

            user.save().then((user)=>{
                //Login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error' , 'Something went wrong')
                    return res.redirect('/register');
            })

            console.log(name , email , password);
        },
        logout(req , res){
            req.logout(()=>{
                res.redirect('/')
            })
            
        }
    }
}

module.exports = authController;
