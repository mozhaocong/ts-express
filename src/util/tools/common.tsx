import { isTrue } from '@/utils'

export interface DebouncedFunc<T extends (...args: any[]) => any> {
	(...args: Parameters<T>): ReturnType<T> | undefined
}

// 节流
export function throttle<T extends (...args: any) => any>(func: T, wait = 500): DebouncedFunc<T> {
	let leading = true
	return function (this: void, ...args: Array<any>) {
		if (!leading) {
			return {}
		}
		leading = false
		setTimeout(() => {
			leading = true
		}, wait)
		return func.apply(this, args)
	}
}

//防抖
export function debounce<T extends (...arg: any[]) => any>(fn: T, wait = 500) {
	let timer: number | undefined
	return function (this: void, ...arg: Parameters<typeof fn>) {
		clearTimeout(timer)
		timer = window.setTimeout(() => {
			fn.apply(this, arg) // 把参数传进去
		}, wait)
	}
}

// RFrom表单组件 默认customRender方法
export const defaultCustomRender = ({ text }: { text: any }) => {
	return <div>{text}</div>
}

//table 序号
export const serialNumber = (
	{ index }: { index: number },
	data: { pageSize: { value: number }; current: { value: number } }
) => {
	let currentPageSize = 0
	if (isTrue(data)) {
		currentPageSize = ((data?.current?.value || 0) - 1) * (data?.pageSize?.value || 0)
		if (currentPageSize < 0) {
			currentPageSize = 0
		}
	}
	return index + 1 + currentPageSize
}
