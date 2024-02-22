type qcDefectConfigListResponses = {
	code: string // SUCCESS(成功) ERROR(通用失败) PARAM_ILLEGAL(参数异常) ……
	data: {
		list: {
			childDefectConfigList: any[] // 子级list <#/components/schemas/QcDefectConfigVo>
			defectCategory: string // 次品类别
			defectCode: string // 次品代码
			defectStatus: 'DISABLED' | 'ENABLED' // 次品配置状态:[枚举名:DefectStatus]ENABLED (启用) DISABLED (禁用)
			defectStatusRemark: string // 次品配置状态 Remark[自动生成]
			parentDefectConfigId: string // 父级id
			qcOrderDefectConfigId: string // 主键id
			version: number // 版本号
		}[] // undefined
	} // undefined
	errorDetail: any // undefined
	message: string // undefined
	source: string // undefined
	timestamp: number // undefined
}
