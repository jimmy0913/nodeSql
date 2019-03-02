/* eslint-disable */
import axios from 'axios';
import app from "./../main.js";

const service = axios.create({
	baseUrl:'/api',
	timeout:5000,	
})

service.interceptors.request.use(function(config){
	console.log(config);

	config.method === 'post'
	        ? config.data = qs.stringify({...config.data})
	        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;
}),function(err){
    Promise.reject(err);
}


service.interceptors.response.use(function(res){
	if (res.data.result === 'TRUE') {
        return res.data;
    } else {
    	let msg = res.data.data.msg;

        app.$alert(msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });
    }

}),function(err){
	
	console.log('error');
	console.log(err);
	console.log(JSON.stringify(err));

	let text = JSON.parse(JSON.stringify(err)).response.status === 404
	    ? '404'
	    : '网络异常，请重试';

	app.$alert(text, '提示', {
	  confirmButtonText: '确定',
	  callback: action => {
	    
	  }
	});

	return Promise.reject(err);
	
}

/*module.exports = {
	service:service
}*/

export default service;