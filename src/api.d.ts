type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
	[key in Key]: Value
}
type expressMethod = (
	req: Request<any, any, any, QueryString.ParsedQs, Record<string, any>>,
	res: Response<any, Record<string, any>, number>,
	next?: NextFunction
) => void
