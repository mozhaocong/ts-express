export function defaultResJson({ data, code = 0, msg }: { data: any; code?: number; msg?: string }) {
	return {
		code: code,
		data: data,
		msg: msg
	}
}
