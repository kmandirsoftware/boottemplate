var express=require('express');
var bodyParser = require('body-parser');
var app=express();
app.use(bodyParser.json());
var dvr = require("./dvr.js");

app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/JS'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// return APIs
function process_data(err, res, data){
    console.log("process_data");
    var title = "My Title";
    res.render('partials/dvr',{
       data: data, 
       title: title
    });
};

app.get('/',function(req,res){
   var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
    var title = "My Title";
    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline,
	title: title
    });
});

// about page 
app.get('/about', function(req, res) {
    var title = "My Title";
    res.render('pages/about',{
       title: title
    });
});

// Not Used
app.post('/list',function(req,res){
   console.log(req.body);
   if(req.body.receiverid){
      dvr.process(res,req.body.receiverid,process_data);
   }else{
          res.json({
          code: "404",
          code_desc: "4000",
          message: "Need Receiver Id"
         });
   }
});

var server=app.listen(5006,function(){
console.log("We have started our server on port 5006");
});
