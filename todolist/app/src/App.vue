<template>
  <div id="app">
    <h1>TODOLIST</h1>
    <div>
      <input v-model="value" type="text">
      <button @click="handleAdd">点击添加</button>
    </div>
    <div>
      <ul style="width: 400px;border: 1px solid #ccc;" v-show="list.length">
        <li v-for="(item, index) in list" :key="index" style="display: flex;justify-content: space-between;">
          <span><input :disabled="item.check" v-model="item.check" type="checkbox"></span>
          <span style="flex:1;" :style="`${item.check ? 'text-decoration: line-through;' : ''}`">{{item.text}}</span>
          <span style="cursor: pointer;" @click="handleClose(index)">X</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {apiGetList} from './services/index.js';

export default {
  name: 'app',
  data() {
    return {
      value: '',
      list: []
    }
  },
  methods: {
    handleAdd() {
      this.list.push({text:this.value, check: false});
      this.value = '';
    },
    handleClose(index) {
      this.list.splice(index, 1);
    }
  },
  created () {
    apiGetList().then((res) => {
      console.log(res, 'res');
      this.list = this.$set(this, 'list', res || []);
    })
  }
}
</script>

<style>
</style>
