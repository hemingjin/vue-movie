<template>
    <div class="movie-wrap">
        moveList
        <div class="movie-list">
            <div class="list-title">
                <span>{{listTitle}}</span>
            </div>
            <div class="movie-view clear-fix" >
                <div class="movie-item" v-for="(movie, index) in movieList" @click="getMovieDetail(movie.id)">
                    <div class="movie-img">
                        <img :src="movie.images.large" alt="">
                    </div>
                    <div class="movie-subject">
                        <span>{{movie.title}}</span>
                    </div>
                </div>
            </div>
            <vue-page :max="maxPage" :current="currentPage" v-on:page-change="pageChange"></vue-page>
        </div>
    </div>
   
</template>
<script>
    import page from 'components/page/page'
    import {getMovies} from 'api/api.js'

    const url = '/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b';
    export default {
        data() {
            return {
                movieList: [],
                listTitle: '',
                currentPage: 1,
                count: 18,
                total: 0,
            }
        },
        created() {
            this.getMovieList();
        },
        computed:{
            maxPage() {
                return Math.ceil(this.total / this.count);
            }
        },
        methods: {
            //获取电影top250列表
            getMovieList() {
                getMovies(url + '&start=0&count='+this.count).then( (res) => {
                    console.log('top250:', res)
                    this.listTitle = res.title;
                    this.movieList = res.subjects;
                    this.total = res.total;
                    
                    console.log(this.maxPage)
                }).catch( (err) => {
                    console.log(err)
                })
            },
            //分页跳转
            pageChange(page) {
                console.log(page)
                var number = page == 1 ? 0 : (this.count * (page-1) + 1 );
                this.movieList = [];
                getMovies(url + '&start='+number+'&count='+this.count).then( (res) => {
                    console.log('top250:', res)
                    this.movieList = res.subjects;
                }).catch( (err) => {
                    console.log(err)
                })
            },
            // /路由跳转
            getMovieDetail(id) {
                this.$router.push({
                    path: `/movies/${id}`
                })
            }
        },
        watch: {
            '$route': function(){
                
            }
        },
        components: {
            'vue-page': page
        }
    }

</script>
<style lang="">
    .list-title{
        padding: 10px 0;
    }
    .movie-item{
        float: left;
        width: 160px;
        margin-right: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .2);
        cursor: pointer;
    }
    .movie-img{
        width: 100%;
        height: 210px;
        
    }
    .movie-img img{
        width: 100%;
        height: 100%;
    }
    .movie-subject{

    }
    .movie-subject span{
        display: block;
        padding: 10px 0;
        font-size: 14px;
        text-align: center;
    }
</style>