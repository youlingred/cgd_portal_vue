<template>
  <div>
    <cg-table ref="test" v-bind="$data"></cg-table>
    <!--<el-button @click="test">test</el-button>-->
  </div>
</template>
<script>
  import CgTable from '@/components/CgTable.vue'

  export default {
    components:{CgTable},
    data:function () {
      return {
        data:[],
        height:400,
        columns: [
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
        url:this.appConfig.api('testDylyListPage')
      };
    },
    props:{
    },
    methods:{
      test(){
        // console.log(this.$refs.test.selection);
      }
    }
  }
</script>
