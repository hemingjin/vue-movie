<template>
    <div class="movie-wrap">
        <router-link to="/movies">返回列表</router-link>
 
        <div class="movie-detail clear-fix" >
            <div class="movie-title">
                <span>{{movieDetail.title}}</span><span>{{movieDetail.original_title}}</span><span>({{movieDetail.year}})</span>
            </div>
            <div class="movie-section movie-info clear-fix">
                <div class="movie-img">
                    <img :src="movieDetail.images.large" alt="">
                </div>
                <div class="movie-desc">
                    <div class="desc-item">
                        <span>导演: </span>
                        <div class="item-view">
                            <span v-for="(director, index) in movieDetail.directors">
                                <a :href="director.alt" >{{director.name}}</a>
                                <i class="dir-i" v-if="index !== movieDetail.directors.length-1">/</i>
                            </span>
                        </div>
                    </div>
                    <div class="desc-item">
                        <span>编剧: </span>
                        <div class="item-view">
                            <span v-for="(writer, index)  in movieDetail.writers">
                                <a :href="writer.alt" >{{writer.name}}</a>
                                <i class="dir-i" v-if="index !== movieDetail.writers.length-1">/</i>
                            </span>
                        </div>
                    </div>
                    <div class="desc-item">
                        <span>主演: </span>
                        <div class="item-view">
                            <span v-for="(cast, index)  in movieDetail.casts">
                                <a :href="cast.alt" >{{cast.name}}</a>
                                <i class="dir-i" v-if="index !== movieDetail.casts.length-1">/</i>
                            </span>
                        </div>
                    </div>
                    <div class="desc-item">
                        <span>类型: </span>
                        <div class="item-view">
                            <span v-for="(gen, index)  in movieDetail.genres">
                                {{gen}}
                                <i class="dir-i" v-if="index !== movieDetail.genres.length-1">/</i>
                            </span>
                        </div>
                    </div>
                    <div class="desc-item">
                        <span>制片国家/地区: </span>
                        <div class="item-view">
                            <span v-for="(country, index)  in movieDetail.countries">
                                {{country}}
                                <i class="dir-i" v-if="index !== movieDetail.countries.length-1">/</i>
                            </span>
                        </div>
                    </div>
                    <div class="desc-item">
                        <span>语言: </span>
                        <div class="item-view">
                            <span v-for="(language, index)  in movieDetail.languages">
                                {{language}}
                                <i class="dir-i" v-if="index !== movieDetail.languages.length-1">/</i>
                            </span>
                        </div>
                    </div>
                     <div class="desc-item">
                        <span>上映日期: </span>
                        <div class="item-view">
                            <span v-for="(pubdate, index)  in movieDetail.pubdates">
                                {{pubdate}}
                                <i class="dir-i" v-if="index !== movieDetail.pubdates.length-1">/</i>
                            </span>
                        </div>
                    </div>
                    <div class="desc-item">
                        <span>片长: </span>
                        <div class="item-view">
                            <span v-for="(duration, index)  in movieDetail.durations">
                                {{duration}}
                                <i class="dir-i" v-if="index !== movieDetail.durations.length-1">/</i>
                            </span>
                        </div>
                    </div>
                    <div class="desc-item">
                        <span>又名: </span>
                        <div class="item-view">
                            <span v-for="(akaItem, index)  in movieDetail.aka">
                                {{akaItem}}
                                <i class="dir-i" v-if="index !== movieDetail.aka.length-1">/</i>
                            </span>
                        </div>
                    </div>
                     
                </div>
            </div>
            <div class="movie-section movie-summary">
                <div class="title-item">
                    <span>{{movieDetail.title}}的剧情简介</span>
                </div>
                <div class="summary-text">
                    <p>
                        {{movieDetail.summary}}
                    </p>
                </div>
            </div>
            <div class="movie-section movie-people">
                <div class="title-item">
                    <span>{{movieDetail.title}}的影片主创</span>
                </div>
                <div class="summary-text clear-fix">
                    <div class="people-item" v-for="(director, index) in movieDetail.directors">
                        <div class="p-img">
                            <img :src="director.avatars.large" alt="">
                        </div>
                        <div class="p-name">
                            <span>{{director.name}}</span>
                        </div>
                    </div>
                    <div class="people-item" v-for="(cast, index) in movieDetail.casts">
                        <div class="p-img">
                            <img :src="cast.avatars.large" alt="">
                        </div>
                        <div class="p-name">
                            <span>{{cast.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
<style lang="" scoped>
    .movie-detail{
        margin: 20px 0;
    }
    .movie-title, .title-item{
        margin-bottom: 10px;
    }
    .movie-section{
        margin-bottom: 30px;
    }
    .movie-img, .movie-desc{
        float: left;
    }
    .movie-img{
        width:140px;
    }
    .movie-img img{
        width: 100%;
        display: block;
    }
    .movie-desc{
        margin-left: 20px;
    }
    .desc-item{
        margin-bottom: 5px;
    }
    .item-view{
        display: inline-block;
        margin-left: 5px;
    }
    .item-view .dir-i{
        font-style: normal;
        margin: 0 2px;
    }
    .people-item{
        float: left;
        width: 120px;
        margin-right: 20px;
    }
    .p-img{
        width: 100%;
    }
    .p-img img{
        width: 100%;
        display: block;
    }
</style>