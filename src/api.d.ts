type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}

interface globalTS {
	stringify: (item: any) => string
}
declare const global: globalTS
