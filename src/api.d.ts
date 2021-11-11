// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./typeTs/index/ts" />
type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}
