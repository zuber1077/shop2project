const Post = require('../models/post');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'zuber',
  api_key: '215497766618556',
  api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
  // GET /posts
  async postIndex(req, res, next) {
    let posts = await Post.find({});
    res.render("posts/index", { posts });
  },

  // GET /posts/new
  postNew(req, res, next) {
    res.render("posts/new");
  },

  // POST /posts
  async postCreate(req, res, next) {
    req.body.post.images = [];
    for (const file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.post.images.push({
        url: image.secure_url,
        public_id: image.public_id
      })
    }
    let post = await Post.create(req.body.post);
    res.redirect(`/posts/${post.id}`);
  },

  // GET /posts/:id
  async postShow(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render("posts/show", { post });
  },

  // GET  /posts/:id/edit
  async postEdit(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render("posts/edit", { post });
  },

  // PUT  /posts/:id
  async postUpdate(req, res, next) {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
    res.redirect(`/posts/${post.id}`);
  },

  // DELETE  /posts/:id
  async postDestroy(req, res, next) {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
  }
};