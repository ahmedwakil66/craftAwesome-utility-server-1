const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const dragonNews = require('./dragon-news-data/news.json');
const dragonCategories = require('./dragon-news-data/categories.json');

app.use(cors());

app.get('/', (req, res) => {
    res.send('hi, welcome to craftAwesome utility server 1!');
})

//===========================
//==== Dragon News Starts ===
//===========================

//send all news data
app.get('/dragon-news', (req, res) => {
    res.send(dragonNews);
})

//send category data
app.get('/dragon-news-categories', (req, res) => {
    res.send(dragonCategories);
})

//send all news data for asked news category_id
app.get('/dragon-news-categories/:catId', (req, res) => {
    const id = req.params.catId;
    if (id === '0') {
        res.send(dragonNews)
    }
    else {
        const newsGroup = dragonNews.filter(n => n.category_id === id) || [];
        res.send(newsGroup)
    };
})

//send specific news data asked by news _id
app.get('/dragon-news/:newsId', (req, res) => {
    const id = req.params.newsId;
    const newsTarget = dragonNews.find(n => n._id === id) || [];
    res.send(newsTarget);
})

//send all trending news
app.get('/dragon-news-trending', (req, res) =>{
    const newsGroup = dragonNews.filter(n => n.others_info.is_trending === true) || [];
    res.send(newsGroup);
})

//send today's pick
app.get('/dragon-news-todays-pick', (req, res) =>{
    const newsGroup = dragonNews.filter(n => n.others_info.is_todays_pick === true) || [];
    res.send(newsGroup);
})

//===========================
//==== Dragon News Ends =====
//===========================



app.listen(port, () => {
    console.log('craftAwesome utility server 1 has been started...');
})