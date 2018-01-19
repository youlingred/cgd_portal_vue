<template>
  <div>
    <detail v-bind="searchData">
      <buttons-operator type="top"
                        algin="left"
                        :switchBtn="{handler:switchHandler,open:showHide}"
                        :buttons="[{label:'搜索',type:'primary',click:search},{label:'重置',type:'info',click:reset}]"/>
    </detail>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'导出',type:'primary',click:search}]"/>
    <cg-table v-show="showHide" ref="test" v-bind="table"></cg-table>
  </div>
</template>
<script>
  import CgTable from '@/components/CgTable.vue'
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      CgTable,
      detail,
      buttonsOperator
    },
    data: function () {
      return {
        showHide:true,
        searchForm:{},
        table:{
          url: this.appConfig.api('testDylyListPage'),
          pageNo: 1,
          height: 400,
          queryParam:function(param){
            console.log('queryParam:',param)
            return _.assign({test:1},param);
          },
          responseHandler:function(val){
            console.log('responseHandler:',val)
            return val;
          },
          columns: [
            {
              type: 'selection',
              width: 80
            },
            {
              label: '序号',
              type: 'index',
              width: 80
            },
            {
              label: '计划名称',
              prop: 'planName'
            },
            {
              label: '发布人',
              prop: 'publishUser'
            },
            {
              label: '公告发布时间',
              prop: 'publishDate',
              formatter: (row, column, value) => {
                return this.moment(value).format("YY-MM-DD HH:mm:ss");
              }
            },
            {
              label: '异议提出时间',
              prop: 'objectionDate',
              formatter: (row, column, value) => {
                return this.moment(value).format('YY-MM-DD HH:mm:ss');
              }
            },
            {
              label: '受理状态',
              prop: 'status',
              formatter: function (row, column, value) {
                switch (value) {
                  case 1:
                    return '处理中';
                    break;
                  case 2:
                    return '已受理';
                    break;
                  case 3:
                    return '驳回';
                    break;
                }
              }
            }
          ],
        }

      };
    },
    props: {},
    computed:{
      searchData(){
        return {
          contents:[
            {
              data:this.searchForm,
              labelWidth:'100px',
              inputWidth:'200px',
              inline:true,
              children:[
                {
                  type: 'input',
                  label: '计划名称',
                  placeholder: '请输入计划名称',
                  prop: 'planName',
                },
                {
                  type: 'input',
                  label: '发布人',
                  placeholder: '请输入发布人',
                  prop: 'publishUser',
                },
                {
                  type: 'dateTimePicker',
                  label: '发布时间',
                  placeholder: '请输入发布时间',
                  prop: 'publishDate',
                  extendParam:{
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'select',
                  label: '处理状态',
                  placeholder: '请选择处理状态',
                  prop: 'status',
                  extendParam:{
                    options: [
                      {
                        value: 1,
                        label: '处理中'
                      },
                      {
                        value: 2,
                        label: '已受理'
                      },
                      {
                        value: 3,
                        label: '驳回'
                      }
                    ]
                  }
                },
              ]
            }
          ]}
      }
    },
    methods: {
      switchHandler(value){
        this.showHide=value
      },
      search() {
        this.$refs.test.query({searchInput:'inputConditions'});
        // this.columns[0].label = '111';
        // console.log(this.$refs.test.all)
        // console.log(this.$refs.test.selection)
        // console.log(this.$refs.test.selection);
      },
      reset(){

      }
    }
  }
</script>
