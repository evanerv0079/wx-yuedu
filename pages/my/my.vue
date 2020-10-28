<template>
	<view>
		my
	</view>
</template>

<script>
	var loginres;
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad:function(e){
			loginres=this.checkLogin('../my/my',2)
			if(!loginres){
				return;
			}
		}
	}
</script>

<style>

</style>
