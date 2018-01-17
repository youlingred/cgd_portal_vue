<template>
  <div style="background-color:#f3f3f3">
    <el-table ref="table" :data="m_data"
              :height="height"
              @selection-change="handleSelectionChange"
              border>
      <el-table-column align="center" v-for="item in columns"
                       :key="item.index"
                       v-bind="item"
      ></el-table-column>
    </el-table>
    <el-pagination v-show="pagination" background class="tr"
                   @current-change="handleChangePageNo"
                   :current-page="m_pageNo"
                   :page-size="m_pageSize"
                   layout="total, prev, pager, next, jumper"
                   :total="m_total" style="padding:10px 20px">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: {
      height: {
        type: [Number, String]
      },
      pagination: {
        type: Boolean,
        default: true
      },
      pageNo: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      url: {
        type: String
      },
      queryParam: {
        type: Function
      },
      responseHandler: {
        type: Function
      }
    },
    data() {
      return {
        m_data: this.data,
        m_pageNo: this.pageNo,
        m_pageSize: this.pageSize,
        m_total: 0,
        m_url: this.url,
        m_selection: []
      };
    },
    computed: {
      _query() {
        return {
          pageNo: this.m_pageNo,
          pageSize: this.m_pageSize
        }
      },
      _url: {
        get() {
          return this.m_url;
        },
        set(val) {
          this.m_url = val
        }
      },
      selection() {
        return this.m_selection;
      },
      all() {
        return this.m_data;
      }
    },
    methods: {
      getData() {
        this.$refs.table.data;
      },
      getSelection() {``
        return [];
      },
      query(arg) {
        let param = _.assign({url: this._url, params:this._query},arg||{})
        console.log(param)
        if (param.url && param.url != '') {
          if (this.queryParam) {
            param.params = this.queryParam(param.params);
          }
          console.log('params:', param.params);
          this.axios.post(param.url, param.params)
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
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      handleChangePageNo(val) {
        let page = parseInt(val);
        //页数不能为0或者非数字
        if (isNaN(page) || page === 0) {
          return;
        }
        let block = this.pageSize * page;
        this.m_pageNo = page;
        this.m_data = _.slice(block - this.pageSize, block - 1);
      },
      handleSelectionChange(val) {
        this.m_selection = val;
      }
    },
    created() {
      this.query();
    }
  }
</script>
