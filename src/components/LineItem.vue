<template>
    <div>
        <p :class="{ active : line.active}">
          <b-button :class="{ activeButton : line.active}" @click="$emit('changeTime', line)"> {{line.formattedTime()}} </b-button>
          {{line.text}}
        </p>
    </div>
</template>

<script>
export default {
  name: 'LineItem',
  props: ['line']
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
.activeButton {
  background-color: red;
}

</style>
