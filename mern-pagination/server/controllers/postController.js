const Post = require("../models/Post");


const handler = {};

handler.getAllPosts = async (req, res) => {
    try {
        let queryData = Post.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * pageSize;
        const total = await Post.countDocuments();
        const totalPages = Math.ceil(total / pageSize);

        if (page > totalPages) return res.status(404).json({ status: 'failed', message: 'No page Found!' });


        queryData = queryData.skip(skip).limit(pageSize);
        const posts = await queryData;


        res.status(200).json({
            status: true,
            count: posts.length,
            page, totalPages,
            data: posts
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = handler;