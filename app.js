const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://netninja:jala1856@netninjanode.weeyntm.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// listen for requests
// app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// morgan middleware
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/single-blog', (req, res) => {
//     Blog.findById('64c00a236a439bfe9578b57f')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// custom middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });

// routes
app.get('/', (req, res) => {
    // res.send('<p> Home Page </p>');
    // res.sendFile('./views/index.html', { root: __dirname });
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing.'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing.'},
    //     {title: 'How to defeat browser', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing.'}
    // ];
    // res.render('index', { title: 'Home', blogs }); // we can also write only blogs as both are same i.e., blogs: blogs
    res.redirect('/blogs');
});

// another custom middleware
// app.use((req, res, next) => {
//     console.log('in the next middleware:');
//     next();
// });

app.get('/about', (req, res) => {
    // res.send('<p> About Page </p>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});