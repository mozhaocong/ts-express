// 去除死循环
export function stringify(data: any) {
	// 声明cache变量，便于匹配是否有循环引用的情况
	let cache: any[] = []
	const str = JSON.stringify(data, function (key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// 移除
				return
			}
			// 收集所有的值
			cache.push(value)
		}
		return value
	})
	cache = []
	return str
}
