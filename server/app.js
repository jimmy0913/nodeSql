const http = require('http');
const express = require('express');
const app = express();
const router = require('./router/router');

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.use(router);


http.createServer(app).listen(1000,function(err){
	if(err){
		console.log('服务启动失败...');
	}else{
		console.log('后台服务启动成功...');
	}
})


// function home(req,res,next){
// 	res.redirect('/book_list');
// }

// app.get('*',home);


