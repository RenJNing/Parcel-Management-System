<template>
  <div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="parcel_id" label="订单号" width="180"></el-table-column>
    <el-table-column prop="status" label="快递状态"></el-table-column>
    <el-table-column prop="sendername" label="寄件人" width="180"></el-table-column>
    <el-table-column prop="senderphone" label="寄件人手机" width="180"></el-table-column>
    <el-table-column prop="senderaddress" label="寄件人地址" show-overflow-tooltip width="180"></el-table-column>
    <el-table-column prop="date" label="上门时间" width="180"></el-table-column>
    <el-table-column prop="receivename" label="收件人" width="180"></el-table-column>
    <el-table-column prop="receivephone" label="收件人手机" width="180"></el-table-column>
    <el-table-column prop="receiveaddress" label="收件地址" show-overflow-tooltip width="180"></el-table-column>
  </el-table>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getmyparcel()
  },
  methods: {
    getmyparcel () {
      const self = this
      this.$axios.post('user/getmyparcel', {
        useremail: sessionStorage.getItem('ms_email')
      })
        .then(function (response) {
          if (response.data.code === 200) {
            self.tableData = []
            response.data.obj.forEach(function (element) {
              self.tableData.push({status: element.status ? '已揽件' : '未揽件', parcel_id: element.parcel_id, sendername: element.sendername, receivename: element.receivename, receiveaddress: element.receiveaddress, senderphone: element.senderphone, senderaddress: element.senderaddress, receivephone: element.receivephone, date: element.date})
            })
          } else {
            // self.codeParsing(response.data.code)
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
    }
  }
}
</script>

<style>

</style>
