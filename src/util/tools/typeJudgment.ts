import { is, isEmpty, isNil } from 'ramda'

export function isString(value: any): value is string {
	return is(String, value)
}

export function isNumber(value: any): value is number {
	return is(Number, value)
}
export function isArray(value: any): value is [] {
	return is(Array, value)
}
export function isObject(value: any): value is ObjectMap {
	return is(Object, value)
}

export function isTrue(value: any): boolean {
	return !(isEmpty(value) || isNil(value))
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(fn: any): fn is Function {
	return is(Function, fn)
}
