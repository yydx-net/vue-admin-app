<template>
    <div class="login">
        <div class="md">
            <a-form :model="formState" :rules="rules" name="basic" @finish="onFinish" @finishFailed="onFinishFailed"
                autocomplete="off">
                <label style="color: white;">用户名:</label>
                <a-form-item name="username">
                    <a-input v-model:value="formState.username" autocomplete="off" />
                </a-form-item>
                <label style="color: white;">密码:</label>
                <a-form-item name="password">
                    <a-input-password v-model:value="formState.password" autocomplete="off" />
                </a-form-item>
                <label style="color:white">确认密码:</label>
                <a-form-item name="checkPass">
                    <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
                </a-form-item>
                <label style="color:white">验证码:</label>
                <a-form-item name="checkCode">
                    <a-row :gutter="15">
                        <a-col :span="14">
                            <a-input v-model:value="formState.checkCode" type="input" autocomplete="off" />
                        </a-col>
                        <a-col :span="10">
                            <a-button disa block type="primary" :disabled="formState.botton_disable"
                                :loading="formState.botton_loading" @click="SendVerificationCodeRequest">
                                {{ formState.botton_text }}</a-button>
                        </a-col>
                    </a-row>
                </a-form-item>
                <a-form-item>
                    <!-- 滑动验证组件 -->
                        <slide></slide>
                </a-form-item>
                <a-form-item name="submit">
                    <a-button type="primary" html-type="submit" style="width: 100%;">重置密码</a-button>
                </a-form-item>
                <a-form-item>
                    <div class="fol">
                        <router-link to="/login" style="padding-right: 3px;">登录</router-link>|
                        <router-link to="/register" style="padding-left:3px;">注册</router-link>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
import './index.less'
import { defineComponent, reactive } from 'vue';
import slide from '@/components/slidingV/index.vue';
import { useRouter } from "vue-router";
import { checkPhone, validatePassword, validateCode as code } from '@/utils/captcha.js'
import { message } from 'ant-design-vue';
export default defineComponent({
    setup() {
        const router = useRouter();
        const formState = reactive({
            checkPass: '',
            username: '',
            password: '',
            checkCode: '',
            botton_text: '获取验证码',
            botton_loading: false,
            botton_disable: false,
            sec: 60//定义事件位60s 定时器每次执行就减去1
        });
        //获取验证码的按钮
        let checkUsername = async (_rule, value) => {
            if (!value) {
                // return Promise.reject('请输入用户名!')
                ;
            }
            else if (!checkPhone(value)) {
                return Promise.reject('请输入11位的手机号')
            }
            else {
                return Promise.resolve();
            }
        }
        let validatePass1 = async (_rule, value) => {
            if (!value) {
                // return Promise.reject('请输入密码!')
                ;
            } else if (!validatePassword(value)) {
                return Promise.reject('至少一个大写字母、一个小写字母、一个数字，长度在8到20之间')
            }
            else {
                return Promise.resolve();
            }
        }
        let validatePass2 = async (_rule, value) => {
            if (!value) {
                // return Promise.reject('请确认输入密码!');
                ;
            }
            else if (!validatePassword(value)) {
                return Promise.reject('至少一个大写字母、一个小写字母、一个数字，长度在8到20之间')
            }
            else if (value !== formState.password) {
                return Promise.reject("两次密码不匹配!");
            } else {
                return Promise.resolve();
            }
        }
        let validateCode = async (_rule, value) => {
            if (!value) {
                // return Promise.reject("请输入验证码!");
                ;
            } else if (!code(value)) {
                return Promise.reject("请输入六位数字+英文验证码！")
            }
            else {
                return Promise.resolve();
            }
        }
        const rules = {
            username: [{
                required: true,
                validator: checkUsername,
                trigger: 'change',
            }
            ],
            checkPass: [{
                validator: validatePass2,
                trigger: 'change',
            }],
            password: [{
                validator: validatePass1,
                trigger: 'change',
            }],
            checkCode: [{
                validator: validateCode,
                trigger: 'change',
            }]
        }
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        const onFinish = values => {
            if (values.checkPass === values.password) {
                console.log('Success:', values);
                alert('注册成功.....')
                router.push('/login')
            }
        };
        const SendVerificationCodeRequest = () => {
            if (!formState.username) {
                const message1 = message.info("用户名不能为空");
            } else {
                if (!formState.password) {
                    const message2 = message.info("密码不能为空");
                } else {
                    if (!formState.checkPass) {
                        const message3 = message.info("确认密码不能为空!");
                    } else {
                        formState.sec = 60;
                        const si = setInterval(() => {
                            const s = formState.sec--;
                            formState.botton_disable = false;
                            formState.botton_loading = true;
                            formState.botton_text = `${s}秒`
                            if (s <= 0) {
                                clearInterval(s)
                                formState.botton_loading = false;
                                formState.botton_text = "重新获取";
                            }
                        }, 1000)
                    }

                }
            }
        }
        return {
            formState,
            onFinish,
            onFinishFailed,
            rules,
            SendVerificationCodeRequest
        };
    },
    components:{
        slide
    }
});
</script>
<style lang="less" scoped></style>