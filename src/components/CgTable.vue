<template>
  <div style="background-color:#f3f3f3">
    <div v-show="header" class="table-header">
      <span>{{header}}</span>
    </div>
    <el-table ref="table" :data="m_data"
              :height="height"
              @cell-click="cellClickHandler"
              @selection-change="handleSelectionChange"
              border>
      <el-table-column align="center" v-for="item in columns"
                       :key="item.index"
                       v-bind="item"
      ></el-table-column>
    </el-table>
    <el-pagination v-show="pagination" background class="tr"
                   @current-change="handleChangePageNo"
                   :current-page="m_query.pageNo"
                   :page-size="m_query.pageSize"
                   layout="total, prev, pager, next, jumper"
                   :total="m_total" style="padding:10px 20px">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    //组件入参
    props: {
      autoLoad:{
        type:Boolean,
        default:true
      },
      //表格标题
      header:{
      },
      //表格高度
      height: {
        type: [Number, String]
      },
      //是否使用翻页组件
      pagination: {
        type: Boolean,
        default: true
      },
      //当前页数
      pageNo: {
        type: Number,
        default: 1
      },
      //每页显示数据条数
      pageSize: {
        type: Number,
        default: 10,
      },
      //列表头定义数组
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      //列表数据，目前只是用url远程获取数据，此参数暂时保留不使用
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      //请求地址
      url: {
        type: String
      },
      //查询回到函数,可以在查询操作中插入请求搜索条件
      queryParam: {
        type: Function
      },
      //数据获取回到函数,可以做数据处理
      responseHandler: {
        type: Function
      }
    },
    data() {
      return {
        //列表数据
        m_data: this.data,
        //当前页
        m_pageNo: this.pageNo,
        //每页数据条数
        m_pageSize: this.pageSize,
        //数据总数
        m_total: 0,
        //选中数据
        m_selection: [],
        //请求地址
        m_url:this.url,
        //请求参数
        m_query: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      };
    },
    computed: {
      table(){
        return this.$refs.table;
      },
      //获取全部选中数据
      selection() {
        return this.m_selection;
      },
      //获取全部数据
      all() {
        return this.m_data;
      }
    },
    methods: {
      //请求数据，入参会保存为请求条件
      query(arg) {
        return new Promise((resolve, refect) => {
          let param = _.assign(this.m_query, arg||{},{url:this.m_url})
          console.log(param)
          if (param.url && param.url !== '') {
            this.m_url = param.url;
            delete param.url;
            if (this.queryParam) {
              param = this.queryParam(param);
            }
            console.log('query param:', param);
            this.axios.post(this.m_url, param)
              .then((response) => {
                console.log();
                if (response.data.respCode === '0000') {
                  let result = response.data.data;
                  console.log(result);
                  if (this.responseHandler) {
                    result = this.responseHandler(result);
                  }
                  this.m_data = result.rows;
                  this.m_total = result.recordsTotal;
                  resolve(result.rows)
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
      },
      //翻页处理函数
      handleChangePageNo(val) {
        this.m_pageNo = val;
        this.query({pageNo: this.m_pageNo}).then((data) => {
          this.m_data = data;
          console.log('handleChangePageNo data:',data)
        })
        //let allData=[];
        //let block = this.pageSize * val;
        // this.m_data = _.slice(allData,block - this.pageSize, block - 1);
      },
      //选项数据改变处理函数
      handleSelectionChange(val) {
        this.m_selection = val;
        this.$emit('selectionChange',this.m_selection)
      },
      cellClickHandler(row, column, cell, event){
        this.$emit('cell-click',row,column,cell)
      }
    },
    created() {
      if(this.autoLoad){
        this.query();
      }
    }
  }
</script>
<style scoped>
  .table-header{
   font-size: 16px;
    margin: 10px;
  }
</style>
