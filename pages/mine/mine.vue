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
		<view class="main_title">我的图片</view>
		<view class="list_wrap">
			<view class="flex item" v-for="(item, index) in state.cakeList" :key="index">
				<nut-image
					src="//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg"
					width="100"
					height="100"
					radius="10"
				></nut-image>
				<view class="right_wrap">
					<view class="time">{{ item.time }}</view>
					<view class="name">{{ item.name }}</view>
					<view class="order">订单号：{{ item.order }}</view>
				</view>
				<view class="flex-cb btn_wrap">
					<nut-button type="default">查看</nut-button>
					<nut-button type="danger">删除</nut-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'

onShow(() => {
	console.log('onShow')
})

const state = reactive({
	title: 'Hello',
	cakeList: [
		{
			time: '2023年07月07日 14:21:20',
			name: '米斯卡-振兴店',
			order: 90991
		},
		{
			time: '2023年07月07日 14:21:20',
			name: '米斯卡-振兴店',
			order: 90991
		}
	]
})
</script>

<style lang="scss" scoped>
.content {
	min-height: 100vh;
	padding: 0 30rpx;
}
.top_wrap {
	padding: 40rpx 0 40rpx;
	margin-bottom: 30rpx;
	border-bottom: 1px solid #d8d8d8;
	.right_wrap {
		padding-left: 30rpx;
	}
}
.main_title {
	font-size: 32rpx;
	// padding-bottom: 30rpx;
}
.list_wrap {
	.item {
		position: relative;
		padding: 30rpx 0;
		border-bottom: 1px solid #d8d8d8;
		.right_wrap {
			font-size: 30rpx;
			padding-left: 30rpx;
		}
		.btn_wrap {
			width: 460rpx;
			position: absolute;
			right: 0;
			bottom: 26rpx;
			::v-deep.nut-button {
				width: 210rpx;
			}
		}
	}
}
</style>
