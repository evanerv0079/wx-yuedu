import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.checkLogin= function(backpage,backtype){
	var SUID = uni.getStorageSync('SUID');//用户uid
	var SRANT = uni.getStorageSync('SRANT');//用户随机码
	var SNAME =uni.getStorageSync('SNAME');//用户名称
	var SFACE = uni.getStorageSync('SFACE');//用户头像
	console.log(SUID)
	console.log(SRANT)
	console.log(SFACE)
	if(SUID=='' || SRANT=='' || SNAME==''){
		uni.redirectTo({
			url:'../login/login?backpage='+backpage+'&backtype='+backtype
		})
		return false;
	}
	return [SUID,SRANT,SNAME,SFACE]
}
Vue.prototype.global={
	'token':'API2021'
}
Vue.prototype.appServer ='http://192.168.1.116/'
Vue.prototype.staticServer = 'http://192.168.1.116/'
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
