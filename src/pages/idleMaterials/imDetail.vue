<template>
  <div>
    <detail v-bind="detailData"/>
    <div class="tl" style="padding: 10px 20px">明细信息</div>
    <IvTable ref="table" v-bind="table"/>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'返回',type:'info',click:backFunc}]"/>

  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import IvTable from '@/components/IvTable.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      detail,
      IvTable,
      buttonsOperator
    },
    data() {
      return {
        type: this.$route.params.type,
        id: this.$route.params.id,
        formPurchase: {},
        formDeal: {},
        //列表数据
        table: {
          autoLoad: false,
          title: '明细信息',
          data: [],
          height: 400,
          columns: [],
          url: '',
          pageNo: 1,
        }
      };
    },
    computed: {
      detailData() {
        if (this.type == 1) {
          //FIXME 采购详情
            return {contents:[{
              data: this.formPurchase,
              header: '采购意向信息',
              labelWidth: '150px',
              inputWidth: '400px',
              children: [
                {
                  type: 'label',
                  label: '采购方',
                  prop: 'createCompanyName'
                },
                {
                  type: 'label',
                  label: '采购方联系人',
                  prop: 'contactName'
                },
                {
                  type: 'label',
                  label: '采购方联系电话',
                  prop: 'contactPhone',
                },
                {
                  type: 'label',
                  label: '业务状态',
                  prop: 'docStatusName'
                },
                {
                  type: 'label',
                  label: '创建时间',
                  prop: 'createTime',
                  formatter(value) {
                    return value === (null || '') ? '-' : this.moment(value).format("YYYY-MM-DD HH:mm:ss");
                  }
                },
                {
                  type: 'label',
                  label: '创建人',
                  prop: 'createUserName'
                },
              ]
            }]};
        } else if (this.type == 2) {
          //FIXME 处置采购详情
          return {contents:[
              {
                data: this.formDeal,
                header: '闲置物资处置信息',
                labelWidth: '150px',
                inputWidth: '400px',
                children: [
                  {
                    type: 'label',
                    label: '项目单位',
                    prop: 'purchaseAccountName'
                  },
                  {
                    type: 'label',
                    label: '标的物名称',
                    prop: 'subjectName'
                  },
                  {
                    type: 'label',
                    label: '处置单位联系人',
                    prop: 'dealOrgContactName',
                  },
                  {
                    type: 'label',
                    label: '处置单位联系电话',
                    prop: 'dealOrgContactTele'
                  },
                  {
                    type: 'label',
                    label: '提货地点',
                    prop: 'deliveryAddress'
                  },
                  {
                    type: 'file',
                    label: '附件',
                    prop: 'inquiryAttachmentBOs'
                  },
                  {
                    type: 'label',
                    label: '备注',
                    prop: 'remarks'
                  },
                ]
              },
            ]};
        }
      }
    },
    methods: {
      backFunc() {
        this.$router.push({name: 'idleMaterialsIndex'});
      },
      //FIXME 查询主单
      initForm() {
        if (this.type == 1) {
          this.axios.post(this.appConfig.api('inquiry/others/queryIdleGoodsIntentMasterSingleQuery'), {idleGoodsIntentId: this.id})
            .then(response => {
              this.formPurchase = response;
            }).catch(err=>{
            console.log(err)
          });
        }else if(this.type==2){
          this.axios.post(this.appConfig.api('inquiry/others/queryIqrIdleGoodsMasterSingle'), {idleGoodsId: this.id})
            .then(response => {
              this.formDeal = response;
            }).catch(err=>{
            console.log(err)
          });
        }
      },
      //FIXME 查询明细
      initTable() {
        //FIXME 采购明细
        if (this.type == 1) {
          this.table.url = this.appConfig.api('inquiry/others/queryIqrGoodsIntentItemByIdleGoodsIntentId');
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              align: 'center',
              width: 80
            },
            {
              title: '物料编码',
              key: 'materialId',
              align: 'center',
              width: 150,
            },
            {
              title: '物料名称',
              key: 'materialName',
              align: 'center',
              width: 150,
            },
            {
              title: '物资分类',
              key: 'materialClassName',
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
              title: '图号',
              key: 'figureNo',
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
              title: '材质',
              key: 'materialsQuality',
              align: 'center',
              width: 100,
            },
            {
              title: '品牌',
              key: 'brand',
              align: 'center',
              width: 100,
            },
            {
              title: '生产厂家',
              align: 'center',
              key: 'manufacturer',
              width: 150,
            },
            {
              title: '计量单位',
              align: 'center',
              key: 'measurementUnit',
              width: 100,
            },
            {
              title: '处置数量',
              align: 'center',
              key: 'disposeNum',
              width: 150,
            },
            {
              title: '销售单价（元）',
              key: 'salesPrice',
              width: 180
            },
            {
              title: '采购意向数量',
              key: 'purchaseNum',
              width: 150
            }
          ];
          this.$refs.table.query({url: this.table.url,idleGoodsIntentId: this.id});
        } else if (this.type == 2) {
          //FIXME 处置明细
          this.table.url = this.appConfig.api('inquiry/others/queryIdleGoodsDetailedInfo');
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              align: 'center',
              width: 80
            },
            {
              title: '物料编码',
              key: 'materialId',
              align: 'center',
              width: 150,
            },
            {
              title: '物料名称',
              key: 'materialName',
              align: 'center',
              width: 150,
            },
            {
              title: '物资分类',
              key: 'materialClassName',
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
              title: '图号',
              key: 'figureNo',
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
              title: '材质',
              key: 'materialsQuality',
              align: 'center',
              width: 100,
            },
            {
              title: '品牌',
              key: 'brand',
              align: 'center',
              width: 100,
            },
            {
              title: '生产厂家',
              align: 'center',
              key: 'manufacturer',
              width: 150,
            },
            {
              title: '计量单位',
              align: 'center',
              key: 'measurementUnit',
              width: 100,
            },
            {
              title: '处置数量',
              align: 'center',
              key: 'disposeNum',
              width: 150,
            },
            {
              title: '销售单价（元）',
              key: 'salesPrice',
              width: 180
            },
            {
              title: '剩余库存数量',
              key: 'inventoryNum',
              width: 150
            },
            {
              title: '已售数量',
              key: 'soldNum',
              width: 150
            }
          ];
          this.$refs.table.query({url: this.table.url,idleGoodsId: this.id});
        }
      },

    },
    mounted() {
      this.initForm();
      this.initTable();
    }

  };
</script>

<style scoped>
  .footerdiv {
    height: 45px;
    line-height: 42px;
    margin: 10px 0 30px 0;
    text-align: center;
    border-top: 3px solid #acacac;
    background-color: #e5e5e5;
  }
</style>
