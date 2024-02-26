export class FormTableColumns extends BaseFormTableColumnsItem {
	data: []
	constructor() {
		super()
		this.setColumns([{ title: '序号', render: (item) => this.serialNumber(item), width: 100 }])
	}
}
