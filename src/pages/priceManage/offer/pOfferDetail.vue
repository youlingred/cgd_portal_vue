<template>
  <div>
    <detail ref="baseInfo" v-bind="detailData"/>
    <IvTable ref="table" auto-load="false" v-bind="table"/>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="this.operateButtons"/>


  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'
  import IvTable from '@/components/IvTable.vue'

  export default {
    name: "clarify-review-edit",
    components: {
      IvTable,
      detail,
      buttonsOperator
    },
    data() {
      return {
        //状态 0 待报价 1 已报价
        status: this.$route.params.status,
        //类型 1,物资 2,施工 3,服务
        type: this.$route.params.type,
        //报价单ID
        quotationId: this.$route.params.id,
        //FIXME 基本信息初始化定义,并初始化毕传校验参数
        form: {
          supplierContactName: '',
          supplierContactTele: 0,
          deliveryDatePromise: '',
          attchmentInfo2: [],
          attchmentInfo3: [],
          attchmentInfo4: [],
        },
      };
    },
    computed: {
      operateButtons() {
        if (this.status == 0) {
          //待报价详情包含所有功能按钮
          return [{label: '保存', type: 'primary', click: this.save}, {
            label: '提交',
            type: 'primary',
            click: this.sumbit
          }, {label: '发起澄清', type: 'primary', click: this.fire}, {label: '返回', type: 'info', click: this.back}]
        } else if (this.status == 1) {
          //已报价详情去掉保存和提交
          return [{label: '撤回', type: 'danger', click: this.revoke}, {
            label: '发起澄清',
            type: 'primary',
            click: this.fire
          }, {label: '返回', type: 'info', click: this.back}];
        }
        return [];
      },
      //FIXME 初始化基本信息显示数据
      detailData() {
        return {
          contents: [
            {
              header: '基本信息',
              data: this.form,
              labelWidth: '200px',
              inputWidth: '400px',
              children: [
                {
                  type: 'label',
                  label: '采购编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: 'inquiryName',
                },
                {
                  type: 'label',
                  label: '供应商',
                  prop: 'supplierName',
                },
                {
                  type: this.status == 0 ? 'input' : 'label',
                  label: '供应商联系人',
                  placeholder: '请输入',
                  prop: 'supplierContactName',
                },
                {
                  type: this.status == 0 ? 'input' : 'label',
                  label: '供应商联系电话',
                  placeholder: '请输入',
                  prop: 'supplierContactTele',
                },
                {
                  type: 'label',
                  label: '配送中心',
                  prop: 'professionalOrgName',
                },
                {
                  type: 'label',
                  label: '配送中心-联系人',
                  prop: 'purchaserName',
                },
                {
                  type: 'label',
                  label: '配送中心-联系方式',
                  prop: 'purchaserTele',
                },
                {
                  type: 'label',
                  label: '配送方式',
                  prop: 'logisticsDistrWayName',
                },

                {
                  type: 'label',
                  label: '交货日期',
                  prop: 'deliveryDate',
                  formatter: (value) => {
                    return value ? this.moment(value).format('YYYY-MM-DD') : '';
                  }
                },
                {
                  type: 'label',
                  label: '报价截止日期',
                  prop: 'quoteEndDate',
                  formatter: (value) => {
                    return value ? this.moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
                  }
                },
                {
                  type: 'label',
                  label: '报价类别',
                  prop: 'quoteTypeName',
                },
                {
                  type: 'label',
                  label: '报价方式',
                  prop: 'quoteMethodName',
                },
                {
                  type: this.status == 0 ? 'datePicker' : 'label',
                  label: '承诺交货日期',
                  placeholder: '请选择承诺交货日期',
                  prop: 'deliveryDatePromise',
                  formatter: (value) => {
                    return value ? this.moment(value).format('YYYY-MM-DD') : '';
                  },
                  extendParam: {
                    editable: false,
                    valueFormat: 'timestamp',
                    format: 'yyyy-MM-dd',
                    pickerOptions: {
                      disabledDate: time => {
                        return time.getTime() < Date.now()
                      }
                    }
                  }
                },
                {
                  type: 'label',
                  label: '质保期（月）',
                  prop: 'guaranteePeriodName',
                },
                {
                  type: 'label',
                  label: '支付方式',
                  prop: 'payTypeName',
                },
                {
                  type: 'label',
                  label: '币种',
                  prop: 'currencyName',
                },
                {
                  type: 'label',
                  label: '付款方式',
                  prop: 'planName',
                  formatter: (value, data) => {
                    let result = "";
                    if (data.prePay != 0) {
                      result += '预付款:' + data.prePay + '% ';
                    }
                    if (data.matPay != 0) {
                      result += '投料款:' + data.matPay + '% ';
                    }
                    if (data.proPay != 0) {
                      result += '进度款:' + data.proPay + '% ';
                    }
                    if (data.verPay != 0) {
                      result += '到货验收款:' + data.verPay + '% ';
                    }
                    if (data.pilPay != 0) {
                      result += '试运验收款:' + data.pilPay + '% ';
                    }
                    if (data.quaPay != 0) {
                      result += '质保金:' + data.quaPay + '% ';
                    }
                    return result;
                  }
                },
                {
                  type: 'label',
                  label: '税率（%）',
                  prop: 'taxRate',
                  formatter(value) {
                    return value + '%'
                  }
                },
                {
                  type: 'label',
                  label: '报价总金额',
                  prop: 'amount',
                  formatter(value) {
                    return this.accounting.formatMoney(value, '', 2);
                  }
                },
                {
                  type: 'label',
                  // switchFlag:
                  label: '成交服务费率',
                  prop: 'serviceChargeAmount',
                  formatter(value) {
                    return this.accounting.formatMoney(value, '', 2);
                  }
                },
                {
                  type: 'label',
                  // switchFlag:
                  label: '成交服务费率',
                  prop: 'serviceChargeRateName',
                },
                {
                  type: 'label',
                  label: '采购类型',
                  prop: 'purchaseTypeName',
                },
                {
                  type: 'label',
                  label: '备注',
                  prop: 'remarks',
                },
                {
                  type: this.status == 0 ? 'textarea' : 'label',
                  label: '报价说明',
                  prop: 'quoteExplain',
                  extendParam: {
                    autosize: {minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: this.status == 0 ? 'upload' : 'file',
                  label: '技术文件',
                  prop: 'attchmentInfo3',
                  extendParam: {
                    beforeRemove: this.beforeRemove,
                    action: this.appConfig.api('', 'upload'),
                    tip: ''
                  }
                },
                {
                  type: this.status == 0 ? 'upload' : 'file',
                  label: '商务文件',
                  prop: 'attchmentInfo2',
                  extendParam: {
                    beforeRemove: this.beforeRemove,
                    action: this.appConfig.api('', 'upload'),
                    tip: ''
                  }
                },
                {
                  type: this.status == 0 ? 'upload' : 'file',
                  label: '其他附件',
                  prop: 'attchmentInfo4',
                  extendParam: {
                    beforeRemove: this.beforeRemove,
                    action: this.appConfig.api('', 'upload'),
                    tip: ''
                  }
                }
              ],
              rules: this.status == 0 ? {
                supplierContactName: [
                  {required: true, message: '请输入供应商联系人', trigger: 'blur'},
                ],
                supplierContactTele: [
                  {required: true, message: '请输入供应商联系电话', trigger: 'blur'},
                  // {type: 'number',max:11,message: '电话号码必须为数字值且最多为11位', trigger: 'blur'},
                ],
                deliveryDatePromise: [
                  {required: true, message: '请选择 ', trigger: 'blur'},
                ],
                // attchmentInfo2: [
                //   {required: true, message: '请上传商务文件', trigger: 'blur'},
                // ],
              } : {}
            }
          ]
        }
      },
      //FIXME 初始化明细信息显示数据
      table() {
        //根据type采购类别
        switch (Number.parseInt(this.type)) {
          //FIXME 物资类
          case 1:
            return {
              header: '明细信息',
              height: 400,
              url: this.appConfig.api('inquiry/quote/qryIqrQuoteMateriaItemList'),
              // url: this.appConfig.api('Materials'),
              columns: [
                {
                  title: '序号',
                  type: 'index',
                  align: 'center',
                  width: 80
                },
                {
                  title: '项目单位',
                  key: 'purchaseAccountName',
                  align: 'center',
                  width: 120,
                },
                {
                  title: '物资分类',
                  key: 'materialClassName',
                  align: 'center',
                  width: 120,
                },
                {
                  title: '物料编码',
                  key: 'materialId',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '物料名称',
                  key: 'materialName',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '型号',
                  key: 'model',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '规格',
                  key: 'spec',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '图号',
                  key: 'figureNo',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '材质',
                  key: 'materialsQuality',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '安装位置',
                  key: 'installPosition',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '原生产厂家',
                  key: 'originalManufacturer',
                  align: 'center',
                  width: 150,
                },
                {
                  title: '品牌',
                  key: 'brand',
                  align: 'center',
                  width: 150,
                  render: (h, {row, column, index}) => {
                    //根据sataus判断是否显示输入框
                    if (Number.parseInt(this.status) === 0) {
                      return h('Input', {
                          props: {
                            placeholder: '请输入品牌',
                            value: row.brand,
                          },
                          nativeOn: {
                            change: event => {
                              //监听输入框值变化改变table数据,
                              // 因为row为数据拷贝副本改变row的值不会改变table数据的值
                              this.$refs.table.all[index].brand = event.target.value
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', row.brand)
                    }
                  }
                },
                {
                  title: '生产厂家',
                  key: 'manufacturer',
                  align: 'center',
                  width: 150,
                  render: (h, {row, column, index}) => {
                    if (Number.parseInt(this.status) === 0) {
                      return h('Input', {
                          props: {
                            placeholder: '请输入生产厂家',
                            value: row.manufacturer,
                          },
                          nativeOn: {
                            change: event => {
                              //同上
                              this.$refs.table.all[index].manufacturer = event.target.value
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', row.manufacturer)
                    }
                  }
                },
                {
                  title: '采购数量',
                  key: 'purchaseNum',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '计量单位',
                  key: 'unitName',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '报价单价(元)',
                  key: 'quotePrice',
                  align: 'center',
                  width: 100,
                  render: (h, {row, column, index}) => {
                    if (Number.parseInt(this.status) === 0) {
                      return h('Input', {
                          props: {
                            placeholder: '报价单价',
                            value: row.quotePrice,
                          },
                          nativeOn: {
                            change: event => {
                              this.priceChange(index, row, event.target.value);
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', this.accounting.formatMoney(row.quotePrice, '', 2));
                    }
                  }
                },
                {
                  title: '报价总价(元)',
                  key: 'quoteAmount',
                  align: 'center',
                  width: 100,
                  render: (h, {row, column}) => {
                    return h('div', this.accounting.formatMoney(row.quoteAmount, '', 2));
                  }
                },
                {
                  title: '承诺交货日期',
                  key: 'deliveryDatePromise',
                  align: 'center',
                  width: 180,
                  render: (h, {row, column, index}) => {
                    if (Number.parseInt(this.status) === 0) {
                      return h('DatePicker', {
                          props: {
                            placeholder: '请选择日期',
                            clearable: false,
                            value: row.deliveryDatePromise ? this.moment(row.deliveryDatePromise).format('YYYY-MM-DD') : '',
                            editable: false,
                            format: 'yyyy-MM-dd',
                            options: {
                              disabledDate: time => {
                                return time.getTime() < Date.now()
                              }
                            }
                          },
                          on: {
                            "on-change": value => {
                              this.$refs.table.all[index].deliveryDatePromise = this.moment(value).format('YYYY-MM-DD');
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', this.moment(row.deliveryDatePromise).format('YYYY-MM-DD') || '');
                    }
                  }
                }
              ]
            }
          //FIXME 施工类
          case 2:
            return {
              header: '明细信息',
              height: 400,
              url: this.appConfig.api('inquiry/quote/qryIqrQuoteConstructionItemList'),
              // url: this.appConfig.api('Materials'),
              columns: [
                {
                  title: '序号',
                  type: 'index',
                  align: 'center',
                  width: 80
                },
                {
                  title: '项目单位',
                  key: 'purchaseAccountName',
                  align: 'center',
                  width: 120,
                },
                {
                  title: '项目名称',
                  key: 'projectName',
                  align: 'center',
                  width: 120,
                },
                {
                  title: '计量单位',
                  key: 'unitName',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '数量',
                  key: 'purchaseNum',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '报价单价(元)',
                  key: 'quotePrice',
                  align: 'center',
                  width: 100,
                  render: (h, {row, column, index}) => {
                    if (Number.parseInt(this.status) === 0) {
                      return h('Input', {
                          props: {
                            placeholder: '报价单价',
                            value: row.quotePrice,
                          },
                          nativeOn: {
                            change: event => {
                              this.priceChange(index, row, event.target.value);
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', this.accounting.formatMoney(row.quotePrice, '', 2));
                    }
                  }
                },
                {
                  title: '报价总价(元)',
                  key: 'quoteAmount',
                  align: 'center',
                  width: 100,
                  render: (h, {row, column}) => {
                    return h('div', this.accounting.formatMoney(row.quoteAmount, '', 2));
                  }
                },
                {
                  title: '施工完成日期',
                  key: 'deliveryDatePromise',
                  align: 'center',
                  width: 180,
                  render: (h, {row, column}) => {
                    if (Number.parseInt(this.status) === 0) {
                      return h('DatePicker', {
                          props: {
                            placeholder: '请选择日期',
                            clearable: false,
                            value: row.deliveryDatePromise ? this.moment(row.deliveryDatePromise).format('YYYY-MM-DD') : '',
                            editable: false,
                            format: 'yyyy-MM-dd',
                            options: {
                              disabledDate: time => {
                                return time.getTime() < Date.now()
                              }
                            }
                          },
                          on: {
                            "on-change": value => {
                              this.$refs.table.all[index].deliveryDatePromise = this.moment(value).format('YYYY-MM-DD');
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', this.moment(row.deliveryDatePromise).format('YYYY-MM-DD') || '');
                    }
                  }
                }
              ]
            }
          //FIXME 服务类
          case 3:
            return {
              header: '明细信息',
              height: 400,
              url: this.appConfig.api('inquiry/quote/qryIqrQuoteServItemList'),
              // url: this.appConfig.api('Materials'),
              columns: [
                {
                  title: '序号',
                  type: 'index',
                  align: 'center',
                  width: 80
                },
                {
                  title: '项目单位',
                  key: 'purchaseAccountName',
                  align: 'center',
                  width: 120,
                },
                {
                  title: '内容描述',
                  key: 'docDesc',
                  align: 'center',
                  width: 150,
                },
                {
                  title: '计量单位',
                  key: 'unitName',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '数量',
                  key: 'purchaseNum',
                  align: 'center',
                  width: 100,
                },
                {
                  title: '报价单价(元)',
                  key: 'quotePrice',
                  align: 'center',
                  width: 100,
                  render: (h, {row, column, index}) => {
                    if (Number.parseInt(this.status) === 0) {
                      return h('Input', {
                          props: {
                            placeholder: '报价单价',
                            value: row.quotePrice,
                          },
                          nativeOn: {
                            change: event => {
                              this.priceChange(index, row, event.target.value);
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', this.accounting.formatMoney(row.quotePrice, '', 2));
                    }
                  }
                },
                {
                  title: '报价总价(元)',
                  key: 'quoteAmount',
                  align: 'center',
                  width: 100,
                  render: (h, {row, column}) => {
                    return h('div', this.accounting.formatMoney(row.quoteAmount, '', 2));
                  }
                },
                {
                  title: '服务完成日期',
                  key: 'deliveryDatePromise',
                  align: 'center',
                  width: 180,
                  render: (h, {row, column}) => {
                    if (Number.parseInt(this.status) === 0) {
                      return h('DatePicker', {
                          props: {
                            placeholder: '请选择日期',
                            clearable: false,
                            value: row.deliveryDatePromise ? this.moment(row.deliveryDatePromise).format('YYYY-MM-DD') : '',
                            editable: false,
                            format: 'yyyy-MM-dd',
                            options: {
                              disabledDate: time => {
                                return time.getTime() < Date.now()
                              }
                            }
                          },
                          on: {
                            "on-change": value => {
                              this.$refs.table.all[index].deliveryDatePromise = this.moment(value).format('YYYY-MM-DD');
                            }
                          }
                        }
                      )
                    } else {
                      return h('span', this.moment(row.deliveryDatePromise).format('YYYY-MM-DD') || '');
                    }
                  }
                }
              ]
            }
          default:
            return [];
        }
      }
    },
    watch: {
      //监听基本信息中承诺交货日期的变化改变明细信息中 所有此字段数据
      'form.deliveryDatePromise': function (val) {
        {
          _.forEach(this.$refs.table.all, value => value.deliveryDatePromise = val);
        }
      }
    },
    methods: {
      //FIXME 查询基本信息
      queryDetail() {
        console.log(this);
        this.axios.post(this.appConfig.api('inquiry/quote/qryIqrQuoteDetail'), {quotationId: this.quotationId})
        // this.axios.post(this.appConfig.api('testcommen'), {quotationId: this.quotationId})
          .then(data => {
            this.form = this.util.dataAdapter(data, ['attachmentName', 'attachmentUrl'], ['name', 'url'],)
            this.$nextTick(() => {
                this.$refs.baseInfo.forms[0].clearValidate();
              }
            );
            this.queryList();
          }).catch(() => {
        });
      },
      //FIXME 查询明细信息
      queryList() {
        this.$refs.table.query({url: this.table.url, quotationId: this.quotationId, pageSize: 1000})
      },
      //报价单价改变
      priceChange(index, row, targetValue) {
        this.$refs.table.all[index].quotePrice = targetValue;
        this.$refs.table.all[index].quoteAmount = targetValue * row.purchaseNum;
        this.form.amount = 0;
        this.$refs.table.all.forEach(item => {
          this.form.amount += item.quoteAmount;
        })
      },
      //FIXME 撤回
      revoke() {
        this.$confirm('此操作将撤回报价单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post(this.appConfig.api('inquiry/quote/iqrQuoteWithdraw'), {quotationId: this.form.quotationId})
            .then(response => {
              this.$message({
                type: 'success',
                message: '成功撤回报价单!'
              });
              this.back();
            }).catch(() => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回'
          });
        });

      },
      //FIXME 保存
      save() {
        this.validateSucess('save');
      },
      //FIXME 提交
      sumbit() {
        this.validateBaseInfo('sumbit');
      },
      //FIXME 校验基本信息
      validateBaseInfo(type) {
        this.$refs.baseInfo.forms[0].validate((valid) => {
          if (valid) {
            if (this.form.quoteMethod == 1) {
              this.validateList(type);
            } else {
              this.validateSucess(type);
            }
          } else {
            this.$alert('您还有未报价的物料，请报价后提交。', '提示');
          }
        });
      },
      //FIXME 校验明细信息
      validateList(type) {
        const list = this.$refs.table.all;
        let validate = true;
        _.every(list, value => {
          if (value && value.quotePrice>0 && value.deliveryDatePromise) {
            if(!_.isNaN(value.quotePrice)){
              return true
            }
            return false
          } else {
            validate = false;
            return validate = false;
          }
        })
        if (validate) {
          this.validateSucess(type);
        } else {
          this.$alert('您还有未报价的物料，请报价后提交。', '提示');
        }
      },
      //FIXME 校验全部通过
      validateSucess(type) {
        //处理化基本信息数据
        this.form = this.util.dataAdapter(this.form, ['name', 'url'], ['attachmentName', 'attachmentUrl'])
        //待提交数据整合
        let sumbitData = {};
        _.assign(sumbitData, this.form, {quotationItemJSON: this.$refs.table.all});
        //获取需要传递的参数
        sumbitData = _.pick(sumbitData, [
          'quotationId',
          'supplierContactName',
          'supplierContactTele',
          'deliveryDatePromise',
          'quoteExplain',
          'quotationItemJSON',
          'attchmentInfo1',
          'attchmentInfo2',
          'attchmentInfo3',
          'attchmentInfo4']);

        sumbitData.deliveryDatePromise && (sumbitData.deliveryDatePromise = this.moment(sumbitData.deliveryDatePromise).format('YYYY-MM-DD'))
        _.forEach(sumbitData.quotationItemJSON, value => {
          value.deliveryDatePromise && (value.deliveryDatePromise = this.moment(value.deliveryDatePromise).format('YYYY-MM-DD'))
        })

        //JSON字符化数组数据
        _.forEach(sumbitData, (value, key) => {
          if (_.isArray(value)) {
            sumbitData[key] = JSON.stringify(value);
          }
        });
        console.log(sumbitData);
        let url;
        if (type === 'sumbit') {
          url = 'inquiry/quote/submitIqrQuote'
        } else if (type === 'save') {
          url = 'inquiry/quote/saveIqrQuote'
        }
        ;
        this.axios.post(this.appConfig.api(url), sumbitData)
          .then(response => {
            console.log(response);
            this.back(type);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //FIXME 发起澄清
      fire() {
        this.$router.push({
          name: 'clarifyOfferEdit',
          query: {
            inquiryId: this.form.inquiryId,
            inquiryName: this.form.inquiryName,
            iqrSeq: this.form.iqrSeq,
            purchaseCategory: this.form.purchaseCategory
          }
        });
      },
      back(type) {
        console.log(type)
        if (this.$route.query.priceType === 'offer') {
          if (type === 'save') {
            this.$router.push({name: 'priceOfferIndex', query: {tab: 1}})
          } else if (type === 'sumbit') {
            this.$router.push({name: 'priceOfferIndex', query: {tab: 2}})
          }
        } else if (this.$route.query.priceType === 'bid') {
          if (type === 'save') {
            this.$router.push({name: 'priceBindIndex', query: {tab: 1}})
          } else if (type === 'sumbit') {
            this.$router.push({name: 'priceBindIndex', query: {tab: 2}})
          }
        }
      },
      //FIXME 附件操作
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    },
    //FIXME 组件创建,初始化数据
    mounted() {
      this.queryDetail();
    },
    created() {
    }
  }
</script>
