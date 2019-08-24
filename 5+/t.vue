<template>
  <div class="hello">
<div class="zhifubao" @click="alipay()">支付宝</div>
<div class="weixin" @click="weixinpay()">微信</div>
  </div>

</template>
<script type="text/ecmascript-6">
  import $ from 'jquery'

  import {Navbar, TabItem,Toast} from 'mint-ui';

  export default {
    name: "t",
    data(){
      return{
        PAYSERVER:''
      }
    },
    methods: {
      pay(id){
        var _this = this
        var ALIPAYSERVER = 'http://10.1.1.208:8080/api/1_0/order/getAlipayPaymentInfo?'+'token='+window.localStorage.token+'&order_no=1AA29039808831089';
        console.log(ALIPAYSERVER)
        var WXPAYSERVER ='gesargergeg'
          // 从服务器请求支付订单
          // var PAYSERVER='';
          if(id=='alipay'){
            _this.PAYSERVER=ALIPAYSERVER;
          }else if(id=='wxpay'){
            _this.PAYSERVER=WXPAYSERVER;
          }else{
            plus.nativeUI.alert("不支持此支付通道！",null,"捐赠");
            return;
          }
          var xhr=new XMLHttpRequest();
          xhr.onreadystatechange=function(){
            switch(xhr.readyState){
              case 4:
                if(xhr.status==200){

                  console.log(JSON.parse(xhr.responseText))
                  if(JSON.parse(xhr.responseText).code==1&&window.channels!=null){

console.log('gesrgrtg');
                    let temps = window.channels.filter((item,index)=>{
                      return item.id=id;
                    });
                    if (temps.length==0){return}
                    console.log(JSON.parse(xhr.responseText).data);
                    console.log(temps[0])
                    plus.payment.request(temps[0],JSON.parse(xhr.responseText).data,function(result){
                      // console.log('gggg')
                      plus.nativeUI.alert("支付成功！",function(){
                        back();
                      });
                    },function(error){
                      plus.nativeUI.alert("支付失败：" + error.code);
                    });
                  }else if(JSON.parse(xhr.responseText)==0){
                    console.log('数据处理异常')
                  }
                }else{
                  alert("获取订单信息失败！");
                }
                break;
              default:
                break;
            }
          };
          xhr.open('GET',_this.PAYSERVER);
          xhr.send();
      },
      alipay(){

      },
      weixinpay(){
      }
    },
    mounted(){

      var _this = this
      $('.zhifubao').click(function () {

        _this.pay('alipay')

      })
      $('.weixin').click(function () {
        this.pay('weixinpay')

      })
    }
  }
</script>

