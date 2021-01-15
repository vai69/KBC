const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
global.q=[];
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.render("start");
});

//function to acsses data from request 
function apiCall(callback) {
  request("https://quizzrapi.herokuapp.com/random", function(error, response, body) {
      var result = JSON.parse(body);
      return callback(null, result);
  });
}



app.get("/KBC", function(req, res) {
	apiCall((err, body) => {
	res.render("kb",{que:body.question,a:body.a,b:body.b,c:body.c,d:body.d,ans:body.answer});
  });
    
});



app.post("/",function(req,res){
	//redirct from root page
	res.redirect("/KBC");
});

app.listen(5000, function() {
    console.log("This is port 5000");
});