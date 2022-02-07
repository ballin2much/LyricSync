<template>
    <div>
        <div v-for="line in lines" v-bind:key="line.timeStamp">
          <LineItem :line="line" v-on:changeTime="$emit('changeTime', line)"/>
        </div>
    </div>
</template>

<script>
import LineItem from './LineItem.vue'

export default {
  name: 'YTVideo',
  components: {
    LineItem
  },
  props: {
    lines: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.active {
  color: red;
}
</style>
