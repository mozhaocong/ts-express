export class FormTableColumns extends BaseFormTableColumnsItem {
	constructor() {
		super()
		this.setColumns([
			{
				title: '序号',
				render: (item) => this.serialNumber(item),
				width: 100
			}
		])
	}
}
