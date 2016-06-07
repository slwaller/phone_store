import React from "react";
import ReactDOM from "react-dom";

require("./app.css");
var react = React;

var autoNumber = 0;
/**
 * Data model
 */
function Article(name, price) {
    this.id = ++autoNumber; // UUID for this article
    mobx.extendObservable(this, {
        name: name,
        price: price
    });
}

function ShoppingCartEntry(article) {
    this.id = ++autoNumber; // UUID for this entry
    mobx.extendObservable(this, {
        article: article,
        amount: 1,
        price: function() {
            return this.article ? this.article.price * this.amount : 0;
        }
    });
}

function ShoppingCart() {
    mobx.extendObservable(this, {
        entries: [],
        total: function() {
            return this.entries.reduce(function(sum, entry) {
                return sum + entry.price;
            }, 0);
        }
    });
}

// Some available articles
var articles = mobx.observable([
    ["Funny Bunnies", 17.63],
    ["Awesome React", 23.95],
    ["Second hand Netbook", 50.00]
].map(function(e) {
    return new Article(e[0], e[1]);
}));

// Our shopping cart
var shoppingCart = new ShoppingCart();
// With a demo item inside
shoppingCart.entries.push(new ShoppingCartEntry(articles[0]));

/**
 * UI logic
 */
var ShopDemoView = mobxReact.observer(React.createClass({
    displayName: 'ShopDemoView',
    render: function() {
        log("Rendering ShopDemoView");
        return (<table>
                <tr>
                    <td colSpan="2">
                        <button onClick={this.update}>update some items</button>
                        <button onClick={this.generate}>create a lot of items</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h2>Availale items</h2>
                        <ArticlesView articles={this.props.articles} />
                    </td>
                    <td>
                        <h2>Your shopping cart</h2>
                        <CartView cart={this.props.cart} />
                    </td>
                </tr>
            </table>)
    },

    generate: function() {
        var amount = parseInt(prompt("How many articles and entries should be created?", 1000));
        measure();
        mobx.transaction(function() {
          for(var i = 0; i < amount; i++) {
                var art = new Article("Generated item " + articles.length, articles.length);
                articles.push(art);
                shoppingCart.entries.push(new ShoppingCartEntry(art));
            }
        });
    },

    update: function() {
        measure();
        for(var i = 0; i < 10; i++) {
            var article = articles[Math.floor(Math.random() * articles.length)];
            article.name += "x";
            article.price += 1;
        }
    }
}));

var ArticlesView = mobxReact.observer(React.createClass({
    displayName: 'ArticlesView',
    render: function() {
        log("Rendering ArticlesView");
        function renderArticle(article) {
            return (<ArticleView article={article} key={article.id} />);
        }
        return (<div>
                <button id="new-article" onClick={this.newArticleClick}>new article</button>
                <ul id="articles">{this.props.articles.map(renderArticle)}</ul>
            </div>)
    },

    newArticleClick: function() {
        this.props.articles.push(new Article(prompt("Article name"), prompt("Price (please fill in a number)")));
    }
}));

var ArticleView = mobxReact.observer(React.createClass({
    displayName: 'ArticleView',

    render: function() {
        log("Rendering ArticleView " + this.props.article.id);
        return (<li>
            <span>{this.props.article.name}</span>
            <button onClick={this.onAddArticle}>&raquo;</button>
            <button onClick={this.onEditArticle}>edit</button>
            <span className="price">€ {this.props.article.price}</span>
        </li>);
    },

    onAddArticle: function() {
        var existingEntry = shoppingCart.entries.find(function(entry) {
            return entry.article === this.props.article;
        }, this);
        if (existingEntry)
            existingEntry.amount += 1;
        else
            shoppingCart.entries.unshift(new ShoppingCartEntry(this.props.article));
    },

    onEditArticle: function() {
        this.props.article.name = prompt("New name", this.props.article.name);
        this.props.article.price = parseInt(prompt("New price", this.props.article.price), 10);
    }
}));

var CartView = mobxReact.observer(React.createClass({
    displayName: 'CartView',
    
    render: function() {
        log("Rendering CartView");
        function renderEntry(entry) {
            return (<CartEntryView entry={entry} key={entry.id} />);
        }
        return (<div>
            <ul id="cart">{this.props.cart.entries.map(renderEntry)}</ul>
            <CartTotalView cart={this.props.cart} />
        </div>)
    }
}));

var CartTotalView = mobxReact.observer(React.createClass({
    displayName: 'CartTotalView',
    
    render: function() {
        log("Rendering CartTotalView");
        return (<div><b>Total: <span id="total">{("€ " + this.props.cart.total).replace(/(\.\d\d)\d*/,"$1")}</span></b></div>);
    }
}));

var CartEntryView = mobxReact.observer(React.createClass({
    displayName: 'CartEntryView',
    
    render: function() {
        log("Rendering CartEntryView " + this.props.entry.id);
        return (<li>
            <button onClick={this.removeArticle}>&laquo;</button>
            <span>{this.props.entry.article.name}</span>
            <span className="price">{this.props.entry.amount}x</span>
        </li>);
    },

    removeArticle: function() {
        if (--this.props.entry.amount < 1)
            shoppingCart.entries.splice(shoppingCart.entries.indexOf(this.props.entry), 1);
    }
}));

React.render(<ShopDemoView articles={articles} cart={shoppingCart} />, document.getElementById("mount"));

/*
 * Demo / Test utilities
 */
var Perf = React.addons.Perf;
var logEnabled = true;

function log(line) {
    if (logEnabled)
        document.getElementById('logview').innerHTML += line + '<br/>';
}

function measure() {
    log("Running performance test, results will be printed in the developers console after 10 second. (F12)");
    logEnabled = false;
    Perf.start();
    setTimeout(function() {
        Perf.stop();
        Perf.printInclusive();
        Perf.printWasted();
        logEnabled = true;
        log("Results has been printed to the console");
    });
}