const PRODUCTUSERS = {
    list: (id) => ({
        url: `/ai_products/${id}`,
        method: 'post'
    }),
    productUser: (id) => ({
        url: `/product_user/${id}`,
        method: 'get'
    }),
    appendUser: {
        url: '/product_append_user',
        method: 'post'
    }
};

export default PRODUCTUSERS;