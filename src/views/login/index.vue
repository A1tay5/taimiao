<template>
  <div class="login">
    <header>
      <ul class="clear">
        <li class="ru_1 left" @click="router.back"><a><img src="https://img.winnine.co.th/main/login/images/hui.png"></a>
        </li>
        <li class="ru_2 left"> <img src="https://img.winnine.co.th/main/login/images/mid.png"> </li>
        <li class="ru_3 right" @click="newPage('DownLoad')"><a><img
              src="https://img.winnine.co.th/main/login/images/xia-M_new.png"></a></li>
      </ul>
    </header>
    <div class="loginBox">
      <div class="logo">
        <img src="https://img.winnine.co.th/main/login/images/m_122.jpg" alt="">
      </div>
      <div class="loginform">
        <van-field v-model="MID" placeholder="MID">
          <template #left-icon>
            <img src="https://mlive.la/main/login_h5/common/images/wod.png" alt="">
          </template>
        </van-field>
        <van-field v-model="Password" placeholder="Password">
          <template #left-icon>
            <img src="https://mlive.la/main/login_h5/common/images/mima.png" alt="">
          </template>
        </van-field>
        <van-button color="-webkit-linear-gradient(top, #ff2c71 , #ff2c49)" @click="Login" block>Login</van-button>
        <van-button style="background:transparent;margin: 20px 0;" color="#fff" type="primary" plain
          @click="newPage('register')" block>Register</van-button>
        <van-button style="background:transparent;margin: 20px 0;" color="#fff" type="primary"
          @click="newPage('Password')" plain block>Forgot
          Password</van-button>
      </div>
      <img class="fengge" src="https://mlive.la/main/login_h5/common/images/fengge.png" alt="">
      <div class="Threelogin">
        <div class="loginitem" v-for="(item, index) in loginList" :key="index">
          <img :src="item.img" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
import router from '@/router';
import { ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
const loginList = ref([
  { img: 'https://img.luckygameinter.com.au/main/all_new/icon-fb.png' },
  { img: 'https://img.luckygameinter.com.au/main/all_new/icon-tw.png' },
  { img: 'https://img.luckygameinter.com.au/main/all_new/icon-google.png' },
  { img: 'https://img.luckygameinter.com.au/main/all_new/icon-mLive.png' },
  { img: 'https://img.luckygameinter.com.au/main/all_new/icon-line.png' },
])
const MID = ref()
const Password = ref()
const newPage = (value) => {
  if (value == 'register') {
    window.open('http://account.mlive.in.th/regist/api/register_h5.php')
  } else if (value == 'register') {
    window.open('http://account.mlive.in.th/regist/api/forget_h5.php')
  } else if (value == 'DownLoad') {
    window.open('https://download.winnine.com.au/MGlobal.html')
  }
}
const Login = () => {
  router.replace('/')
}
</script>

<style scoped lang="scss">
.login {
  background-image: url('	https://img.winnine.co.th/main/login/images/meinv.png');
  background-size: 100% 100%;
  width: 100%;
  min-height: 100vh;

  header {
    width: 100%;
    height: 4rem;
    background: #fff;

    .clear {
      display: flex;
      justify-content: space-between;
      padding: 10px 30px;
      align-items: center;

      .ru_1 {
        a {
          img {
            width: 2rem;
            height: 2rem;
          }
        }

      }

      .ru_2 {
        img {
          width: 7rem;
          height: 3rem;
        }
      }

      .ru_3 {
        a {
          img {
            width: 7rem;
            height: 3rem;
          }
        }

      }
    }
  }

  .loginBox {
    height: calc(100vh - 4rem);
    background: rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 80px;

    .logo {
      margin: 30px 0 70px;

      img {
        border-radius: 16px;
        width: 200px;
      }
    }

    .loginform {
      width: 100%;

      img {
        width: 45px;
        height: 45px;
      }

      .van-field {
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin: 20px 0;
        border-radius: 15px;
      }

      :deep(.van-button__text) {
        font-size: 35px;
      }


    }

    .fengge {
      width: 100vw;
      height: 40px;
    }

    .Threelogin {
      margin: 30px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .loginitem {
        img {
          width: 80px;
        }
      }
    }
  }
}
</style>
