<template>
    <div class="login">
        <div class="md">
            <a-form :model="formState" name="basic" @finish="onFinish" @finishFailed="onFinishFailed">
                <label style="color: white;">用户名:</label>
                <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
                    <a-input v-model:value="formState.username" />
                </a-form-item>
                <label style="color: white;">密码:</label>
                <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <a-form-item>
                        <slide></slide>
                </a-form-item>
                <a-form-item name="submit">
                    <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                </a-form-item>
                <a-form-item>
                    <div class="fol">
                        <router-link to="#" style="padding-right: 3px;">忘记密码</router-link>|
                        <router-link to="/register" style="padding-left:3px;">注册</router-link>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import './index.less'
import slide from '../../components/slidingV/index.vue'
import { defineComponent, reactive } from 'vue';
import { useRouter } from "vue-router";
export default defineComponent({
    setup() {
        const router = useRouter();
        const formState = reactive({
            username: '',
            password: '',
        });
        const onFinish = values => {
            if (values.username == "fyj" && values.password == "fyjlzc120129") {
                console.log('Success:', values);
                router.push('/home')
            } else {
                alert('用户名或者密码错误')
            }
        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return {
            formState,
            onFinish,
            onFinishFailed,
        };
    },
    components: {
        slide
    }
});
</script>
<style lang="less" scoped></style>