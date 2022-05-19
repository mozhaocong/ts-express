import axios from 'axios'

axios.interceptors.request.use(
	(config) => {
		config.headers = {
			Authorization:
				'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTY1Mjk1NjQ0OSwidXVpZCI6IjVmYTk3NDk2LTZkMmQtNGI0OS05NzgwLWE3YWIxMzY3ZjUzMiIsIndlYklkZW50aWZ5IjoiYWRtaW4ifQ.OiWlK7DiDfxGuD8_cNCstQdIrx72gVv45V0Ra_ml9LpH4uRVvdXhBdTguUCbnLtuJGURXbWg5cegnkaM5J8UQk0dGlrBy171BRwr7YX66cf5SUHVHdUtRPD3ja2N_W7wkD7q4tobbwY8pNH82LiDQkAQjcsaBzmPkdXaN8Zyn7aoamx0YQzVTHJo7csKVJi9O1cCV3sJt8qx9Y7e8UaHeCdz6ZsSgT_CwSBmaTbEObQfhQtPq8YHoLXzMgz0k5C8MbAdcnAD4xi71n9dpno7VIWBOfeywpHqncRWU7GHwb_Y7kvbiuXu6l5uTq2X3ao-IwktxIs-Vwu9ycJYX0tHrg',
			...config.headers
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

/**
 * @param {String} url
 * @param {Object} data
 * @returns Promise
 */
export function post(url: string, data: any, options = {}): Promise<any> {
	console.log(data)
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			data: data,
			...options
		})
			.then((res: any) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export function get(url: string, data?: any, options = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url,
			params: data,
			...options
		})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export function methodType(url: string, method: string, data: any, options = {}): Promise<any> {
	return new Promise((resolve, reject) => {
		axios({
			method: method as 'get',
			url,
			[method === 'get' ? 'data' : 'params']: data,
			...options
		})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
