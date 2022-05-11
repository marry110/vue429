<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-field
        v-model="username"
        error
        required
        label="用户名"
        placeholder="请输入用户名"
        @click-icon="username = ''"
      />
      <van-field
        v-model="password"
        required
        type="password"
        label="密码"
        placeholder="请输入密码"
        error-message="密码格式错误"
      />
    </van-cell-group>
    <v-btn block color="success" @click="LoginAction" :loading="openLoading">
      登录</v-btn
    >
  </div>
</template>

<script>
import { Toast } from 'vant'

import axios from 'axios'

import url from '@/API/serviceAPI.config'
export default {
  data() {
    return {
      username: '',
      password: '',
      openLoading: false,
      usernameErrorMsg: '',
      passwordErrorMsg: '',
    }
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success('您已经登录了')
      // this.$router.push('/')
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go('-1')
    },

    LoginAction() {
      this.axiosLoginUser() && this.checkForm()
    },
    axiosLoginUser() {
      this.openLoading = true
      axios({
        url: url.loginUser,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.userName }
              setTimeout(() => {
                resolve()
              }, 500)
            })
              .then(() => {
                Toast.success('登陆成功')
                this.$router.push('/')
              })
              .catch((err) => {
                Toast.fail('登陆状态保存失败')
                console.log(err)
              })
          } else {
            Toast.fail('登录失败')
            this.openLoading = false
          }
        })
        .catch((error) => {
          Toast.fail('登录失败')
          this.openLoading = false
          console.log(error)
        })
    },

    checkForm() {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名称不能小于5位数'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '用户密码长度不能小于6位数'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }

      return isOk
    },
  },
}
</script>

<style lang="scss" scoped></style>
