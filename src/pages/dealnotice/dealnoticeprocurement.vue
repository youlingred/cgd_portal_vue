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
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="width:40px;margin-left:38px">&oline;</el-col>
              <el-col :span="10">
                <el-date-picker
                  v-model=" form1.timesegmentend"
                  :editable="editable"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
            </el-form-item  >
          </div>
          <el-form-item  >
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetform('form11')">重置</el-button>
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
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="width:40px;margin-left:38px">&oline;</el-col>
              <el-col :span="10">
                <el-date-picker
                  v-model="form2.timesegmentend"
                  :editable="editable"
                  type="datetime"
                  <!--@change=""  moment('2010-10-20').isBefore('2010-10-21'); // true-->
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-col>
            </el-form-item  >
          </div>
          <el-form-item  >
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetform('form12')">重置</el-button>
            <!--第二种展开收齐方式:传参-->
            <button-open-close @change="toggle2" :open="displaySearch2"></button-open-close>
          </el-form-item  >
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
  import ButtonOpenClose from '@/components/ButtonOpenClose.vue'

  export default {
    components:{
      ButtonOpenClose
    },
    data() {
      return {
        editable:false,
        // from2start: '2018-01-19', //this.moment().subtract(5, "months").format("YYYY-MM-DD HH:mm:ss"),
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
      };
    },
    methods: {
      search() {

      },
      //重置
      resetform(form1Name) {
        this.$refs[form1Name].resetFields();
      },
      handleClick(tab) {
        console.log(tab);
      },
      toggle(open){
        this.displaySearch1=open;
      },
      toggle2(open) {
        this.displaySearch2=open;
      }
    }
  };
</script>
