type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}
