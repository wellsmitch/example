/**
 * Created by jameswatt2008 on 2017/5/2.
 */
//封装运动  动画  度属性
function animate(box,obj) {
    //如果定时器存在就 结束上一次的定时器  防止出现 晃动bug
    clearInterval(box.timer)

    box.timer =  setInterval(function () {

        var falg = true;//假设已经到达目的地

        for(var key in obj){

           

            if(key == 'opacity'){
            	
            	
                var current = parseFloat(getComputedStyle(box)[key])*100;//当前坐标
                var target = obj[key]*100;//目的地的坐标
                var step = (target  - current)/8;
                //console.log(step)
                //step = Number(step.toFixed(3))
                step = (step>0 ?Math.ceil(step) :Math.floor(step))

//              console.log(step)//1-0.09 0.91
                var op = current + step
                box.style[key] = op/100;

            }else{
                var current = parseFloat(getComputedStyle(box)[key]);//当前坐标
                var target = obj[key];//目的地的坐标
                var step = (target  - current)/10;
                step = (step>0 ?Math.ceil(step) :Math.floor(step))
                //console.log(step)
                //当步长 小于0.375的时候 div 就不会移动了，就可能出现 永远到不了目的地
                box.style[key] = current + step +'px';
            }


            //停止定时器 ，必要所有的属性 都到达目的地以后才能停止

            if(current != target){
                //就没有到达目的地
                falg = false;
            }

        }
        //如果全部都到达目的地 就可以清除定时器
        if(falg == true){
            clearInterval(box.timer)
        }





    },50);
}