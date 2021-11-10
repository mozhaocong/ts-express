export const test: expressMethod = (req, res, next) => {
	res.json({
		status: 200,
		data: `apiFileTest`
	})
}
