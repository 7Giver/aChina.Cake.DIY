<template>
	<view class="content">
		<view class="flex-ce top_wrap">
			<nut-icon name="scan2" size="24" @tap="goScanCode"></nut-icon>
		</view>
		<view class="main_title">米斯卡-振兴店</view>
		<view class="container">
			<view class="text_area">
				<textarea :value="state.textArea" maxlength="200" placeholder="这一刻的想法…"></textarea>
			</view>
			<view class="upload_wrap">
				<nut-uploader :url="state.url"></nut-uploader>
			</view>
		</view>
		<nut-button type="primary" size="large">提交</nut-button>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

const state = reactive({
	textArea: '',
	url: ''
})

// 调起识别二维码
const goScanCode = () => {
	// #ifdef MP-WEIXIN
	// 调起条码扫描
	uni.scanCode({
		scanType: ['qrCode'],
		success: function (res) {
			console.log('条码类型：' + res.scanType)
			console.log('条码内容：' + res.result)
			uni.showToast({
				title: res.result
			})
		}
	})
	// #endif
}
</script>

<style lang="scss" scoped>
.content {
	min-height: 100vh;
	padding: 0 30rpx;
}
.top_wrap {
	padding: 50rpx 0 30rpx;
}
.main_title {
	font-size: 32rpx;
	font-weight: bold;
}
.container {
	padding: 30rpx 0 80rpx;
	margin-bottom: 80rpx;
	border-bottom: 1px solid #d8d8d8;
	.text_area {
		height: 200rpx;
		padding: 14rpx 20rpx;
		background: #fff;
		textarea {
			width: 100%;
			height: 100%;
		}
	}
	.upload_wrap {
		padding-top: 50rpx;
	}
}
</style>
