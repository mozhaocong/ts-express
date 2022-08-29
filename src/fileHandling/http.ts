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
				'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTY1NjU4NTk4NiwidXVpZCI6ImJlYmE2MmU3LTA4NzQtNDYzOS1hZDdlLTAzMjVlMWIwODc4OCIsIndlYklkZW50aWZ5IjoiYWRtaW4ifQ.S-W0njdsRUD37Tgv2FPExY-TOCO2LYDWLdifRFAvHkR1uXTQCMn2dm-qDjN0x3Mm5r7oSTFXt5wd75jh7bMnY-cUDpuJIfIHtlQpXG_bmdddtT0wxeumKjRaBnxZK4UMHPyciLcwCngN3ET6vd7XSfb_2jM8jZCrDQbiZnOUR8UlRuptqgcva3JBL8eKX05jmY7DCpnDmmy7VGxGyvhbAwWfOEM8lX6cgwugBxggcsepHrfwaqg8_vMKCtIaWOAT_IPa1efNP3ziqzkpKc1nPV7-0Qqw_tSnpjZnLQNshNj_X4VqNL1VrmHVKToFPFQU6p4aO9bk7xAhMLUXqFVktw',
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
