<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待处理" name="1">
        <el-form ref="form1" :model="form1" :inline="true">
          <el-form-item   label="状态:" prop="status">
            <el-select v-model=" form1.status" placeholder="请选择">
              <el-option v-for="item in status_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item  >
          <el-form-item   label="成交通知书编号:" prop="numbering">
            <el-input v-model=" form1.numbering"></el-input>
          </el-form-item  >
          <el-form-item   label="成交通知书名称" prop="name">
            <el-input v-model=" form1.name"></el-input>
          </el-form-item  >
          <el-form-item   label="采购类别:" prop="ctype">
            <el-select v-model=" form1.ctype" placeholder="请选择">
              <el-option v-for="item in ctype_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item  >
          <el-form-item   label="供应商:" prop="supplier">
            <el-input v-model=" form1.supplier"></el-input>
          </el-form-item  >
          <el-form-item   label="缴费通知发送状态:" prop="pstatus">
            <el-select v-model=" form1.pstatus" placeholder="请选择">
              <el-option v-for="item in pstatus_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item  >
          <div v-show="displaySearch1">
            <el-form-item   label="制单日期:"  >
              <el-col :span="10">
                <el-date-picker
                  v-model=" form1.timesegmentstart"
                  :editable="editable"
                  @change="datepicker('1','start')"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="width:40px;margin-left:38px">&oline;</el-col>
              <el-col :span="10">
                <el-date-picker
                  v-model=" form1.timesegmentend"
                  :editable="editable"
                  @change="datepicker('1','end')"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
            </el-form-item  >
          </div>
          <el-form-item  >
            <el-button type="primary" @click="search('1')">搜索</el-button>
            <el-button @click="resetform('form1')">重置</el-button>
            <!--第二种展开收齐方式:传参-->
            <button-open-close @change="toggle" :open="displaySearch1"></button-open-close>
          </el-form-item  >
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="2">
        <el-form ref="form2" :model="form2" :inline="true">
          <el-form-item   label="状态:" prop="status">
            <el-select v-model="form2.status" placeholder="请选择">
              <el-option v-for="item in status_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item  >
          <el-form-item   label="成交通知书编号:" prop="numbering">
            <el-input v-model="form2.numbering"></el-input>
          </el-form-item  >
          <el-form-item   label="成交通知书名称:" prop="name">
            <el-input v-model="form2.name"></el-input>
          </el-form-item  >
          <el-form-item   label="采购类别:" prop="ctype">
            <el-select v-model="form2.ctype" placeholder="请选择">
              <el-option v-for="item in ctype_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item  >
          <el-form-item   label="供应商:" prop="supplier">
            <el-input v-model="form2.supplier"></el-input>
          </el-form-item  >
          <el-form-item   label="缴费通知发送状态:" prop="pstatus">
            <el-select v-model="form2.pstatus" placeholder="请选择">
              <el-option v-for="item in pstatus_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item  >
          <div v-show="displaySearch2">
            <el-form-item   label="制单日期:" >
              <el-col :span="10">
                <el-date-picker
                  v-model="form2.timesegmentstart"
                  :editable="editable"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  @change="datepicker('2','start')"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="width:40px;margin-left:38px">&oline;</el-col>
              <el-col :span="10">
                <el-date-picker
                  v-model="form2.timesegmentend"
                  :editable="editable"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  @change="datepicker('2','end')"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
            </el-form-item  >
          </div>
          <el-form-item  >
            <el-button type="primary" @click="search('2')">搜索</el-button>
            <el-button @click="resetform('form2')">重置</el-button>
            <!--第二种展开收齐方式:传参-->
            <button-open-close @change="toggle2" :open="displaySearch2"></button-open-close>
          </el-form-item  >
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div style="padding:20px 0px">
      <el-button type="primary" @click="buttonFunc('confirm')">确认</el-button>
      <el-button type="primary" @click="buttonFunc('refused')">拒绝成交</el-button>
      <el-button type="primary" @click="buttonFunc('productiondom')">生产文档</el-button>
      <el-button type="primary" @click="buttonFunc('export')" style="float: right;">导出</el-button>
    </div>
    <cg-table ref="test" v-bind="$data.table"></cg-table>
  </el-card>
</template>
<script>
  import ButtonOpenClose from '@/components/ButtonOpenClose.vue'
  import CgTable from '@/components/CgTable.vue'

  export default {
    components:{
      ButtonOpenClose,
      CgTable
    },
    data() {
      return {
        editable:false,
        displaySearch1:false,
        displaySearch2:false,
        activeName: '1',
        //受理状态
        status_options: [
          {
            label: '全部',
            value: 1
          },
          {
            label: '待发送',
            value: 2
          },
          {
            label: '供应商确认中',
            value: 3
          },
          {
            label: '已确认',
            value: 4
          },
          {
            label: '拒绝成交',
            value: 5
          },
        ],
        ctype_options: [
          {
            label: '全部',
            value: 1
          },
          {
            label: '物资类',
            value: 2
          },
          {
            label: '施工类',
            value: 3
          },
          {
            label: '服务类',
            value: 4
          }
        ],
        pstatus_options: [
          {
            label: '全部',
            value: 1
          },
          {
            label: '未发送',
            value: 2
          },
          {
            label: '已发送',
            value: 3
          },
        ],
        //表单数据
        form1: {
          status: '',
          numbering: '',
          name: '',
          ctype:'',
          supplier:'',
          pstatus:'',
          timesegmentstart:'',
          timesegmentend:''
        },
        form2: {
          status: '',
          numbering: '',
          name: '',
          ctype:'',
          supplier:'',
          pstatus:'',
          timesegmentstart:'',
          timesegmentend:''
        },
        //列表数据
        table: {
          data: [],
          height: 400,
          columns: [
            {
              type: 'selection',
              width: 50
            },
            {
              label: '序号',
              type: 'index',
              width: 80
            },
            {
              label: '状态',
              prop: 'status'
            },
            {
              label: '成交通知书名称',
              prop: 'name'
            },
            {
              label: '供应商',
              prop: 'supplier'
            },
            {
              label: '采购编号',
              prop: 'cnumber'
            },
            {
              label: '采购金额',
              prop: 'money',
            },
            {
              label: '采购类别',
              prop: 'ctype',
              formatter: function (row, column, value) {
                switch (value) {
                  case 1:
                    return '物资类';
                    break;
                  case 2:
                    return '施工类';
                    break;
                  case 3:
                    return '服务类';
                    break;
                }
              }
            },
          ],
          url: this.appConfig.api('testDealnoticeprocurement'),
          pageNo: 1,
        }
      };
    },
    methods: {
      search(num) {
        if(this['form'+num]["timesegmentstart"]===''||this['form'+num]["timesegmentend"]===''){
          this['form'+num]["timesegmentstart"]='';
          this['form'+num]["timesegmentend"]='';
        }
        this.$refs.test.query(this["form"+num]);
      },
      buttonFunc (functionname) {
        console.log(this.$refs.test.m_selection);
        console.log('方法name---'+functionname);
      },
      //重置
      resetform(form1Name) {
        this.$refs[form1Name].resetFields();
      },
      handleClick() {
        this.search(this.activeName);
      },
      toggle(open){
        this.displaySearch1=open;
      },
      toggle2(open) {
        this.displaySearch2=open;
      },
      datepicker(num,type) {
        if(type==="start"&&this['form'+num]["timesegmentend"]!==''){
          if(!this.moment(this['form'+num]["timesegment"+type]).isBefore(this['form'+num]["timesegmentend"])){
            this['form'+num]["timesegmentend"]='';
          }
        }else if(type==="end"&&this['form'+num]["timesegmentstart"]!==''){
          if(!this.moment(this['form'+num]["timesegmentstart"]).isBefore(this['form'+num]["timesegment"+type])){
            this['form'+num]["timesegmentstart"]='';
          }
        }

      }
    }

  };
</script>
