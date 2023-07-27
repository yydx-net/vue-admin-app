<template>
    <div class="login">
        <div class="md">
            <a-form :model="formState" :rules="rules" name="basic" @finish="onFinish" @finishFailed="onFinishFailed">
                <label style="color: white;">用户名:</label>
                <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
                    <a-input v-model:value="formState.username" />
                </a-form-item>
                <label style="color: white;">密码:</label>
                <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <label style="color:white">确认密码:</label>
                <a-form-item name="checkPass">
                    <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
                </a-form-item>
                <label style="color:white">验证码:</label>
                <a-form-item name="checkCode">
                    <a-row>
                        <a-col :span="14">
                            <a-input v-model:value="formState.checkCode" type="input" autocomplete="off" />
                        </a-col>
                        <a-col :span="10">
                            <a-button block type="primary">获取验证码</a-button>
                        </a-col>
                    </a-row>
                </a-form-item>
                <a-form-item name="submit">
                    <a-button type="primary" html-type="submit" style="width: 100%;">注册</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
import './index.less'
import { defineComponent, reactive } from 'vue';
import { useRouter } from "vue-router";
export default defineComponent({
    setup() {
        const router = useRouter();
        const formState = reactive({
            checkPass: '',
            username: '',
            password: '',
            checkCode:'',
        });
        let checkUsername = async (_rule, value) => {
            if (!value) {
                return Promise.reject('请输入用户名!')
            } else {
                return Promise.resolve();
            }
        }
        let validatePass1 = async (_rule, value) => {
            if (!value) {
                return Promise.reject('请输入密码!')
            } else {
                return Promise.resolve();
            }
        }
        let validatePass2 = async (_rule, value) => {
            if (!value) {
                return Promise.reject('请再次输入密码!');
            } else if (value !== formState.password) {
                return Promise.reject("两次密码不匹配!");
            } else {
                return Promise.resolve();
            }
        }
        let validateCode=async(_rule,value)=>{
            if(!value){
                return Promise.reject("请输入验证码!");
            }else{
                return Promise.resolve();
            }
        }
        const rules = {
            username: [
                {
                    required: true,
                    validator: checkUsername
                }
            ],
            checkPass: [{
                validator: validatePass2,
                trigger: 'change',
            }],
            password:[{
                validator:validatePass1,
                trigger:'change',
            }],
            checkCode:[{
                validator:validateCode,
                trigger:'change',
            }]
        }
        const onFinish = values => {
            if (values.checkPass===values.password) {
                console.log('Success:', values);
                alert('注册成功.....')
                router.push('/login')
            } 
        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return {
            formState,
            onFinish,
            onFinishFailed,
            rules
        };
    }
});
</script>
<style lang="less" scoped></style>