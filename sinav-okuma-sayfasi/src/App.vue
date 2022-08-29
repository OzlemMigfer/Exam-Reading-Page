<template>
    <v-app>
      <v-main>
        <ReadExam/>
      </v-main>
    </v-app>
</template>

<script>
import ReadExam from './components/ReadExam.vue';
export default {
  name: 'App',
  components: {
    ReadExam
},
  data: () => ({
    //
  }),
};
</script>