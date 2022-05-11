<template>
  <div>
    <van-nav-bar
      title="用户注册"
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
    <v-btn block color="success" @click="registerAction" :loading="openLoading">
      马上注册</v-btn
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
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go('-1')
    },

    registerAction() {
      this.axiosRegisterUser() && this.checkForm()
    },
    axiosRegisterUser() {
      this.openLoading = true
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          console.log(response)
          if (response.data.code == 200) {
            this.$router.push('/')
            Toast.success(response.data.message + '注册成功')
          } else {
            console.log(response.data.message)
            this.openLoading = false
            Toast.fail('注册失败')
          }
        })
        .catch((error) => {
          console.log(error)
          Toast.fail('注册失败')
          this.openLoading = false
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
