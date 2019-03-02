import service from './request';

export const getBooksList = data => {
    return service({
        url: 'api/book_list',
        method: 'get',
        data
    })
};

