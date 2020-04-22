<template>
    <div>
        <form @submit.prevent="loadVideo">  
          <input type="text" name="Youtube Video" placeholder="Enter Youtube URL" v-model="YTURL">
          <input type="submit" value="Load Video" class="btn">
        </form>
        <div v-for="ID in IDT" v-bind:key="ID">
          <YTVideo :ytid="ID" />
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
        loadVideo() {
            let url = this.YTURL;
            let ID = '';
            url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            if(url[2] !== undefined) {
                ID = url[2].split(/[^0-9a-z_-]/i);
                ID = ID[0];
            } else {
                ID = url;
            }
            this.IDT = [ID];
        }
    },
    data: () => {
        return {
            IDT: []
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
