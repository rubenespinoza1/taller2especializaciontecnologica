<template>
  <div>
    <div v-if="this.movieFound" class="d-flex align-items-stretch">
      <img
        class="sel-movie-card"
        :src="this.movie.poster_path"
        :alt="this.movie.poster_path"
      />
      <div class="d-flex flex-column">
        <div class="p-2 label title">
          {{ this.movie.title }} ({{ this.movie.release_date }})
        </div>
        <div class="p-2 label">
          Generos:
          <label
            v-for="genre in this.movie.genres"
            :key="genre.name"
            class="label genres"
            >{{ genre.name }} <label> </label
          ></label>
        </div>
        <div class="p-2 label">
          Votos:
          <label v-if="this.movie.vote_average >= 7.0">
            <div class="vote-circle -green">
              {{ this.movie.vote_average }}
            </div>
          </label>
          <label v-else-if="this.movie.vote_average >= 4.0">
            <div class="vote-circle -yellow">
              {{ this.movie.vote_average }}
            </div>
          </label>
          <label v-else>
            <div class="vote-circle -red">
              {{ this.movie.vote_average }}
            </div>
          </label>
          
          <label class="vote-total">({{ this.movie.vote_count }} votos)</label>
        </div>
        <div class="p-2 label">
          Popularidad: <label class="genres"> {{ this.movie.popularity}} </label>
        </div>
        <div class="p-2 label">
          Sinopsis:
          <label class="label genres">{{ this.movie.overview }}</label>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>404 Pelicula no encontrada</h1>
      
    </div>

    <div>
      <button @click="goBack" class="btn btn-primary">Volver</button>
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
      movie: null,
      movieFound: false,
    };
  },
  mounted() {
    this.loadMovieDetails();
  },
  methods: {
    loadMovieDetails() {
      let response_data = ApiService.getMovie(this.$route.params.id);

      response_data.then(({ data }) => {
        //this.movie = movie
        this.movie = new Movie(data);
        if (this.movie != null) {
          this.movieFound = true;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.star-container{
  padding: 2px;
  max-width: 35px;
  max-height: 35px;
}
.sel-movie-container {
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-gap: 5px;
  width: 100%;
  height: 100%;
}
.sel-movie-card {
  padding: 10px;
  text-align: center;
  max-width: 250px;
  max-height: 500px;
  border: red;
  border-radius: 2rem;
}
.label {
  text-align: left;
}
.genres {
  text-shadow: 0.5px 0.5px black;
}

.title {
  font-weight: 1000;
  font-size: 25px;
}

.vote-total {
  color: gray;
  font-style: italic;
}

.vote-circle {
  padding: 5px;
  text-align: center;
  max-width: 40px;
  max-height: 40px;
  border-color: black;
  border-radius: 50rem;
  color: white;
}

.-red {
  background: red;
}

.-yellow {
  background: yellow;
}

.-green {
  background: green;
}

.tags {
  font-weight: 700;
}
</style>