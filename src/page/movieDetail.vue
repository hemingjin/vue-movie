<template>
    <div>
        <router-link to="/movies">返回列表</router-link>
        movieDetail

        {{movieId}}
        {{movieDetail.title}}
    </div>
</template>
<script>
    import {getMovieDetails} from 'api/api.js'

    export default {
        data() {
            return {
                movieDetail: {},
                movieId: '',
            }
        },
        created() {
            this.getDetails();
        },
        mounted() {
            
        },
        methods: {
            //获取电影详情
            getDetails() {
                this.movieId = this.$route.params.id; 
                console.log(this.movieId)
                getMovieDetails(this.movieId).then( (res) => {
                    console.log(res);
                    this.movieDetail = res;
                }).catch( (err) => {

                })
            }
        },
        watch: {
            '$route': 'getDetails'
        }
    }

</script>
<style lang="">
    
</style>