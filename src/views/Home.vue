<template>
  <canvas ref="screen" width="640" height="480"/>
</template>

<script lang="ts">
import createGame from '@/Game';
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    const canvas: any = this.$refs.screen;
    const context = canvas.getContext('2d');

    createGame(context);
  }
});
</script>
