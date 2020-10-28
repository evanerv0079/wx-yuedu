<template>
	<view>
		<view>
			login页面
		</view>
		<view>
			<!--#ifdef MP-WEIXIN-->
			<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	let _self,openid,session_key,onloadoption;
	var nowdate=new Date();
	let sign = require('../../commons/sign.js');
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//#ifdef MP-WEIXIN
			getUserInfo:(info)=>{
				
				let sign = uni.getStorageSync('sign');
				console.log("login-signvalue="+sign)
				uni.request({
					url: _self.appServer+'member/login',
					method: 'POST',
					data: {
						'uOpenid': openid,
						'uName': info.detail.userInfo.nickName,
						'uFace': info.detail.userInfo.avatarUrl,
						'uRandom':Math.random(),
						'token':uni.getStorageSync('sign')
						
					},
					success: res => {
						saveUserCache(res);
					},
					fail: () => {
						uni.showToast({
							title:"获取用户信息失败"
						})	
					},
					complete: () => {}
				});
			},
			//#endif
		},
		onLoad:function(options){
			_self =this
			sign.sign(this.appServer);
			onloadoption =options;
			//#ifdef APP-PLUS
				applogin(options)
			//#endif
			
			//#ifdef MP-WEIXIN
				wxlogin()
			//#endif
			
		}
	}
	function wxlogin(){
		uni.login({
			provider: 'weixin',
			success: (res) => {
				if (res.code) {
					uni.request({
						url: _self.appServer+'member/getWxMessage',
						method: 'GET',
						data: {'code': res.code},
						success: session => {
							openid = session.data.openid;
							session_key =session.data.session_key;
						},
						fail: () => {
							uni.showToast({
								title:"登录失败"
							})	
						},
						complete: () => {}
					});	
				}
			}
		})
	}
	function applogin(){
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
		    // 获取用户信息
		    uni.getUserInfo({
		      provider: 'weixin',
		      success: function (info) {
				console.log(info.userInfo.openId);
		        uni.request({
		        	url: _self.appServer+'member/login',
		        	method: 'POST',
		        	data: {
						'uOpenid': info.userInfo.openId,
						'uName': info.userInfo.nickName,
						'uFace': info.userInfo.avatarUrl,
						'uRandom':Math.random(),
						
		        	},
		        	success: res => {
						saveUserCache(res);
		        	},
		        	fail: (res) => {
						uni.showToast({
							title:"登录失败"
						})							
					},
		        	complete: () => {}
		        });
		      }
		    });
		  },
		  fail: (res) => {
			console.log(res)
		  }
		});
	}
	function saveUserCache(res){
		if(res.data.flag==true){
			console.log(res)
			uni.setStorageSync('SUID',res.data.member.uOpenid);
			uni.setStorageSync('SRANT',res.data.member.uRandom);
			uni.setStorageSync('SNAME',res.data.member.uName);
			uni.setStorageSync('SFACE',res.data.member.uFace);
			if(onloadoption.backtype==1){
				uni.redirectTo({
					url:onloadoption.backpage
				})
			}else{
				uni.switchTab({
					url:onloadoption.backpage
				})
			}
		}
		uni.showToast({
			title:res.data.message
		})
	}
</script>

<style>

</style>
