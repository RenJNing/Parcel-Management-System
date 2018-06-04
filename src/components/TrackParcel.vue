<template>
  <div id="track">
        <el-tabs type="border-card">
            <el-tab-pane label="按照单号">
                <el-form :model='trackForm1' label-width='0px'>
                    <el-form-item>
                        <el-input v-model='orderNum' placeholder='请输入订单号'></el-input>
                    </el-form-item>
                    <el-button type='primary'>查询</el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="按照手机号">
                <div>
                <el-form :model='trackForm2' label-width='80px'>
                    <el-form-item label='手机号码'>
                        <el-input v-model='phoneNum'></el-input>
                    </el-form-item>
                    <el-button type='primary'>查询</el-button>
                </el-form>
                </div>
                <div>
                    <p>查询须知</p>
                    <p>为了确保您的信息安全，我们目前仅提供运单上寄方或收方留有的手机号码的运单号查询</p>
                </div>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
export default{
    data () {
        return {
            trackForm1:{

            }
        };
    }
}
</script>

<style scoped>

</style>