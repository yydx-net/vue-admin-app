<template>
    <el-row>
        <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../../picture/shuage.png"
                    class="image" />
                <div style="padding: 14px;">
                    <span>个人信息</span>
                    <div class="bottom">
                        <time class="time">{{ currentDate }}</time>
                        <el-button type="text" class="button" @click="detailedInformation">详细信息</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import { useRouter } from 'vue-router';
import { getCurrentInstance } from 'vue'
export default {
    data() {
        return {
            currentDate: "广州航海学院，计算机科学与技术2024届毕业生",
        }
    },
    setup(){
        const router=useRouter();
        const detailedInformation=()=>{
            router.push({name:'info',params:{id:getCurrentInstance.id}})
        }
        return{detailedInformation}
    },
    props:['id']
}
</script>
    
<style>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>