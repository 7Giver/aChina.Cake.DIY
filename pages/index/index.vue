<template>
	<view class="content">
		<nut-button type="primary">主要按钮</nut-button>
		<nut-button type="info">信息按钮</nut-button>
		<nut-button type="default">默认按钮</nut-button>
		<nut-button type="danger">危险按钮</nut-button>
		<nut-button type="warning">警告按钮</nut-button>
		<nut-button type="success">成功按钮</nut-button>
		<nut-cell-group title="链接 | 分组用法" desc="使用 nut-cell-group 支持 title desc slots">
			<nut-cell title="链接" is-link></nut-cell>
			<nut-cell title="URL 跳转" desc="https://m.jd.com" is-link url="https://m.jd.com"></nut-cell>
			<nut-cell title="路由跳转 ’/‘ " to="/"></nut-cell>
		</nut-cell-group>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		}
	},
	onLoad() {},
	methods: {}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
