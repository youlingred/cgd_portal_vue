<template>
  <div style="background-color:#f3f3f3">
    <div v-show="header" class="table-header">
      <span>{{header}}</span>
    </div>
    <Table ref="table" border v-bind="$props" :data="m_data" @on-row-click="rowClickHandler" @on-selection-change="handleSelectionChange"></Table>
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
      autoLoad: {
        type: [Boolean,String],
        default: true
      },
      //表格标题
      header: {},
      //表格高度
      height: {
        type: [Number, String]
      },
      //是否使用翻页组件
      pagination: {
        type: Boolean,
        default: true
      },
      //设置在哪里进行分页，可选值为 'client' 或者 'server',默认''。设置 'server'时，必须设置 服务器数据地址（url）或者重写ajax方法
      sidePagination:{
        type:String,
        default:'server'
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
        type: String,
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
        fullData:this.data,
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
        m_url: this.url,
        //请求参数
        m_query: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      };
    },
    computed: {
      table() {
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
      refreshData(data){
        this.fullData=data;
        if(this.pagination){
          if(this.sidePagination==='client'){
            alert(1)
            this.m_total=this.fullData.length;
            let iStart,iEnd;
            iStart=(this.pageNo-1)*this.pageSize;
            iEnd=this.pageNo*this.pageSize-1;
            this.m_data=this.fullData.slice(iStart,iEnd);
          }else{
            this.m_data=this.fullData;
          }
        }else{
          this.m_data=this.fullData;
        }
      },
      //请求数据，入参会保存为请求条件
      query(arg) {
        return new Promise((resolve, refect) => {
          let param = _.assign(this.m_query, {url: this.m_url}, arg || {})
          if (param.url && param.url !== '') {
            this.m_url = param.url;
            delete param.url;
            if (this.queryParam) {
              param = this.queryParam(param);
            }
            console.log('query url:', this.m_url);
            console.log('query param:', param);
            this.axios.post(this.m_url, param)
              .then((response) => {
                console.log(response);
                if (this.responseHandler) {
                  response = this.responseHandler(response);
                }
                // this.m_data = response.rows;
                this.refreshData(response.rows);
                this.m_total = response.recordsTotal;
                resolve(response.rows)
              })
              .catch(function (error) {
                refect(error)
              });
          }else{
            alert('查询列表数据url不能为空!')
          }
        })
      },
      //翻页处理函数
      handleChangePageNo(val) {
        this.m_pageNo = val;
        if(this.sidePagination==='server'){
          this.query({pageNo: this.m_pageNo}).then((data) => {
            this.m_data = data;
            console.log('handleChangePageNo data:', data)
          })
        }else{
          refreshData(this.data)
        }
        this.$emit('pageChange', this.m_pageNo,this.m_pageSize);
        //let allData=[];
        //let block = this.pageSize * val;
        // this.m_data = _.slice(allData,block - this.pageSize, block - 1);
      },
      //选项数据改变处理函数
      handleSelectionChange(val) {
        console.log(val)
        this.m_selection = val;
        this.$emit('selectionChange', this.m_selection)
      },
      rowClickHandler(row, index) {
        this.$emit('on-row-click', row, index)
      }
    },
    mounted() {
      if((this.data instanceof  Array)&&this.data.length!=0){
        this.refreshData(this.data);
      }else{
        if (this.autoLoad === 'true'|| this.autoLoad === true) {
          this.query();
        }
      }
    }
  }
</script>
<style scoped>
  .table-header {
    font-size: 16px;
    margin: 10px;
  }
</style>
