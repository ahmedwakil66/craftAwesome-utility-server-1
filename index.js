const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

const dragonNews = require('./dragon-news-data/news.json');
const dragonCategories = require('./dragon-news-data/categories.json');

const chefsData = require('./simply-recipes-data/chef_data.json');
const recipesData = require('./simply-recipes-data/recipes_data.json');
const qAndA = require('./simply-recipes-data/q&a_data.json');


app.use(cors());

app.get('/', (req, res) => {
    res.send('hi, welcome to craftAwesome utility server 1!');
})



//===========================
//==== Simply Recipes Starts ===
//===========================

//send all chef data
app.get('/simply-recipes/chefs', (req, res) => {
    res.send(chefsData);
})


//building category data from all recipe and sending it
app.get('/simply-recipes/categories', (req, res) => {
    const categories = [];
    const catData = [];
    recipesData.forEach(recipe => {
        const recipeCat = recipe.category;
        if(categories.indexOf(recipeCat) === -1){
            categories.push(recipeCat);
            catData.push({
                category: recipe.category,
                image: recipe.image
            });
        }
    });
    res.send(catData);
})


//send all recipes for a specific category
app.get('/simply-recipes/categories/:catName', (req, res) => {
    const catName = req.params.catName;
    const categoryItems = recipesData.filter(recipe => recipe.category === catName) || [];
    res.send(categoryItems);
})


//send specific recipe data
app.get('/simply-recipes/chef/:chefId', (req, res) => {
    const id = req.params.chefId;
    const chef = chefsData.find(chef => chef._id === id);
    const chefRecipes = recipesData.filter(recipe => recipe.chef_id === id) || [];
    res.send({chef, chefRecipes});
})


//send today's pick
app.get('/simply-recipes/todays-pick', (req, res) => {
    res.send(recipesData.slice(0 ,1));
})


//send all q&a data
app.get('/simply-recipes/q-and-a', (req, res) => {
    res.send(qAndA);
})
//===========================
//==== Simply Recipes Ends ===
//===========================



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
    console.log(`craftAwesome utility server 1 has been started to port ${port}...`);
})