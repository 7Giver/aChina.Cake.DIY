<template>
	<view class="content">
		<view class="flex-ac top_wrap">
			<nut-avatar
				size="large"
				icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
			></nut-avatar>
			<view class="right_wrap">
				<nut-button type="primary">立即登录</nut-button>
			</view>
		</view>
		<!-- 分割线 -->
		<nut-divider :style="{ color: '#d8d8d8' }" />
		<view class="main_title">我的图片</view>
		<view class="list_wrap">
			<view class="flex-ac item" v-for="(item, index) in state.cakeList" :key="index">
				<nut-image
					src="//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg"
					width="100"
					height="100"
				></nut-image>
				<view class="right_wrap">
					<view>{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

const state = reactive({
	title: 'Hello',
	cakeList: [
		{
			name: '蛋糕1'
		}
	]
})
</script>

<style lang="scss" scoped>
.content {
	padding: 0 30rpx;
}
.top_wrap {
	padding: 40rpx 0 0;
	.right_wrap {
		padding-left: 30rpx;
	}
}
</style>
