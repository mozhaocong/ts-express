export const objectFuzzyQuery: (key: string, sourceData: ObjectMap<string, ObjectMap>) => Array<any> = (
	key,
	sourceData
) => {
	const returnData = []
	for (const i in sourceData) {
		console.log('i', i, key)
		if (i.includes(key)) {
			returnData.push({ key: i, data: sourceData[i] })
		}
	}
	return returnData
}
