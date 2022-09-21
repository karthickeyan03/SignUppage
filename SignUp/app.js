const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
  const data={
    members:[{
         email_address:email,
         status:"subscribed",
         merge_fields:{
          FNAME:firstName,
          LNAME:lastname


         }
    }
  ]
  };
  const jsonData=JSON.stringify(data);
   const url="https://us9.api.mailchimp.com/3.0/lists/de9a1e6dc8";
   const options={
    method:"POST",
    auth:"karthick1:edce0f2cfbb0210a982d58e4f8f7f773-us9"
   }
 const request= https.request(url,options,function(response){
     if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
     }else
     {
      res.sendFile(__dirname+"/failure.html");
     }
     response.on("data",function(data){
        console.log(JSON.parse(data));
     })
  })
  //console.log(firstName,lastname,email);
  request.write(jsonData);
  request.end();
  
  
});
app.post("/failure",function(req,res){
     res.redirect("/");
}); 
app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});

//edce0f2cfbb0210a982d58e4f8f7f773-us9
//audience id
//de9a1e6dc8.