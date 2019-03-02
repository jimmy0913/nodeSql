const api = require('./../api/api');
const baseUrl = '/api';

const express = require('express');
const router = express.Router();


router.get(baseUrl + '/', api.testApi);

//首页
router.get(baseUrl + '/book_list', api.book_list);

//搜索
router.get(baseUrl + '/search_book_name/:book_name', api.search_book_name);

//新增
router.post(baseUrl + '/add_book/', api.add_book);

//修改保存
router.post(baseUrl + '/update_book/:id', api.update_book);

//通过id查找book
router.get(baseUrl + '/get_book_by_id/:id', api.get_book_by_id);

//删除
router.post(baseUrl + '/del_book/:book_id',api.del_book);



module.exports = router;