<template>
  <div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column prop="parcel_id" label="订单号" width="180"></el-table-column>
    <el-table-column prop="sendername" label="寄件人" width="180"></el-table-column>
    <el-table-column prop="senderphone" label="寄件人手机" width="180"></el-table-column>
    <el-table-column prop="senderaddress" label="寄件人地址" show-overflow-tooltip width="180"></el-table-column>
    <el-table-column prop="date" label="上门时间" width="180"><template slot-scope="scope">{{ scope.row.date }}</template></el-table-column>
    <el-table-column prop="receivename" label="收件人" width="180"></el-table-column>
    <el-table-column prop="receivephone" label="收件人手机" width="180"></el-table-column>
    <el-table-column prop="receiveaddress" label="收件地址" show-overflow-tooltip width="180"></el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="add()">确认揽件</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: []
    }
  },

  methods: {
    getunaccepted () {
      const self = this
      this.$axios.get('admin/getunacceptedparcel')
        .then(function (response) {
          if (response.data.code === 200) {
            self.tableData = []
            response.data.obj.forEach(function (element) {
              self.tableData.push({parcel_id: element.parcel_id, sendername: element.sendername, receivename: element.receivename, receiveaddress: element.receiveaddress, senderphone: element.senderphone, senderaddress: element.senderaddress, receivephone: element.receivephone, date: element.date})
            })
          } else {
            self.tableData = []
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
    },
    add () {
      const self = this
      var parcelIds = []
      this.multipleSelection.forEach(function (element) {
        console.log('push ' + element.parcel_id)
        parcelIds.push(element.parcel_id)
      })
      this.$axios.post('admin/acceptparcel', {
        parcel_ids: parcelIds
      }).then(function (response) {
        if (response.data.code === 200) {
          self.getunaccepted()
        } else {

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
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },

  mounted () {
    this.getunaccepted()
  }
}
</script>

<style>

</style>
