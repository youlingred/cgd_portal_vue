<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待处理" name="1">
        <el-form ref="form1" :model="form" :inline="true">
          <el-form-item label="状态:" prop="status">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option v-for="item in status_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成交通知书编号:" prop="numbering">
            <el-input v-model="form.numbering"></el-input>
          </el-form-item>
          <el-form-item label="成交通知书名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="采购类别:" prop="ctype">
            <el-select v-model="form.ctype" placeholder="请选择">
              <el-option v-for="item in ctype_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商:" prop="supplier">
            <el-input v-model="form.supplier"></el-input>
          </el-form-item>
          <el-form-item label="缴费通知发送状态" prop="pstatus">
            <el-select v-model="form.pstatus" placeholder="请选择">
              <el-option v-for="item in pstatus_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div ref="hideSearch1" v-show="displaySearch">
            <el-form-item label="活动时间" prop="timesegment" required >
              <el-date-picker
                v-model="form.timesegment"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="inittime">
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetForm('form1')">重置</el-button>
            <!--第二种展开收齐方式:传参-->
            <button-open-close :el="$refs.hideSearch1" :open="displaySearch"></button-open-close>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="2">
        <el-form ref="form2" :model="form" :inline="true">
          <el-form-item label="状态:" prop="status">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option v-for="item in status_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成交通知书编号:" prop="numbering">
            <el-input v-model="form.numbering"></el-input>
          </el-form-item>
          <el-form-item label="成交通知书名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="采购类别:" prop="ctype">
            <el-select v-model="form.ctype" placeholder="请选择">
              <el-option v-for="item in ctype_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商:" prop="supplier">
            <el-input v-model="form.supplier"></el-input>
          </el-form-item>
          <el-form-item label="缴费通知发送状态:" prop="pstatus">
            <el-select v-model="form.pstatus" placeholder="请选择">
              <el-option v-for="item in pstatus_options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div ref="hideSearch2" v-show="displaySearch">
            <el-form-item label="活动时间:" required >
              <el-date-picker
                v-model="form.timesegment"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="inittime">
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetForm('form2')">重置</el-button>
            <!--第二种展开收齐方式:传参-->
            <button-open-close :el="$refs.hideSearch2" :open="displaySearch"></button-open-close>
          </el-form-item>
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
        inittime: this.moment().subtract(5, "months").format("YYYY-MM-DD"),
        displaySearch:false,
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
        form: {
          status: '',
          numbering: '',
          name: '',
          ctype:'',
          supplier:'',
          pstatus:'',
          timesegment:''
        },
      };
    },
    methods: {
      search() {

      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(tab) {
        console.log(tab);
      }
    }
  };
</script>
