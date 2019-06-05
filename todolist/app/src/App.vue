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
          <span><input @change="handleCheck(item.id)" :disabled="!!item.checked" v-model="item.checked" type="checkbox"></span>
          <span style="flex:1;" :style="`${item.checked ? 'text-decoration: line-through;' : ''}`">{{item.text}}</span>
          <span style="cursor: pointer;" @click="handleClose(item.id)">X</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {apiGetList, apiCheck, apiInsert, apiDelete} from './services/index.js';

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
      apiInsert({text:this.value, checked: 0}).then((res) => {
        console.log(res, 'resres');
        this.handleGetList();
        this.value = '';
      })
    },
    handleClose(id) {
      apiDelete({id}).then((res) => {
        console.log(res, 'apiDelete');
        this.handleGetList();
      })
    },
    handleCheck(id) {
      console.log(id, 'id');
      apiCheck({id}).then((res) => {
        console.log(res, 'apiCheck');
      })
    },
    handleGetList() {
      apiGetList().then((res) => {
        console.log(res, 'res');
        this.list = this.$set(this, 'list', res || []);
      })
    }
  },
  created () {
    this.handleGetList();
  }
}
</script>

<style>
</style>
