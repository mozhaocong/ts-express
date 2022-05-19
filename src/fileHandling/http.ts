import axios from 'axios'
import { isString } from '@/util/tools'

axios.interceptors.request.use(
	(config) => {
		if ((config as any)['Content-Type']) {
			const ContentType = (config as any)['Content-Type']
			if (ContentType.includes('application/x-www-form-urlencoded')) {
				if (!isString(config.data)) {
					let data = ''
					for (const item in config.data) {
						data += item + '=' + config.data[item] + '&'
					}
					config.data = data
				}
			}
		}
		config.headers = {
			Authorization:
				'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTY1Mjk3NzMzMywidXVpZCI6IjU3NWViOGE1LWRkZDEtNGE2Yy05N2JlLTFmYzM5NDI3MGVlZCIsIndlYklkZW50aWZ5IjoiYWRtaW4ifQ.I4l23VOEvzEQ60-WnqjmdBLJJ56czmOBwcGTX2ncFFcjSJNbwjMDXTy9wVJiFiproclK8CEJ7cJLX3GWuP6IsVVDJAP-vzSq5T23hZhzGHxsKwAaTO4iNB7l4RiVBFVs1NyFBKdf5wW9ZfKVNmpz3asoYXP_kTOtf0WLagsJgL2ITb-v-yTq3EyFy7YENApKb_LAQn6HeE9yMbBHBOugU45q0pmGRgfpog6mdiIAB7aFluaKpxKnFx3ZoFkUCdsG1Q2seGl6p0Sj1gCugNZ_7SeSD45DXZyNnD0HgfDWeaUeioA3hq45m3efQ9VCOFdPbYUmPok1t-DRTwkDtLEH6w',
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
