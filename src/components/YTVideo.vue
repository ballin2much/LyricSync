<template>
    <div>
        <youtube :video-id="ytid" ref="youtube" @playing="refreshtime()"/>
        <p>{{ ytid }}</p>
        <form @submit.prevent="addLine">  
          <input type="text" name="line" placeholder="Add Lyrics..." v-model="line">
          <input type="submit" value="Enter Lyrics" class="btn">
        </form>
        <LineList :lines="lines" v-on:changeTime="skipTo"/>       
    </div>
</template>

<script>
import LineList from './LineList.vue';
let intID = null;

export default {
    name: 'YTVideo',
    data: () => {
      return {lines: []};
    },
    components: {
      LineList
    },
    props: {
        ytid: String
    },
    methods: {
        async getDuration() {
          return await this.$refs.youtube.player.getDuration();
        },
        async getTime() {
          return await this.$refs.youtube.player.getCurrentTime();
        },
        async addLine() {
          let totalSeconds = await this.getTime();
          const newLine = {
            timeStamp: totalSeconds,
            text: this.line,
            formattedTime: () => {
              let hours = Math.floor(totalSeconds / 3600);
              totalSeconds %= 3600;
              let minutes = Math.floor(totalSeconds / 60);
              let seconds = Math.round(totalSeconds % 60);
              return hours+":"+minutes+":"+seconds;
            },
            active: true
          }
          this.addTodo(newLine);
        },
        addTodo(newLine) {
          this.lines.forEach(line => line.active = false);
          this.lines = [...this.lines, newLine];
        },
        async skipTo(lineI) {
          this.lines.forEach(line => line.active = false);
          lineI.active = true;
          await this.$refs.youtube.player.seekTo(lineI.timeStamp, true);
        },
        async refreshtime() {
          if (intID != null) clearInterval(intID);
          intID = setInterval( async () => {
            let time = await this.$refs.youtube.player.getCurrentTime();
            let temp = null;
            this.lines.forEach((line) => {
              console.log("Time:" + time);
              console.log("Line:" + line.timeStamp);
              if (temp == null) console.log("Temp:" + temp);
              if (temp != null) console.log("Temp:" + temp.timeStamp);
            line.active = false;
              if (temp == null) {
                if (line.timeStamp < time) {
                  temp = line;
                }
              } else if ((line.timeStamp < time) && (line.timeStamp > temp.timeStamp)) {
                temp = line;
              }
            }); 
            if (temp != null) temp.active = true;
          }, 1000);
        }
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
</style>
