const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();
//global variables
let uniqueid="";
let userinfo={};
let acc_info={};
let myobj={};
let arr=[];
  

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
main().catch(err=>console.log(err));
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/agriuserDB');
    const productSchema=new mongoose.Schema({
        prod_name:String,
        prod_des:String,
        image:{
            data:Buffer,
            contentType:String,
        }
    });
    const Product=mongoose.model("Product",productSchema)
    const accountSchema=new mongoose.Schema({
      acc_name:String,
      acc_number:String,
      bank_name:String,
      branch_name:String,
      Ifsc_code:String
    });
    const Account=mongoose.model("Account",accountSchema);
    const farmerSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        aadhar:String,
        address:String,
        city:String,
        State:String,
        pincode:String,
        Password:String,
        acc_status:String,
        account_details:accountSchema,
        product_details:productSchema
    });
    const Farmer=mongoose.model("Farmer",farmerSchema);

    const customerSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        address:String,
        city:String,
        State:String,
        pincode:String,
        Password:String
    });
    const Customer=mongoose.model("Customer",customerSchema);
    const businessSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        address:String,
        city:String,
        State:String,
        company:String,
        bphone:String,
        bemail:String,
        address:String,
        gstn:String,
        usertype:String,
        pincode:String,
        Password:String
    });
    const Business=mongoose.model("Business",businessSchema);
    const studentSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        aadhar:String,
        address:String,
        city:String,
        State:String,
        pincode:String,
        clgname:String,
        Password:String
    });
    const Student=mongoose.model("Student",studentSchema);



app.get("/",function(req,res){
   res.sendFile(__dirname+"/Homepage.html");
});
app.get("/signup.html",function(req,res){
res.sendFile(__dirname+"/signup.html")
});
app.get("/farmer.html",function(req,res){
    res.sendFile(__dirname+"/farmer.html");
});

app.post("/farmer.html",function(req,res){
  let username=req.body.name;
  let userid=username+"@farmer.in";

    let farmer=new Farmer({
        name:req.body.name,
        username:req.body.name+"@farmer.in",
        DOB:req.body.dob,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        aadhar:req.body.aadhar,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        pincode:req.body.pincode,
        Password:req.body.password,
        acc_status:"not updated",
        account_details:{},
        product_details:{}
    });
    farmer.save();
    res.render("dialog",{username:username,userid:userid});

});
app.get("/customer.html",function(req,res){
    res.sendFile(__dirname+"/customer.html");
});
app.post("/customer.html",function(req,res){
    let username=req.body.name;
    let userid=username+"@customer.in";
    const customer=new Customer({
        name:req.body.name,
        username:req.body.name+"@customer.in",
        DOB:req.body.date,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        pincode:req.body.pincode,
        Password:req.body.password

    });
    customer.save();
    res.render("dialog",{username:username,userid:userid});
});
app.get("/business.html",function(req,res){
    res.sendFile(__dirname+"/business.html");
});
app.post("/business.html",function(req,res){
    const business=new Business({
        name:req.body.name,
        username:req.body.name+"@business.in",
        DOB:req.body.date,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        company:req.body.company,
        bphone:req.body.bphone,
        bemail:req.body.bemail,
        gstn:req.body.gstn,
        usertype:req.body.usertype,
        pincode:req.body.pincode,
        Password:req.body.password
    });
    business.save();

})
app.get("/student.html",function(req,res){
    res.sendFile(__dirname+"/student.html");
});
app.post("/student.html",function(req,res){
    const student=new Student({
    name:req.body.name,
        username:req.body.name+"@student.in",
        DOB:req.body.dob,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        aadhar:req.body.aadhar,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        pincode:req.body.pincode,
        clgname:req.body.clgname,
        Password:req.body.password

    });
    student.save();

});
app.get("/farmer.html/login",function(req,res){
  res.render("login");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login",function(req,res){
    let username=req.body.username;
    let userType=username.split("@")[1];
    console.log(userType);
    if(userType=="farmer.in"){
        console.log("s");
        Farmer.findOne({email:req.body.email},function(err,foundUser){
            console.log("s");
            console.log(foundUser);
            if(err){
                console.log(err);
            }else{
                if(foundUser){
                    if(foundUser.Password===req.body.password){
                        console.log(foundUser.Password);
                        uniqueid=foundUser._id;
                        userinfo=foundUser;
                        console.log(uniqueid);
                        console.log(userinfo);
                        res.redirect("/profile");
                    }
                }
            }
            });
        }
    if(userType=="customer.in"){
        Customer.findOne({email:req.body.email},function(err,foundUser){
            if(err){
                console.log(err);
            }else{
                if(foundUser){
                    if(foundUser.Password==req.body.password){
                        res.redirect("/");
                    }
                }else{
                    console.log("user not found");
                }
            }
        });

    }
            if(userType=="business.in"){
                    Customer.findOne({email:req.body.email},function(err,foundUser){
                        if(err){
                            console.log(err);
                        }else{
                            if(foundUser){
                                if(foundUser.Password==req.body.password){
                                    res.redirect("/");
                                }
                            }else{
                                console.log("user not found");
                            }
                        }
                    });
                }
                if(userType=="student.in"){
                    Customer.findOne({email:req.body.email},function(err,foundUser){
                        if(err){
                            console.log(err);
                        }else{
                            if(foundUser){
                                if(foundUser.Password==req.body.password){
                                    res.redirect("/");
                                }
                            }else{
                                console.log("user not found");
                            }
                        }
                    });
                }
    }
);
app.get("/buy.html",function(req,res){
    res.sendFile(__dirname+"/buy.html")
});
app.get("/profile",function(req,res){
   res.render("fprofile",
   {name:userinfo.name,
    email:userinfo.email,
    address:userinfo.address,
    city:userinfo.city,
    state:userinfo.State,
    pincode:userinfo.pincode,
    phone:userinfo.mobile,
});
});
app.get("/profile/account",function(req,res){
    console.log("valid");
    if(userinfo.acc_status=="not updated"){
        res.render("account")
    }else{
        Farmer.findOne({_id:uniqueid},function(err,foundUser){
            if(err){
                console.log(err);
            }else{
                acc_info=foundUser.account_details;
                console.log(foundUser.account_details);
            }
            res.render("accountupdate",
         {
            acc_name:acc_info.acc_name,
            acc_number:acc_info.acc_number,
            bank_name:acc_info.bank_name,
            branch_name:acc_info.branch_name,
            ifsc:acc_info.Ifsc_code
        });
         })
         
    }
});
/*app.get("/profile/:features",function(req,res){
    const type=req.params.features;
    if(type=="account"){
        res.redirect("/profile/account");
    }
    if(type=="products"){
        res.render("products",{arr:arr});
    }
    if(type=="sales"){
        res.render("sales");
    }
    if(type=="orders"){
        res.render("orders");
    }
   });*/
 
app.post("/profile/account",function(req,res){
     let account=new Account({
       acc_name:req.body.accname,
       acc_number:req.body.accnumber,
       bank_name:req.body.bank_name,
       branch_name:req.body.branch_name,
       Ifsc_code:req.body.ifsc
     });
     account.save();
     Farmer.updateOne({_id:userinfo._id},{$set:{account_details:account},acc_status:"updated"},function(err){
       if(err){
         console.log(err)
       }else{
         console.log("account updated");
       }
     });
     Farmer.findOne({_id:uniqueid},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            acc_info=foundUser.account_details;
        }
     })
     res.render("accountupdate",
     {
        acc_name:acc_info.acc_name,
        acc_num:acc_info.acc_number,
        bank_name:acc_info.bank_name,
        brach_name:acc_info.branch_name,
        ifsc:acc_info.Ifsc_code
    });
    });
    app.get("/profile/products",function(req,res){
        res.render("products",{arr:arr});
    });
       app.post("/profile/products",function(req,res){
        console.log("valid");
        let product = new Product({
         prod_name:req.body.prod_name,
         prod_des:req.body.description
        });
        product.save();
        Farmer.updateOne({_id:uniqueid},{product_details:product},function(err){
         if(err){
             console.log(err);
         }else{
             console.log("updated products");
         }
        })
        myobj={"prod_name":req.body.prod_name,"prod_des":req.body.description};
        arr.push(myobj);
        res.render("products",{arr:arr});
     });
    
  
 
app.get("/logout",)
app.listen(3000,function(){
    console.log("hey my server is running");
});
}
