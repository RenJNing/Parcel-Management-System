<template>
  <div id="track">
        <el-tabs type="border-card">
            <el-tab-pane label="按照单号">
                <el-form :model='trackForm1' :rules='idrules' ref='idForm' label-width='0px'>
                    <el-form-item prop='parcel_id'>
                        <el-input v-model='trackForm1.parcel_id' placeholder='请输入快递单号'></el-input>
                    </el-form-item>
                    <el-button type='primary' @click="idsubmit('idForm')">查询</el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="按照手机号">
                <el-form :model='trackForm2' :rules='phonerules' ref='phoneForm' label-width='0px'>
                    <el-form-item  prop='receivephone'>
                        <el-input v-model='trackForm2.receivephone' placeholder='请输入收件人手机号码'></el-input>
                    </el-form-item>
                    <el-button type='primary' @click="phonesubmit('phoneForm')">查询</el-button>
                </el-form>
            </el-tab-pane>
        </el-tabs>
<el-table :data="tableData" stripe style="width: 100%">
<el-table-column prop="parcel_id" label="订单号" width="180"></el-table-column>
<el-table-column prop="sendername" label="寄件人" width="180"></el-table-column>
  <el-table-column prop="receivename" label="收件人" width="180"></el-table-column>
<el-table-column prop="receiveaddress" label="收件地址" width="180"></el-table-column>
  <el-table-column prop="parcel_status" label="快递状态"></el-table-column>
</el-table>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default{
  data () {
    return {
      tableData: [],
      trackForm1: {
        parcel_id: ''
      },
      trackForm2: {
        receivephone: ''
      },
      idrules: {
        parcel_id: [{required: true, message: '请输入快递单号！', trigger: 'blur'}]
      },
      phonerules: {
        receivephone: [{required: true, message: '请输入收件人手机！', trigger: 'blur'},
          {pattern: /^[0-9]{11}$/, message: '请输入11位手机号码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    idsubmit (Formname) {
      this.$refs[Formname].validate((validate) => {
        if (validate) {
          this.$axios.post('user/trackparcel', {
            parcel_id: this.idForm.parcel_id
          })
            .then(function (response) {
              if (response.data.code === 200) {
                // TODO:查询后返回数据
                // this.tableData.push({parcel_id:1,sendername:2,receivename:3,receiveaddress:4,parcel_status:5})
              }
            })
            .catch(function (error) {
              console.log(error)
              Message({
                message: '请检查网络并重试',
                type: 'error',
                center: true
              })
            })
        } else {
          Message({
            message: '格式错误，请检查输入',
            type: 'error',
            center: true
          })
          return false
        }
      }
      )
    },
    phonesubmit (Formname) {
      this.$refs[Formname].validate((validate) => {
        if (validate) {
          this.$axios.post('user/trackparcel', {
            receivephone: this.phoneForm.receivephone
          })
            .then(function (response) {
              if (response.data.code === 200) {
                // TODO:查询后返回数据
              }
            })
            .catch(function (error) {
              console.log(error)
              Message({
                message: '请检查网络并重试',
                type: 'error',
                center: true
              })
            })
        } else {
          Message({
            message: '格式错误，请检查输入',
            type: 'error',
            center: true
          })
          return false
        }
      }
      )
    }
  }
}
</script>

<style scoped>

</style>
