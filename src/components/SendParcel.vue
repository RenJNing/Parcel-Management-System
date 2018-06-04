<template>
  <div id="order">
        <el-form :model="OrderForm" :rules='rules' ref='OrderForm' label-width='100px' class='OrderForm'>
            <el-col :span="12">
                <el-form-item label='姓名：'>
                    <el-input v-model="OrderForm.sendername" placeholder="请填写联系人姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label='手机：'>
                       <el-input v-model="OrderForm.senderphone" placeholder="请填写手机号"></el-input>
                </el-form-item>
            </el-col>
            <el-form-item label='上门地址：'>
                <el-input v-model="OrderForm.senderaddress" placeholder="请填写所在地区及详细地址"></el-input>
            </el-form-item>
            <el-col :span="12">
                <el-form-item label='姓名：'>
                    <el-input v-model="OrderForm.receivename" placeholder="请填写联系人姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label='手机：'>
                    <el-input v-model="OrderForm.receivephone" placeholder="请填写手机号"></el-input>
                </el-form-item>
            </el-col>
            <el-form-item label='上门地址：'>
                <el-input v-model="OrderForm.receiveaddress" placeholder="请填写所在地区及详细地址"></el-input>
            </el-form-item>
            <el-form-item label='上门时间：'>
                <el-date-picker type="date" placeholder="请选择您适合的时间" v-model="OrderForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default{
    data () {
        return {
            OrderForm:{
                sendername:'',
                senderphton:'',
                senderaddress:'',
                receivename:'',
                receivephone:'',
                receiveaddress:'',
                date:''
            }
        };
    }
}
</script>

<style scoped>

</style>