<template>
  <div>
    <div class="title">{{ floorname1 }}</div>

    <div class="title">{{ floorname2 }}</div>

    <div class="title">{{ floorname3 }}</div>
  </div>
</template>

<script>
export default {
  props: ['floorname1', 'floorname2', 'floorname3'],
}
</script>

<style>
.title {
  align-items: center;
  text-align: center;
  /* font-size: 0.3rem;/ */
  /* height: 1rem;
  line-height: 1rem; */
  color: #e5017d;
  /* border-bottom: 1px solid #ddd; */
}
</style>
