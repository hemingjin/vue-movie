<template>
    <div class="x-page">
        <a href="javascript:void(0);" :class="{'disabled': currentPage == 1}" @click="go(1)">
            <span>首页</span>
        </a>
        <a href="javascript:void(0);" :class="{'disabled': currentPage == 1}" @click="prev()">
            <span>上一页</span>
        </a>
        <a href="javascript:void(0);" v-for="n in pages" :class="{'active': currentPage == n}">
            <span v-if="n!=0"  @click="go(n)">{{n}}</span>
            <span v-else>···</span> 
        </a>
        <a href="javascript:void(0);" :class="{'disabled': currentPage == maxPage}" @click="next()">
            <span>下一页</span>
        </a>
        <a href="javascript:void(0);" :class="{'disabled': currentPage == maxPage}" @click="go(maxPage)">
            <span>末页</span>
        </a>        
        <div class="x-page-jump" v-if="showJump">
            <span>跳转到</span>
            <input type="text" class="x-page-input" v-model="jumpPage">
            <button type="button" class="x-page-btn" @click="jump">确定</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                currentPage: this.current,
                jumpPage: 1
            }
        },
        props: {
            current: {  //当前页码
                type: Number,
                default() {
                    return 1
                }
            },
            max: {  //，最大页码数
                type: Number
            },
            // 是否显示跳转功能，默认false
            showJump: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        mounted() {
            
        },
        computed: {
            // 将要显示的页码用计算属性的方式显示出来
            pages() {
                let maxPage = this.max,
                    currentPage = this.currentPage,
                    arr = [];
                //总页码小于等于5， 全部显示出来
                if(maxPage <= 5){
                    for(let i = 1; i <= maxPage; i++){
                        arr.push(i);
                    }
                    return arr;
                }
                //总页码大于5时
                //当前页码小于等于3时， 显示前三页，最后一页，中间页码显示为省略号
                if(currentPage <= 3){
                    return [1,2,3,0,maxPage];  //0表示省略号或其他， 这里设置为省略号
                }
                //当前页码大于等于最大页码数-2时， 显示后三页，第一页，中间页码显示为省略号
                if(currentPage >= maxPage-2){
                    return [1, 0, maxPage-2, maxPage-1, maxPage];
                }
                //当前页码大于3，并且小于最大页码数-2时， 显示中间三页，第一页，最后一页，其他显示为省略号
                return [1, 0, currentPage-1, currentPage, currentPage+1, 0, maxPage];
            }
        },
        methods: {
            //页码跳转
            go(page) {
                if(this.currentPage != page){
                    this.currentPage = page;
                    this.jumpPage = page;
                    //将分页子组件的页码，通过自定义事件传递给父组件
                    this.$emit('page-change', page); 
                }
            },
            //上一页
            prev() {
                const current = this.currentPage;
                if(current <= 1){ return false; }
                this.go(current-1);
            },
            //下一页
            next() {
                const current = this.currentPage; 
                if(current >= this.maxPage){ return false; }   
                this.go(current + 1)
            },
            //跳转到
            jump() {
                var page = this.jumpPage;
                if(/^[0-9]*$/.test(page)){
                    if(page <1){
                        this.go(1);
                    }else if(page > this.maxPage){
                        this.go(this.maxPage);
                    }else{
                        this.go(parseInt(page));
                    }
                }else{
                    console.log('页码格式错误')
                }
            }
        }
    }
</script>
<style>
.x-page{
    position: relative;
    margin: 20px 0;
    text-align: center;
}

.x-page a{
    display: inline-block;
    height: 28px;
    line-height: 28px;
    border: 1px solid #dadada;
    font-size: 0;
    color: #666;
    border-radius: 2px;
    background-color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.x-page a span{
    display: inline-block;
    padding: 0 12px;
    font-size: 12px;
}

.x-page a+a{
    margin-left: 4px;
}
.x-page a:first-of-type{
    border-radius: 2px 0 0 2px;
}
.x-page a:last-of-type{
    border-radius: 0 2px 2px 0;
}
.x-page a:hover{
    background-color: #eee;
}
.x-page a.active{
    border: 1px solid #2196F3;
    background-color: #2196F3;
    color: #fff;
}
.x-page a.disabled{
    color: #ccc;
    cursor: not-allowed;
    pointer-events: none;
}
.x-page-jump{
    display: inline-block;
        margin-left: 20px;
    height: 28px;
    line-height: 28px;
}
.x-page-jump span{
    font-size: 12px;
}
.x-page-jump .x-page-input{
    display: inline-block;
    width: 40px;
    height: 28px;
    padding: 0 10px;
    margin-left: 10px;
    font-size: 12px;
    border: 1px solid #dadada;
    border-radius: 2px;
    text-align: center;    
}
.x-page-jump .x-page-btn{
    height: 28px;
    padding: 0 10px;
    margin-left: 10px;
    border: 1px solid #dadada;
    background: #fff;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;
}
</style>