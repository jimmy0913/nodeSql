<template>
  <div class="hello">
      <form class="search_form" @submit.prevent="searchForm">
        <input class="input" type="text" placeholder="请输入图书名称" v-model="book_id">
        <button class="primary_btn">搜索</button>
      </form>
      <button class="add_btn primary_btn" @click="addHandle">新增</button>
     <table>
        <tr>
          <th>书名</th>
          <th width="280px">作者</th>
          <th width="200px">发布时间</th>
          <th width="160px">操作</th>
        </tr>
        <tr v-if="!is_loading && listArr.length" v-for="item in listArr" :key="item.book_id">
            <td>{{item.book_name}}</td>
            <td>{{item.author_name}}</td>
            <td>{{item.publish_time}}</td>
            <td>
              <a href="javascript:void(0);" @click.self.prevent="modifyBook(item.book_id)">修改</a>
              <a href="javascript:void(0);" @click.self.prevent="delBookFn(item.book_id)">删除</a>
            </td>
        </tr>
        <tr v-if="!is_loading && !listArr.length">
          <td colspan="4">暂无数据</td>
        </tr>
        <tr v-if="is_loading">
          <td colspan="4">努力加载中...</td>
        </tr>
     </table>
     <div class="cover_box" v-show="show_dialog" @click="show_dialog = false"></div>
     <div class="overlay_box" v-show="show_dialog">
        <div class="sub_title">
            <h3>新增书籍</h3>
            <a href="javascript:void(0);" @click="show_dialog = false">x</a>
        </div>
        <div class="content">
            <div class="option_group">
                <label for="">书籍：</label>
                <div class="option_cont">
                  <input class="input" type="text" placeholder="请输入书籍名称" v-model="new_name">
                </div>
            </div>
            <div class="option_group mt20">
                <label for="">作者：</label>
                <div class="option_cont">
                  <input class="input" type="text" placeholder="请输入作者名" v-model="new_author">
                </div>
            </div>
            <div class="option_group mt20">
                <label for="">发布时间：</label>
                <div class="option_cont">
                  <input class="input" type="date" placeholder="请选择发布时间" v-model="new_publish">
                </div>
            </div>

            <div class="submit_box">
              <button class="cancel_btn" @click="show_dialog = false">取消</button>
              <button class="primary_btn ml20" @click="addBooks">确定</button>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import '@/assets/css/base.css';
import common from '@/assets/js/common.js';

export default {
  name: 'BookList',
  data () {
    return {
      listArr: [],
      book_id:'',
      is_loading:false,
      new_name:'',
      new_author:'',
      new_publish:'',
      show_dialog: false,
      fullscreenLoading: false,
      cur_id:'',//当前编辑的book_id
    }
  },
  methods: {
      getList() {
        let _this = this;
        _this.is_loading = true;

        
        axios.get('/api/book_list').then(function (ret) {
          _this.is_loading = false;
          if(ret.data.status.code ==200 && ret.data.status.message=='success'){
              _this.listArr = ret.data.data;  
          }
        })
        .catch(function (error) {
          console.log(error);
        })

      },

      searchForm(){
        let _this = this;
        _this.is_loading = true;
        axios.get('/api/search_book_name/' + _this.book_id).then(function (ret) {
          _this.is_loading = false;
          if(ret.data.status.code ==200 && ret.data.status.message=='success'){
             _this.listArr = ret.data.data;  
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        return false;
      },
      addHandle(){
          this.show_dialog = true;
          this.cur_id = '';
          this.new_name='';
          this.new_author='';
          this.new_publish='';
      },
      addBooks(){
          let _this = this;

          if(common.isEmpty(_this.new_name)){
              _this.$alert('书籍名称不能为空', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
              });
          }else if(common.isEmpty(_this.new_author)){
              _this.$alert('作者名不能为空', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  
                }
              });
          }else{

              _this.fullscreenLoading = true;

              console.log(_this.cur_id);
              
              if(_this.cur_id){
                  axios.post('/api/update_book/' + _this.cur_id,{
                      'b_name': _this.new_name,
                      'a_name': _this.new_author,
                      'p_time': _this.new_publish,
                  }).then(function (ret) {
                    _this.fullscreenLoading = false;
                    if(ret.data.status.code ==200 && ret.data.status.message=='success'){
                       _this.$alert('修改成功', '提示', {
                         confirmButtonText: '确定',
                         callback: action => {
                            _this.show_dialog = false;
                            _this.getList();
                         }
                       });
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  })  
              }else{
                  axios.post('/api/add_book',{
                      'b_name': _this.new_name,
                      'a_name': _this.new_author,
                      'p_time': _this.new_publish,
                  }).then(function (ret) {
                    _this.fullscreenLoading = false;
                    if(ret.data.status.code ==200 && ret.data.status.message=='success'){
                       _this.$alert('添加成功', '提示', {
                         confirmButtonText: '确定',
                         callback: action => {
                            _this.new_name='';
                            _this.new_author='';
                            _this.new_publish='';
                            _this.show_dialog = false;
                            _this.getList();
                         }
                       });
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              }
              
          }
      },

      delBookFn(id){
          let _this = this;

          _this.$confirm('你确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post('/api/del_book/' + id).then(function (ret) {
              if(ret.data.status.code ==200 && ret.data.status.message=='success'){
                  _this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
              }

              _this.getList();
            })
            .catch(function (error) {
              console.log(error);
            })
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },


      modifyBook(id){
        let _this = this;
        axios.get('/api/get_book_by_id/' + id).then(function (ret) {
          if(ret.data.status.code ==200 && ret.data.status.message=='success'){
              
              let result = ret.data.data[0];
              _this.cur_id = id;

              _this.new_name = result.book_name;
              _this.new_author = result.author_name;
              _this.new_publish = result.publish_time;
              _this.show_dialog = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        return false;
      },
  },
  created(){
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

a {
  color: #42b983;
}

.search_form{
  margin:30px 0;
}

.hello{
  padding:0 20px;

   table{
    width:100%;
   }
   table,th,tr,td{
    border-collapse: collapse;
    border:1px solid rgb(206,206,206);
   }

   td,tr,th{
    line-height: 36px;
    padding-left: 8px; 
   }
  
    .add_btn{
      float: left;
      margin-bottom:20px;
    }

    .search_form{
      width: 280px;
      border:1px solid rgb(206,206,206);
      border-radius: 3px;
      display: flex;

      input{
        flex:1;
        border:0;
      }
    }
}
.cover_box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background: rgba(0,0,0,.6);
}
.overlay_box{
  position: fixed;
  width: 380px;
  height: 400px;
  left: 50%;
  top: 50%;
  z-index: 2;
  background: white;
  transform:translate(-50%,-50%);
}
.sub_title{
  height: 40px;
  padding:0 10px;
  position: relative;
  border-bottom: 1px solid rgb(206,206,206);
  text-align: left;
  h3{
    line-height: 40px;
  }

  a{
    position: absolute;
    right: 10px;
    top: 10px;
    color:rgb(64,64,64);
  }
}

.content{
  padding: 20px;
}
.mt20{
  margin-top: 20px;
}
.option_group{
  height: 30px;
  position: relative;
  padding-left: 80px;
  text-align: left;

  label{
    position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    line-height: 30px;
  }

  .option_cont{
    min-height: 30px;
  }
}

.submit_box{
  position: absolute;
  height: 40px;
  bottom: 0;
  right: 30px;
}
.ml20{
  margin-left: 30px;
}
</style>
