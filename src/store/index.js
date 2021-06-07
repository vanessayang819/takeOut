import Vue from 'vue'
import Vuex from 'vuex'
import { location } from '../api/location'
import { getRestaurant } from '../api/restaurant'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		lat: '', // 当前位置纬度
		lng: '', // 当前位置经度
		address: {
			address: '定位中...',
			lat: '',//39.9219
			lng: '',//116.44355
		},
		locationReady: false,   //定位是否完成
		deliveryAddress: {},
		poiInfo: {},
		cartList: {},


	},

	mutations: {
		addCart(state, {name,price,food_id,restaurant_id}) {
			let cart = state.cartList
			let restaurant
		
			if (!cart[restaurant_id]) { 
				console.log('初始化restaurant')
				restaurant = cart[restaurant_id] = {
					totalPrice: 0,   //总价格
				};
			} else {
				restaurant = cart[restaurant_id];
			}
			restaurant.totalPrice +=  Number(price);   
			console.log(price,restaurant.totalPrice)
			if (restaurant[food_id]) {    
				restaurant[food_id].num++;
			} else {
				console.log('初始化food')
				restaurant[food_id] = { 
					name:name,
					price:price,
					num: 1,
					id: food_id,
				}
			}
			state.cartList = { ...cart }
		},

		reduceCart(state, { restaurant_id, food_id }) {
			let cart = state.cartList
			let restaurant = cart[restaurant_id]
			restaurant[food_id].num--
			restaurant.totalPrice -= restaurant[food_id].price
			state.cartList = { ...cart }

		},


		recordAddress(state, address) {
			state.address = { ...address }//解构赋值
		},
		//定位完成拉取附近餐馆
		locationReady(state, boolean) {
			state.locationReady = boolean;
		},

		recordDeliveryAddress(state, address) {
			state.deliveryAddress = { ...address };
		},

		recordRestaurant(state, poiInfo) {
			state.poiInfo = { ...poiInfo }
		},
	},

	actions: {
		location({ commit }) {
			location().then((response) => {
				if (response.data.status === 200) {
					console.log(response)
					let data = response.data.data;
					commit('recordAddress', { address: data.address, ...data.location }); //保存title 和 经纬度到VUEX中
					commit('locationReady', true);    //定位完成 拉取商店

				}
			})
		},

		recordAddress({ commit }, address) {
			commit('recordAddress', address); //保存title 和 经纬度到VUEX中
			commit('locationReady', true);    //定位完成 拉取商店
		},
		locationReady({ commit }, boolean) {
			commit('locationReady', boolean);    //定位完成 拉取商店
		},
		recodeDeliveryAddress({ commit }, address) {
			commit('recordDeliveryAddress', address);    //定位完成 拉取商店
		},

		getRestaurant({ commit }, restaurant_id) {
			getRestaurant({ restaurant_id }).then((response) => {
				let poiInfo = response.data.data;
				commit('recordRestaurant', poiInfo)
			})
		},

		addCart({ commit }, {name,price,food_id,restaurant_id}) {
			commit('addCart', {name,price,food_id,restaurant_id})
		},
		reduceCart({commit}, {restaurant_id, food_id}) {
			commit('reduceCart', {restaurant_id, food_id})
		},

	}

})