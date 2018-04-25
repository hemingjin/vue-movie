<template>
    <div class="movie-wrap">
        moveList
        <div class="movie-list">
            <div class="list-title">
                <span>{{listTitle}}</span>
            </div>
            <div class="movie-view clear-fix" >
                <movie-item :movie-list="movieList" @getMovie="getMovie"></movie-item>  
            </div>
            <vue-page :max="maxPage" :current="currentPage" v-on:page-change="pageChange"></vue-page>
        </div>
    </div>
   
</template>
<script>
    import page from 'components/page/page'
    import movieItem from 'components/movieItem/movieItem'
    import {getMovies} from 'api/api.js'

    const url = '/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b';
    export default {
        data() {
            return {
                movieList: [],
                listTitle: '',
                currentPage: 1,
                count: 18,
                maxPage: 0,
                total: 0,
            }
        },
        created() {
            this.getMovieList();
        },
        computed:{
            // maxPage() {
            //     return Math.ceil(this.total / this.count);
            // }
        },
        methods: {
            //获取电影top250列表
            getMovieList() {
                getMovies(url + '&start=0&count='+this.count).then( (res) => {
                    this.listTitle = res.title;
                    this.movieList = res.subjects;
                    this.total = res.total;
                    this.maxPage = Math.ceil(this.total / this.count);
                }).catch( (err) => {
                    console.log(err)
                })
            },
            //分页跳转
            pageChange(page) {
                var number = page == 1 ? 0 : (this.count * (page-1) + 1 );
                this.movieList = [];
                getMovies(url + '&start='+number+'&count='+this.count).then( (res) => {
                    this.movieList = res.subjects;
                }).catch( (err) => {
                    console.log(err)
                })
            },
            // /路由跳转
            getMovie(id) {
                console.log(id)
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
            'vue-page': page,
            'movie-item': movieItem
        }
    }

</script>
<style lang="" scoped>
    .list-title{
        padding: 10px 0;
    }
    
</style>