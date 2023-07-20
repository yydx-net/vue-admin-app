<template>
    <div class="login">
        <el-card class="box-card">
            <div class="card-header">
                <span>登录</span>
            </div>
            <div class="login-form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item  prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="输入密码"></el-input>
                </el-form-item>
                <el-form-item  prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="this.onsubmit" padding-right="100px">提交</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass')
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                pass: '',
                checkPass: '',
            },
            rules: {
                pass: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }],
            },
        }
    },

    setup(){
        const router=useRouter()
        const onsubmit=()=>{
            console.log("hello world!")
            router.push('/about1')
        }
        return{ onsubmit }
    }
    
}
</script>
<style scoped>
.login{
    width: 100%;
}
.login-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
}
.card-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top:20px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray; 
  } 
.login {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
    --el-card-padding: 0px;
}
</style>
