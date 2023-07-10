<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
// 一些需要全局覆盖的样式
@import '@/uni_modules/sky-nutui/components/sky-nutui/app.scss';
@import '@/static/base.scss';
</style>
