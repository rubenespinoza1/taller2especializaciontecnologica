<template>
  <div id="peliculas">
    <h1>Proximas Peliculas</h1>
    <ol>
      <li v-for="pelicula in peliculas" :key="pelicula.id">
        <button @click="seeMovie(pelicula.id)">{{ pelicula.title }}</button>
      </li>
    </ol>

    <div id="botones-navegacion">
      <button @click="seeMore">Pagina Siguiente</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ApiService from "@/services/api.service.js";
import Movie from "@/models/Movie";

export default {
  data() {
    return {
      peliculas: [],
      current_page: 1,
    };
  },
  mounted() {
    this.getInitialMovies();
  },
  methods: {
    getInitialMovies() {
      let response_data = ApiService.getNowPlaying(this.current_page);
      response_data.then(({ data }) => {
        for (let i = 0; i < 20; i++) {
          this.peliculas.push(new Movie(data.results[i]))
          //console.log(new Movie(data.results[i]))
        }
      });
    },
    seeMore() {
      let response_data = ApiService.getNowPlaying(++this.current_page);
      response_data.then(({ data }) => {
        for (let i = 0; i < 20; i++) {
          this.peliculas.push(new Movie(data.results[i]))
          //console.log(new Movie(data.results[i]))
        }
      });
      console.log(this.peliculas)
    },
    seeMovie(id){
      this.$router.push({path: `/peliculas/${id}`})
    }
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196f3;
  padding: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>