<template>
    <div>
      <b-container fluid class="head justify-content-center">
        <b-row>
          <b-col class="text-right align-self-center brand">LyricSync</b-col>
          <b-col>  
            <b-form inline @submit.prevent="loadVideo">  
              <b-form-input type="url" name="YTurl" placeholder="Enter Youtube URL" v-model="YTurl"></b-form-input>
              <b-button type="submit" value="Load Video">Load Video</b-button>
            </b-form>
          </b-col>
          <b-col>
            <b-form-file accept=".txt" v-model="file" ref="myFile" @input="loadFile"></b-form-file>
          </b-col>
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
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
          ID = url[2].split(/[^0-9a-z_-]/i);
          ID = ID[0];
        } else {
          ID = url;
        }
        ID = ID[0];
        if (fileText == null) {
          this.IDT = [{
            ID: ID,
            Lines: []
          }];
        } else {
          this.IDT = [{
            ID: ID,
            Lines: fileText
          }];
        }
        console.log("IDT:");
        console.log(this.IDT);
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
          this.YTurl = fileText.shift();
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
  .head {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 7px
  }
  .brand {
    font-size: 20px;
    font-weight: bold;
  }

</style>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
</style>
