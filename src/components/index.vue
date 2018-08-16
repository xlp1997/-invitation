<template>
  <div class="container">
    <div class="inner">
      <div class="into"></div>
      <div class="withme"></div>
      <div class="redPacket">
        <div class="userBox">
          <div class="imgBox">
            <img v-if="userHeadPortrait"  v-imgClipping :src="userHeadPortrait" alt="">
          </div>
          <div class="userName">{{userName}}</div>
        </div>
        <div class="justGo">
          <div class="goBtn"><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.silverbullet.partner&fromcase=40003">立即加入</a></div>
        </div>
      </div>
      <div class="bottomBox">
        <div class="logoBox">
          <img src="../images/logo.png" alt="">
        </div>
        <p class="woyb">我有伴</p>
        <P class="old">中老年人健康娱乐交友平台</P>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { async } from "@/config/fetch";
export default {
  data() {
    return {
      flag: true,
      code: "", //code
      userId: "",
      userName: "",
      userHeadPortrait: ""
    };
  },
  methods: {
    //获取url中的参数
    getRequest() {
      var strs;
      var url = window.location.href; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        url = url.substr(url.indexOf("?"));
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    weixn() {
      //判断是否在微信浏览器中
      var ua = navigator.userAgent.toLowerCase();
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    pageData() {
      var getRequest = this.getRequest();
      this.userId = getRequest.userId.replace("#/", "") || 15;
      if (getRequest.code) {
        this.code = getRequest.code;
        async(
          "/userApi/bindingH5WX.do",
          {
            code: getRequest.code,
            userId: this.userId
          },
          "POST"
        )
          .then(data => {
            console.log(data);
            // alert("code:" + this.code + "userId:" + this.userId);
            if (data.code == "0") {
              console.log("3333微信登录成功");
            }
          })
          .catch(err => {
            console.log(err);
          });
        //用户头像和昵称
        async(
          "/userApi/selectH5ShareUser.do",
          {
            userId: this.userId
          },
          "POST"
        )
          .then(data => {
            console.log(data);
            if (data.code == "0") {
              this.userName = data.data.userName;
              this.userHeadPortrait = data.data.userHeadPortrait;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //获取当前用户的code
        var pageUrl = window.location.href
          .replace(/[/]/g, "%2f")
          .replace(/[:]/g, "%3a")
          .replace(/[#]/g, "%23")
          .replace(/[&]/g, "%26")
          .replace(/[=]/g, "%3d");
        var url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          "wx365c50790a16af64" +
          "&redirect_uri=" +
          pageUrl + //这里放当前页面的地址
          "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
        window.location.href = url;
      }
    }
  },
  mounted() {
    this.pageData();
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/common";
.container {
  background: url("../images/bg.png") center center no-repeat;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  .inner {
    .into {
      background: url("../images/into.png") center center no-repeat;
      width: rem(588);
      height: rem(90);
      background-size: 100% 100%;
      margin: rem(162) auto;
      margin-bottom: rem(116);
    }
    .withme {
      background: url("../images/withme.png") center center no-repeat;
      width: rem(930);
      height: rem(72);
      background-size: 100% 100%;
      margin: rem(0) auto;
    }
    .redPacket {
      background: url("../images/redpacket.png") center center no-repeat;
      width: rem(956);
      height: rem(1122);
      background-size: 100% 100%;
      margin: rem(126) auto;
      .userBox {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        .imgBox {
          margin-top: rem(64);
          margin-bottom: rem(40);
          width: rem(290);
          height: rem(294);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .userName {
          font-size: rem(72);
          line-height: rem(100);
          color: #e5c398;
        }
      }
      .goBtn {
        background: url("../images/yebtn.png") center center no-repeat;
        width: rem(594);
        height: rem(180);
        line-height: rem(160);
        background-size: 100% 100%;
        margin: rem(0) auto;
        margin-top: rem(266);
        text-align: center;
        font-size: rem(72);
        a {
          color: #eb4820;
          text-decoration: none;
        }
      }
    }
    .bottomBox {
      margin-top: rem(186);
      .logoBox {
        background: url("../images/lbg.png") center center no-repeat;
        width: rem(240);
        height: rem(240);
        background-size: 100% 100%;
        margin: rem(186) auto;
        margin-bottom: rem(90);
        border-radius: rem(28);
        img {
          width: rem(210);
          height: rem(210);
          margin-left: rem(15);
          margin-top: rem(15);
        }
      }
      .woyb {
        text-align: center;
        font-size: rem(72);
        color: #ffffff;
        margin-bottom: rem(74);
      }
      .old {
        text-align: center;
        font-size: rem(60);
        color: #ffffff;
      }
    }
  }
  .myprompt {
    position: fixed;
    top: rem(0);
    left: rem(0);
    right: rem(0);
    bottom: rem(0);
    .mymask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      .weiinnerpro {
        background-color: #fff;
        width: rem(1346);
        height: rem(540);
        border-radius: rem(20);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .close {
          display: block;
          width: rem(100);
          height: rem(100);
          text-align: center;
          line-height: rem(80);
          border-radius: 50%;
          position: absolute;
          top: rem(-50);
          right: rem(-50);
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .weiTips {
          font-size: rem(80);
          color: #666666;
          text-align: justify;
          padding: rem(100) rem(80) rem(100) rem(80);
        }
      }
    }
  }
}
</style>



