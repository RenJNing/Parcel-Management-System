<template>
  <div id="order">
        <el-form :model="OrderForm" :rules='rules' ref='OrderForm' label-width='100px' class='OrderForm'>
                <el-form-item prop='sendername' label='寄件人姓名：'>
                    <el-input v-model="OrderForm.sendername" placeholder="请填写联系人姓名"></el-input>
                </el-form-item>
                <el-form-item prop='senderphone' label='寄件人手机：'>
                       <el-input v-model="OrderForm.senderphone" placeholder="请填写手机号"></el-input>
                </el-form-item>
            <el-form-item prop='senderaddress' label='上门地址：'>
                <el-input v-model="OrderForm.senderaddress" placeholder="请填写所在地区及详细地址"></el-input>
            </el-form-item>
                <el-form-item prop='receivename' label='收件人姓名：'>
                    <el-input v-model="OrderForm.receivename" placeholder="请填写联系人姓名"></el-input>
                </el-form-item>
                <el-form-item prop='receivephone' label='收件手机：'>
                    <el-input v-model="OrderForm.receivephone" placeholder="请填写手机号"></el-input>
                </el-form-item>
            <el-form-item prop='receiveaddress' label='收货地址：'>
                <el-input v-model="OrderForm.receiveaddress" placeholder="请填写所在地区及详细地址"></el-input>
            </el-form-item>
            <el-form-item prop='date' label='上门时间：'>
                <el-date-picker type="date" placeholder="请选择您适合的时间" v-model="OrderForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="confrim('OrderForm')">确认</el-button>
            <el-button @click="resetForm('OrderForm')">重置</el-button>
        </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default{
  data: function () {
    return {
      OrderForm: {
        sendername: '',
        senderphone: '',
        senderaddress: '',
        receivename: '',
        receivephone: '',
        receiveaddress: '',
        date: ''
      },
      rules: {
        sendername: [{required: true, message: '请输入寄件人姓名！', trigger: 'blur'}],
        senderphone: [
          {required: true, message: '请输入寄件人手机！', trigger: 'blur'},
          {pattern: /^[0-9]{11}$/, message: '请输入11位手机号码', trigger: 'blur'}
        ],
        senderaddress: [{required: true, message: '请输入寄件人地址！', trigger: 'blur'}],
        receivename: [{required: true, message: '请输入收件人姓名！', trigger: 'blur'}],
        receivephone: [
          {required: true, message: '请输入收件人手机！', trigger: 'blur'},
          {pattern: /^[0-9]{11}$/, message: '请输入11位手机号码', trigger: 'blur'}
        ],
        receiveaddress: [{required: true, message: '请输入寄件人地址！', trigger: 'blur'}],
        date: [{type: 'date', required: true, message: '请选择时间', trigger: 'change'}]
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    confrim (formName) {
      const self = this
      this.$refs[formName].validate((validate) => {
        if (validate) {
          this.$axios.post('user/sendparcel', {
            sendername: this.OrderForm.sendername,
            senderphone: this.OrderForm.senderphone,
            senderaddress: this.OrderForm.senderaddress,
            receivename: this.OrderForm.receivename,
            receivephone: this.OrderForm.receivephone,
            receiveaddress: this.OrderForm.receiveaddress,
            date: this.OrderForm.date
          })
            .then(function (response) {
              if (response.data.code === 200) {
                Message({
                  message: '成功提交订单',
                  type: 'success',
                  center: true
                })
                self.resetForm('OrderForm')
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
