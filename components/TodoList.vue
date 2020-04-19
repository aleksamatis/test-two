<template>
  <div>
    <el-card>
      <div style="display:flex; flex-wrap:wrap; align-items:center; width: 100%">
        <div>
          <el-input type="text" placeholder="what need to be done" v-model="newTodo"></el-input>
        </div>
        <div style="margin-left:20px">
          <el-date-picker v-model="newTime" type="datetime" placeholder="Select date and time">
          </el-date-picker>
        </div>
        <div style="margin-left:auto">
          <el-button size="mini" type="success" icon="el-icon-plus" v-on:click="addTodo" :disabled="!canAdd" circle></el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <div v-for="(todo,index) in todos" :key="todo.id">
          <div style="display:flex; flex-wrap:wrap; align-items:center; padding-bottom:20px">
            <div style="width: 38%; ">
              <div v-if="!todo.editing" style="margin-left: 16px">{{todo.title}}</div>
              <div v-else >
                <el-input type="text" placeholder="what need to be done" v-model="todo.title"></el-input>
              </div>
            </div>
            <div style="width: 40%;">
              <el-date-picker v-model="todo.date" v-bind:readonly="!todo.editing" type="datetime"
                placeholder="Select date and time">
              </el-date-picker>
            </div>
            <div style="margin-left:auto; margin-right: auto">
              <el-button size="mini" v-on:click="editTodo(todo)" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" v-on:click="removeTodo(index)" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </div>
      </div>
    </el-card>
  </div>

</template>
<script>
  import service from '~/service/reminders.js';
  export default {
    data() {
      return {
        newTodo: '',
        newTime: '',
        idForTodo: 3,
        todos: []
      }
    },
    mounted() {
      this.loadReminders();
    },
    computed: {
    canAdd() {
      return this.newTodo && this.newTime;
      },
    },
    methods: {
      getToken() {
        if (localStorage.getItem('token')) {
          console.log("Using stored token");
          return Promise.resolve(localStorage.getItem('token'));
        } else {
          console.log("Requesting for token");
          return service.register().then(token => {
            localStorage.setItem('token', token);
            return token;
          });
        }
      },
      loadReminders() {
        this.getToken().then(token => {
          return service.getReminders(token).then(result => {
            this.todos = result.map(todo => {
              return {
                id: todo.id,
                title: todo.note,
                date: todo.date,
                editing: false,
                completed: false,
              };
            })
          })
        })
      },
      addTodo() {
        this.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          date: this.newTime,
          completed: false,
          editing: false,
        })
        this.newTodo = ''
        this.newTime = ''
        this.idForTodo++
      },
      editTodo(todo) {
        todo.editing = !todo.editing;
      },
      removeTodo(index) {
        this.todos.splice(index, 1)
      },
    }
  };
</script>

<style>
</style>
