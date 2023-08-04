import { createStore } from 'vuex'
import VuexPersister from 'vuex-persister'
// import { login, wxlogin, getSessionKey, addUserOpenId } from '@/config/api.js'

const vuexLocal = new VuexPersister({
	key: 'app_config_data',
	storage: {
		getItem: key => uni.getStorageSync(key),
		setItem: (key, value) => uni.setStorageSync(key, value),
		removeItem: key => uni.removeStorageSync(key)
	}
})

const store = createStore({
	state: {
		token: '',
		userInfo: {},
		warehouse: {}, // 销售仓库
		warehouseList: [], // 仓库列表
		shopCart: [], // 要货购物车
		sendCart: [] // 发货购物车
	},
	getters: {
		hasToken(state) {
			return state.token == '' ? false : true
		},
		getShopCart(state) {
			return state.shopCart.length ? state.shopCart : []
		},
		getTotalNum(state) {
			let totalNum = 0
			state.shopCart.forEach(item => (totalNum += item.needNum * 1))
			return totalNum
		},
		getTotalCash(state) {
			let totalCash = 0
			state.shopCart.forEach(item => (totalCash += item.salePrice * item.needNum))
			return uni.$u.priceFormat(totalCash, 2)
		},
		getSendCart(state) {
			return state.sendCart.length ? state.sendCart : []
		},
		getSendTotalNum(state) {
			let totalNum = 0
			state.sendCart.forEach(item => (totalNum += item.sendNum))
			return totalNum
		},
		getSendTotalCash(state) {
			let totalCash = 0
			state.sendCart.forEach(item => (totalCash += item.salePrice * item.sendNum))
			return uni.$u.priceFormat(totalCash, 2)
		},
		getWarehouseColumns(state) {
			let result = [[]]
			state.warehouseList.forEach(item => {
				let target = result[0]
				target.push(item)
			})
			result[0].unshift({ warehouseName: '全部仓库', id: '' })
			return result
		}
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		clearToken(state) {
			state.token = ''
		},
		setUserInfo(state, data) {
			state.userInfo = data ?? {}
			state.userInfo.userName = data.userName ? data.userName : ''
			state.userInfo.avatar =
				data.avatar ? data.avatar : '/static/logo.jpg'
		},
		clearUserInfo(state) {
			state.userInfo = {}
		},
		setWarehouse(state, data) {
			state.warehouse = data ?? {}
		},
		setWarehouseList(state, data) {
			state.warehouseList = data ?? []
		},
		clearWarehouse(state, data) {
			state.warehouse = {}
			state.warehouseList = []
		},
		addGoods(state, data) {
			const hasItem = state.shopCart.find(item => item.id === data.id)
			const targetIndex = state.shopCart.findIndex(item => item.id === data.id)
			if (hasItem) {
				if (data.needNum * 1 <= 0 || !data.needNum) {
					state.shopCart.splice(targetIndex, 1)
					return
				}
				hasItem.needNum = (data.needNum * 1) > 0 ? data.needNum * 1 : 0
			} else {
				if (data.needNum * 1 < 0 || !data.needNum) return
				state.shopCart.unshift(data)
			}
		},
		deleteGoods(state, index) {
			state.shopCart.splice(index, 1)
		},
		addSendGoods(state, data) {
			const hasItem = state.sendCart.find(item => item.id === data.id)
			const targetIndex = state.sendCart.findIndex(item => item.id === data.id)
			if (hasItem) {
				if (data.sendNum * 1 <= 0 || !data.sendNum) {
					state.sendCart.splice(targetIndex, 1)
					return
				}
				hasItem.sendNum = (data.sendNum * 1) > 0 ? data.sendNum * 1 : 0
			} else {
				if (data.sendNum * 1 < 0 || !data.sendNum) return
				state.sendCart.unshift(data)
			}
		},
		deleteSend(state, index) {
			state.sendCart.splice(index, 1)
		},
		clearSendCart(state) {
			state.sendCart = []
		},
		clearShopCart(state) {
			state.shopCart = []
		}
	},
	actions: {
		login({ commit }, params) {
			const userInfo = store.state.userInfo
			// openId绑定用户
			const goAddUserOpenId = async (res) => {
				let params = {
					openId: res.openid,
					userId: userInfo.uuid
				}
				// console.log('params', params);
				await addUserOpenId(params)
			}
			// 获取openId
			const goGetSessionKey = async (weixinCode) => {
				const { code, data } = await getSessionKey(weixinCode)
				if (code != 200) return
				await goAddUserOpenId(data)
			}

			login(params.tel, params.code)
				.then(res => {
					const { code, data } = res
					uni.$u.http.setConfig(config => {
						config.header.Authorization = data.token
						return config
					})
					commit('setToken', data.token)
					goSetUserInfo(data)
				})
				.catch(error => {
					console.log('login', error);
				})
		},
		async wxLogin({ commit }, tel) {
			const goSetUserInfo = async (info) => {
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: event => {
						// console.log('event', event)
						!info.openId ? goGetSessionKey(event.code) : uni.$u.route('/pages/index/index')
					}
				})
				// #endif
				uni.$u.route('/pages/index/index')
			}
			// 获取openId
			const goGetSessionKey = async (weixinCode) => {
				const { code, data } = await getSessionKey(weixinCode)
				if (code != 200) return
				await goAddUserOpenId(data)
			}
			// openId绑定用户
			const goAddUserOpenId = async (res) => {
				let params = {
					openId: res.openid,
					userId: data.id
				}
				await addUserOpenId(params)
				uni.$u.route('/pages/login/detail')
			}

			const { code, data } = await wxlogin(tel)
			if (code !== 200) return
			// console.log('wxLogin', data);
			uni.$u.http.setConfig(config => {
				config.header.Authorization = data.token
				return config
			})
			commit('setToken', data.token)
			commit('setUserInfo', data)
			goSetUserInfo(data)
		},
		loginOut({ commit }) {
			uni.$u.http.setConfig(config => {
				config.header.Authorization = ''
				return config
			})
			commit('clearToken')
			commit('clearUserInfo')
			commit('clearShopCart')
			commit('clearSendCart')
			commit('clearCustomer')
			uni.clearStorage()
			uni.reLaunch({ url: '/pages/login/login' })
		},

	},
	modules: {},
	plugins: [vuexLocal.persist]
})

export default store
