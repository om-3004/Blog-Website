// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

// blog_index - to get all the blogs and inject into the index view
// blog_details - to get a single blog 
// blog_create_get - to send back the actual form
// blog_create_post - to add a new blog
// blog_delete - to delete a blog

const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // -1 means descending order
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            // console.log(err);
            res.status(404).render('404', { title: 'Blog not found' });
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a New Blog' });
};

const blog_create_post = (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => console.log(err));
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}