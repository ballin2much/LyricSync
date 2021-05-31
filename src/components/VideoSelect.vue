<template>
    <div>
      <b-container fluid class="head justify-content-center">
        <b-row class="d-flex justify-content-center brand botspace">LyricSync</b-row>
        <b-row class="d-flex justify-content-center text-center botspace">  
          <b-form inline @submit.prevent="loadVideo(null)">  
            <b-form-input type="url" name="YTurl" placeholder="Enter Youtube URL" v-model="YTurl"></b-form-input>
            <b-button type="submit" value="Load Video">Load Video</b-button>
          </b-form>
        </b-row>
        <b-row class="d-flex justify-content-center botspace col-sm-4 center">
          <b-form-file accept=".txt" v-model="file" ref="myFile" @input="loadFile"></b-form-file>
        </b-row>
      </b-container>
      <div v-for="TID in IDT" v-bind:key="TID.ID">
        <YTVideo :ytid="TID.ID" :lines="TID.Lines"/>
      </div>   
    </div>
</template>

<script>
import YTVideo from "@/components/YTVideo.vue";

export default {
    name: 'VideoSelect',
    components: {
        YTVideo
    },
    methods: {
      loadVideo(fileText) {
        let url = this.YTurl;
        let ID = '';
        ID = this.$youtube.getIdFromUrl(url);
        console.log("File:");
        console.log(fileText);
        if (fileText == null) {
          this.IDT = [{
            ID: ID,
            Lines: []
          }];
        console.log("IDT:");
        console.log(this.IDT[0].Lines);
        } else {
          this.IDT = [{
            ID: ID,
            Lines: fileText
          }];
        }
        this.YTurl = "";
      },
      loadFile() {
        let file = this.file;
        if(!file || file.type !== 'text/plain') return;
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload =  evt => {
          let fileText = evt.target.result;
          fileText = fileText.split("\n");
          console.log(fileText);
          this.YTurl = "https://www.youtube.com/watch?v=" + fileText.shift();
          let lineArray = []
          fileText.forEach( line => {
            let totalSeconds = parseFloat(line.substring(line.lastIndexOf("[")+1,line.lastIndexOf("]")));
            let temp = {
              timeStamp: totalSeconds,
              text: line.split("] ")[1],
              formattedTime: () => {
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = Math.round(totalSeconds % 60);
                return hours+":"+minutes+":"+seconds;
              },
              active: false
            }
            lineArray.push(temp);
          });
          console.log(lineArray);
          this.loadVideo(lineArray);
        }
      }
    },
    data: () => {
        return {
            IDT: [],
            YTurl: "",
            File: null
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
  .brand {
    font-size: 20px;
    font-weight: bold;
  }
  .botspace {
    margin-bottom: 7px;
  }
  .center {
    margin-left: auto;
    margin-right: auto;
  }

</style>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
</style>
