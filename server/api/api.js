const mysql = require('mysql');
const dbconfig = require('./../dbconfig');

const connection = mysql.createConnection(dbconfig);
connection.connect();

const errMsg = function(msg = 'serve error...') {
  return {
    'status': {
      'code': 500,
      'message': msg
    }
  }
}


module.exports = {
  'testApi': (req, res) => {
    res.send('请求后台API接口成功！');
  },
  'book_list': (req, res) => {
    const sql = 'SELECT * FROM books_list';

    connection.query(sql, (err, result) => {
      if (err) {
        var ret = errMsg(err.message);
        return res.json(ret);
      }

      console.log(result);
      
      res.json({
        'status':{
            'code':200,
            'message':'success',
        },
        'data':result
      });

    });
  },

  //根据name搜索书籍
  'search_book_name':(req,res)=>{
    const sql = 'SELECT * FROM books_list where book_name like ?';
    const params = '%' + (req.params.book_name || '') + '%';

    connection.query(sql, params, (err, result) => {
      if (err) {
        var ret = errMsg(err.message);
        return res.json(ret);
      }

      console.log(result);
      
      res.json({
        'status':{
            'code':200,
            'message':'success',
        },
        'data':result
      });

    });
  },

  add_book: (req,res)=>{
      const sql = 'INSERT INTO books_list(book_name,author_name,publish_time) VALUES(?,?,?)';
      const postJson = req.body;

      const params = [];
      params.push(postJson.b_name);
      params.push(postJson.a_name);
      params.push(postJson.p_time);

      connection.query(sql, params, (err, result) => {
        if (err) {
          var ret = errMsg(err.message);
          return res.json(ret);
        }

        console.log(result);
        
        res.json({
          'status':{
              'code':200,
              'message':'success',
          },
          'data':result
        });

      });
  },

  update_book: (req,res)=>{
      

      const id = req.params.id;

      const book_name = req.body.b_name;
      const author_name = req.body.a_name;
      const publish_time = req.body.p_time;
      const sql = "UPDATE books_list set book_name = '" + book_name + "', author_name = '"+ author_name +"', publish_time = '"+ publish_time +"' where book_id = " + id ;

      console.log(sql);
      connection.query(sql, (err, result) => {
        if (err) {
          var ret = errMsg(err.message);
          return res.json(ret);
        }

        console.log(result);
        
        res.json({
          'status':{
              'code':200,
              'message':'success',
          },
          'data':result
        });

      });
  },

  del_book: (req,res)=>{
      const sql = 'DELETE FROM books_list WHERE book_id=?';
      const params = req.params.book_id;
      console.log(params);

      connection.query(sql, params, (err, result) => {
        if (err) {
          var ret = errMsg(err.message);
          return res.json(ret);
        }

        console.log(result);
        
        res.json({
          'status':{
              'code':200,
              'message':'success',
          },
          'data':result
        });

      });
  },


  get_book_by_id: (req,res)=>{
      const sql = 'SELECT * FROM books_list WHERE book_id=?';
      const params = req.params.id;
      console.log(params);

      connection.query(sql, params, (err, result) => {
        if (err) {
          var ret = errMsg(err.message);
          return res.json(ret);
        }

        console.log(result);
        
        res.json({
          'status':{
              'code':200,
              'message':'success',
          },
          'data':result
        });

      });
  }

}
