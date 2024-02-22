export const data = {
	scm: {
		scm: {
			qcConfig: {
				qcDefectConfigList: {
					post: {
						data: {
							tags: ['质检'],
							summary: '次品原因配置列表',
							operationId: 'qcDefectConfigListUsingPOST',
							responses: {
								'200': {
									description: 'OK',
									content: {
										'*/*': {
											schema: {
												$ref: '#/components/schemas/CommonResult«ResultList«QcDefectConfigVo»»'
											}
										}
									}
								},
								'201': {
									description: 'Created'
								},
								'401': {
									description: 'Unauthorized'
								},
								'403': {
									description: 'Forbidden'
								},
								'404': {
									description: 'Not Found'
								}
							},
							security: [
								{
									Authorization: ['global']
								}
							]
						},
						responsesData: {
							'200': {
								route: ['content', '*/*', 'schema'],
								data: [
									{
										description: 'SUCCESS(成功) ERROR(通用失败) PARAM_ILLEGAL(参数异常) ……',
										key: 'code',
										type: 'string'
									},
									{
										$ref: '#/components/schemas/ResultList«QcDefectConfigVo»',
										key: 'data'
									},
									{
										key: 'errorDetail',
										type: 'any'
									},
									{
										key: 'message',
										type: 'string'
									},
									{
										key: 'source',
										type: 'string'
									},
									{
										format: 'int64',
										key: 'timestamp',
										type: 'number'
									}
								]
							}
						},
						requestBodyData: {},
						path: '/scm/scm/qcConfig/qcDefectConfigList',
						requestBodyType: '',
						responsesType:
							"type qcDefectConfigListResponses = {\n\t code: string,// SUCCESS(成功) ERROR(通用失败) PARAM_ILLEGAL(参数异常) ……\n\t\t\tdata: {list: {childDefectConfigList: any[],// 子级list <#/components/schemas/QcDefectConfigVo>\n\t\t\tdefectCategory: string,// 次品类别\n\t\t\tdefectCode: string,// 次品代码\n\t\t\tdefectStatus: 'DISABLED'|'ENABLED',// 次品配置状态:[枚举名:DefectStatus]ENABLED (启用) DISABLED (禁用) \n\t\t\tdefectStatusRemark: string,// 次品配置状态 Remark[自动生成]\n\t\t\tparentDefectConfigId: string,// 父级id\n\t\t\tqcOrderDefectConfigId: string,// 主键id\n\t\t\tversion: number,// 版本号\n\t\t\t}[],// undefined\n\t\t\t},// undefined\n\t\t\terrorDetail: any,// undefined\n\t\t\tmessage: string,// undefined\n\t\t\tsource: string,// undefined\n\t\t\ttimestamp: number,// undefined\n\t\t\t\n\t}"
					}
				}
			}
		}
	}
}
