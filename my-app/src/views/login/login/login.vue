<template>
    <div class="login">
        <div class="md">
            <a-form :model="formState" :rules="rules" name="basic" @finish="onFinish" @finishFailed="onFinishFailed">
                <label style="color: white;">用户名:</label>
                <a-form-item name="username">
                    <a-input v-model:value="formState.username" />
                </a-form-item>
                <label style="color: white;">密码:</label>
                <a-form-item name="password">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <a-form-item>
                    <!-- 滑动验证组件 -->
                    <slide></slide>
                </a-form-item>
                <a-form-item name="submit">
                    <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
                <a-form-item>
                    <div class="fol">
                        <router-link to="/forget" style="padding-right: 3px;">忘记密码</router-link>|
                        <router-link to="/register" style="padding-left:3px;">注册</router-link>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
import './index.less'
import slide from '@/components/slidingV/index.vue'
import { checkPhone, validatePassword } from '@/utils/captcha.js'
import { defineComponent, reactive } from 'vue';
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';
export default defineComponent({
    setup() {
        const router = useRouter();
        const formState = reactive({
            username: '',
            password: '',
        });
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
        const rules = {
            username: [{
                required: true,
                validator: checkUsername,
                trigger: 'change',
            }
            ],
            password: [{
                validator: validatePass1,
                trigger: 'change',
            }]
        }
        const onFinish = values => {
            if (!formState.username) {
                message.info("用户名不能为空！");
            } else {
                if (!formState.password) {
                    message.info("密码不能为空");
                } else {
                    if (values.username == "13335925745" && values.password == "Fyjlzc120129") {
                        console.log('Success:', values);
                        router.push('/home')
                    } else {
                        alert('用户名或者密码错误')
                    }

                }
            }

        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        const login = () => {
            if (!formState.username) {
                message.info('用户名不能为空！')
            } else {
                if (!formState.password) {
                    message.info("密码不能为空！")
                }
            }
        }
        return {
            formState,
            onFinish,
            onFinishFailed,
            rules,
            login
        };
    },
    components: {
        slide
    }
});
</script>
<style lang="less" scoped></style>