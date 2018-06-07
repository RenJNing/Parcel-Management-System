<template>
  <div id="track">
        <el-tabs type="border-card">
            <el-tab-pane label="按照单号">
                <el-form :model='trackForm1' :rules='idrules' ref='trackForm1' label-width='0px'>
                    <el-form-item prop='parcel_id'>
                        <el-input v-model='trackForm1.parcel_id' placeholder='请输入快递单号'></el-input>
                    </el-form-item>
                    <el-button type='primary' @click="idsubmit('trackForm1')">查询</el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="按照手机号">
                <el-form :model='trackForm2' :rules='phonerules' ref='trackForm2' label-width='0px'>
                    <el-form-item  prop='receivephone'>
                        <el-input v-model='trackForm2.receivephone' placeholder='请输入收件人手机号码'></el-input>
                    </el-form-item>
                    <el-button type='primary' @click="phonesubmit('trackForm2')">查询</el-button>
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
    codeParsing (code) {
      var msg = (hint) => {
        Message({
          message: hint,
          type: 'error',
          center: true
        })
      }
      switch (code) {
        case 302:
          msg('订单号不存在')
          break
        default:
          break
      }
    },
    idsubmit (Formname) {
      this.tableData = []
      const self = this
      this.$refs[Formname].validate((validate) => {
        if (validate) {
          this.$axios.post('user/trackparcel1', {
            parcel_id: this.trackForm1.parcel_id
          })
            .then(function (response) {
              if (response.data.code === 200) {
                self.tableData.push({parcel_id: response.data.obj.parcel_id, sendername: response.data.obj.sendername, receivename: response.data.obj.receivename, receiveaddress: response.data.obj.receiveaddress, parcel_status: response.data.obj.parcel_status})
              } else {
                self.codeParsing(response.data.code)
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
      this.tableData = []
      const self = this
      this.$refs[Formname].validate((validate) => {
        if (validate) {
          this.$axios.post('user/trackparcel2', {
            receivephone: this.trackForm2.receivephone
          })
            .then(function (response) {
              if (response.data.code === 200) {
                // TODO:查询后返回数据
                response.data.obj.forEach(function (element) {
                  self.tableData.push({parcel_id: element.parcel_id, sendername: element.sendername, receivename: element.receivename, receiveaddress: element.receiveaddress, parcel_status: element.parcel_status})
                })
              } else {
                self.codeParsing(response.data.code)
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
