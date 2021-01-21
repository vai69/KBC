const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
const axios = require('axios');
//var cors = require('cors')
const app = express();
var q;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static(__dirname));
//app.use(cors())

app.get("/", function(req, res) {
    res.render("start");
});
app.get("/end", function(req, res) {
    res.render("end");
});

//function to acsses data from request 
//function apiCall(callback) {
// request("https://quizzrapi.herokuapp.com/random", function(error, response, body) {
//     var result = JSON.parse(body);
//   return callback(null, result);
//  });
//}




app.get("/KBC", function(req, res) {
    //apiCall((err, body) => {
    //res.render("kb",{que:body.question,a:body.a,b:body.b,c:body.c,d:body.d,ans:body.answer});
    //});
    
    var id = req.query.id;
    var ans = req.query.ans;
    console.log(req.query);
    axios.get('https://quizzrapi.herokuapp.com/random')
        .then(function(response) {
            var newQuestion = response.data;
            if (!parseInt(id)) {
                console.log(id);
                global.q=newQuestion.answer;
                console.log(q)
                res.render("kb", { que: newQuestion.question, a: newQuestion.a, b: newQuestion.b, c: newQuestion.c, d: newQuestion.d, ans: newQuestion.answer });
            } 
            else {
              console.log(q);
                if (global.q== ans) {
                    console.log(ans, id);
                    global.q=newQuestion.answer;
                    res.render("kb", { que: newQuestion.question, a: newQuestion.a, b: newQuestion.b, c: newQuestion.c, d: newQuestion.d, ans: newQuestion.answer });
                }
                else
                {
                  res.redirect("/end");
                }
            }
        })

});



app.post("/", function(req, res) {
    //redirct from root page
    res.redirect("/KBC?id=0");
});

app.post("/end", function(req, res) {
    //redirct from root page
    res.redirect("/");
});

app.post("/verify", (req, res) => {
    var it = req.body;
    console.log(it);
    res.redirect('/KBC?id=1&ans=' + it.button);

})

app.listen(5000, function() {
    console.log("This is port 5000");
});