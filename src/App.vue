<template>
  <div id="app">
    <el-row class="fillHeight">
        <el-col :span="16" class="fillHeight">
          <Graph/>
        </el-col>
        <el-col :span="8" class="fillHeight">
          <tools/>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Graph from './components/Graph.vue'
import Tools from './components/Tools.vue'

export default {
  name: 'app',
  components: {
    Graph,
    Tools
  }
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Roboto;
    font-size: 0.9em;
  }
  hr {
    border: 0;
    height: 1px;
    background: rgba(0,0,0,0.1);
  }
  #app {
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .fillHeight {
    height: 100%;
  }
  .heading {
    font-size: 1.2em;
  }
</style>
