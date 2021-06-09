

```vue
<template>
    <div class="record-con">
<van-form @submit="onSubmit">
            <!-- 其余输入框 -->
            <div v-for="(item, index) in group1" :key="index">
                <!-- :value 实现双向绑定 -->
                <div v-if="index == 4">
                    <!-- 运动会级别 -->
                    <van-cell-group>
                        <div class="boline inputTemplate">
                            <van-field
                                readonly
                                clickable
                                :name="firItem.firItemName"
                                :label="firItem.firItemName"
                                :value="firValuePicker"
                                :placeholder="firItem.firPlaceholder"
                                @click="firMqinAiPicker"
                            />

                            <div v-if="firMyIf">
                                <van-popup
                                    v-model="showPicker"
                                    position="bottom"
                                >
                                    <van-picker
                                        :title="firItem.title"
                                        show-toolbar
                                        :columns="firItem.firItemCloumn"
                                        @cancel="showPicker = false"
                                        @confirm="firOnConfirmPicker"
                                    />
                                </van-popup>
                            </div>
                        </div>

                        <div class="msg-tip" v-if="firFlag">
                            {{ firItem.firItemMessage }}
                        </div>
                    </van-cell-group>
                    <!-- 获奖类别 -->
                    <van-cell-group>
                        <div class="boline inputTemplate">
                            <van-field
                                readonly
                                clickable
                                :name="secItem.secItemName"
                                :label="secItem.secItemName"
                                :value="secValuePicker"
                                :placeholder="secItem.secPlaceholder"
                                @click="secMqinAiPicker"
                            />
                            <div v-if="secMyIf">
                                <van-popup
                                    v-model="showPicker"
                                    position="bottom"
                                >
                                    <van-picker
                                        :title="secItem.title"
                                        show-toolbar
                                        :columns="secItem.secItemCloumn"
                                        @cancel="showPicker = false"
                                        @confirm="secOnConfirmPicker"
                                    />
                                </van-popup>
                            </div>
                        </div>
                        <div class="msg-tip" v-if="secFlag">
                            {{ secItem.secItemMessage }}
                        </div>
                    </van-cell-group>
                </div>
                <!-- 授奖日期日历 -->
                <div v-if="index == 6">
                    <van-field
                        class="timeInput inputTemplate"
                        readonly
                        clickable
                        :name="timeTitle"
                        :label="timeTitle"
                        :value="date"
                        :placeholder="timePlaceHolder"
                        @click="show = true"
                    />
                    <van-calendar v-model="show" @confirm="onConfirm" />
                </div>
                <!-- 所有正常输入框 -->

                <van-cell-group>
                    <van-field
                        class="inputTemplate"
                        :value="item.value"
                        v-model="item.value"
                        :name="item.lable"
                        :label="item.lable"
                        :placeholder="item.placeHolder"
                        :readonly="item.readonly"
                        @click="click(index)"
                        @blur="blur(index)"
                    />

                    <div class="msg-tip" v-if="item.tip">
                        {{ item.message }}
                    </div>
                </van-cell-group>
            </div>
            <!-- 备注多行输入框 -->
            <div>
                <van-field
                    name="备注"
                    v-model="message"
                    rows="3"
                    autosize
                    label="备注"
                    type="textarea"
                    placeholder="请输入备注信息"
                />
            </div>

            <div class="button">
                <!-- 保存按钮 -->
                <li style="flex-grow: 1">
                    <van-button
                        class="bot-button btn-first"
                        round
                        native-type="button"
                        plain
                        >保存</van-button
                    >
                </li>
                <!-- 提交按钮 -->
                <li style="flex-grow: 1">
                    <van-button
                        class="bot-button"
                        round
                        antive-type="button"
                        type="submit"
                        size="normal"
                        color="RGB(24,144,255)"
                        >提交</van-button
                    >
                </li>
            </div>
        </van-form>
            </div>
</template>

<script>
export default {
    name: "index",
    components: {},
    props: {},

    data() {
        return {
            activeNames: ["1"],
            // activeNames: ["2"],
            // 判断两个选择器是否要选择框
            firMyIf: false,
            secMyIf: false,
            // 两个选择器的输入值
            firValuePicker: "",
            secValuePicker: "",
            // 留言的值
            message: "",
            // 是否开启提示框
            firFlag: false,
            secFlag: false,
            showPicker: false,

            // 日期
            date: "",
            show: false,
            // 日期名字,占位符
            timeTitle: "授奖时间",
            timePlaceHolder: "请选择授奖日期",
            // 选择器1
            firItem: {
                firItemName: "运动会级别",
                firItemMessage: "“运动会”级别请填写“全运会、锦标赛、省运会”等",
                firItemCloumn: ["全运会", "锦标赛", "省运会"],
                firPlaceholder: "选择运动会级别",
                title: "请选择运动会级别",
            },
            // 选择器2
            secItem: {
                secItemName: "获奖类别",
                secItemMessage:
                    "获奖类别请选填“美术作品类、音乐表演类、音乐作品类、运动竞赛类”",
                secItemCloumn: [
                    "美术作品类",
                    "音乐表演类",
                    "音乐作品类",
                    "运动竞技类",
                ],
                secPlaceholder: "选择获奖类别",
                title: "请选择获奖类别",
            },
            // 普通输入框
            group: [
                {
                    lable: "第一获奖人",
                    placeHolder: "选择第一获奖人",
                    value: "",
                    message: "",
                    tip: false,
                },
                {
                    lable: "全部获奖人",
                    placeHolder: "选择全部获奖人",
                    value: "",
                    message:
                        "全部获奖人一栏是为编制科研年报所用，须填写完整全部获奖人，姓名间请以“、”隔开。获奖人不是我校的，请在姓名后加*号注明。",
                    tip: false,
                },
                {
                    lable: "获奖成果",
                    placeHolder: "填写获奖成果",
                    value: "",
                    message: "",
                    tip: false,
                },
                {
                    lable: "奖励名称",
                    placeHolder: "填写奖励名称",
                    value: "",
                    message: "",
                    tip: false,
                },

                {
                    lable: "获奖等级",
                    placeHolder: "填写获奖等级",
                    value: "",
                    message: "",
                    tip: false,
                },
                {
                    lable: "授奖单位",
                    placeHolder: "填写授奖单位",
                    value: "",
                    message:
                        "授奖单位一栏请填写：展会或比赛组织机构和奖励评选机构，请依序注明全部参加组织和评选机构。",
                    tip: false,
                },

                {
                    lable: "证书编号",
                    placeHolder: "填写整数编号",
                    value: "",
                    message: "",
                    tip: false,
                },
            ],
        };
    },
    methods: {
        // 第一个选择器点击确认触发
        firOnConfirmPicker(e) {
            this.firValuePicker = e;
            this.showPicker = false;
            // this.firFlag = false;
        },
        // 第二个选择器点击确认触发
        secOnConfirmPicker(e) {
            this.secValuePicker = e;
            this.showPicker = false;
            this.secFlag = false;
        },
        // 第一个选择器点击确认触发
        firMqinAiPicker() {
            this.firMyIf = true;
            this.secMyIf = false;
            this.showPicker = true;
            this.firFlag = true;
            this.secFlag = false;
        },
        // 第二个选择器click事件
        secMqinAiPicker() {
            this.firMyIf = false;
            this.secMyIf = true;
            this.showPicker = true;
            this.secFlag = true;
            this.firFlag = false;
        },
        // 日历填入格式
        formatDate(date) {
            return `${date.getFullYear()}/${
                date.getMonth() + 1
            }/${date.getDate()}`;
        },
        // 日历点击确认触发事件
        onConfirm(date) {
            this.show = false;
            this.date = this.formatDate(date);
        },
        // 提交按钮事件
        onSubmit(values) {
            alert("11111");
            console.log("sublit", values);
        },
        // 失去焦点关闭提示框
        blur(index) {
            this.group[index].tip = false;
        },
        // 输入框点击事件
        click(index) {
            // console.log("111111", "这是index" + index);
            if (this.group[index].message) {
                this.group[index].tip = true;
            }

            this.firFlag = false;
            this.secFlag = false;
        },
        // 返回按钮事件
        onClickLeft() {
            alert("22222222");
            Toast("返回");
        },
    },
};
</script>
<style scoped>
/* 两个按钮横向排列 */
.record-con {
    background-color: rgb(250, 250, 250);
    min-height: 100vh;
    overflow: hidden;
}
.button {
    padding: 16px 0;
    display: flex;
    background-color: rgb(250, 250, 250);
}
.button li {
    list-style: none;
    flex-direction: row;
    text-align: center;
}
/* 提示框加边距 */
.msg-tip {
    /* border: 10px solid rgb(253, 253, 250); */
    padding: 0 13px;
    font-size: 12px;
    color: rgb(201, 190, 190);
}
/* 按钮宽度拉长，高度41px */
.bot-button {
    height: 41px;
    width: 150px;
}
/* 保存按钮字体调黑 */
div /deep/ .btn-first span {
    color: black;
}
/* 占位符距离标题宽度
    div /deep/ .van-cell__title {
      width: 100px;
    } */
/* 导航条高度为40px */
.nav-bar {
    height: 40px;
    background-color: rgb(250, 250, 250);
}
/* 所有输入框高度为41px */
/* .inputTemplate {
    height: 41px;
} */
div /deep/ .van-cell::after {
    display: none;
}
/* div /deep/ [class*="van-hairline"]::after {
    width: 200%;
    left: -47%;
} */
div /deep/ .van-field__label span {
    display: inline-block;
    width: 70px;
}
div /deep/ .van-cell__value {
    display: flex;
    align-items: center;
}
.msg-tip {
    padding-bottom: 10px;
    /* background-color: rgb(255, 255, 255); */
}
div /deep/ .van-cell__right-icon {
    display: none;
}
</style>
```