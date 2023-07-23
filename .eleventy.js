module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/assets/sass");
    eleventyConfig.addPassthroughCopy("./src/assets/img/");
    eleventyConfig.addPassthroughCopy("./src/assets/js/");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->"
    });

    eleventyConfig.addCollection("categories", function (collectionApi) {
        let categories = new Set();
        let posts = collectionApi.getFilteredByTag('post');
        posts.forEach(p => {
            let cats = p.data.categories;
            cats.forEach(c => categories.add(c));
        });
        return Array.from(categories);
    });

    eleventyConfig.addCollection("auteurs", function (collectionApi) {
        let auteurs = new Set();
        let posts2 = collectionApi.getFilteredByTag('post');
        posts2.forEach(p => {
            let cats2 = p.data.auteurs;
            cats2.forEach(c => auteurs.add(c));
        });
        return Array.from(auteurs);
    });

    eleventyConfig.addCollection("editeurs", function (collectionApi) {
        let editeurs = new Set();
        let posts3 = collectionApi.getFilteredByTag('post');
        posts3.forEach(p => {
            let cats3 = p.data.editeurs;
            cats3.forEach(c => editeurs.add(c));
        });
        return Array.from(editeurs);
    });

    /* shortcodes */
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    /* filters */
    const french = new Intl.DateTimeFormat('fr');
    eleventyConfig.addFilter("niceDate", function (d) {
        return french.format(d);
    });

    eleventyConfig.addFilter("niceDateJs", function (d) {
        var datum = Date.parse(d)
        return datum / 1000;
    });

    eleventyConfig.addFilter("limit", function (arr, limit) {
        return arr.slice(0, limit);
    });

    eleventyConfig.addFilter("filterByCategory", function (posts, cat) {
        cat = cat.toLowerCase();
        let result = posts.filter(p => {
            let cats = p.data.categories.map(s => s.toLowerCase());
            return cats.includes(cat);
        });

        return result;
    });

    eleventyConfig.addFilter("filterByAuteur", function (posts, cat2) {
        cat2 = cat2.toLowerCase();
        let result2 = posts.filter(p => {
            let cats2 = p.data.auteurs.map(s => s.toLowerCase());
            return cats2.includes(cat2);
        });

        return result2;
    });

    eleventyConfig.addFilter("filterByEditeur", function (posts, cat3) {
        cat3 = cat3.toLowerCase();
        let result3 = posts.filter(p => {
            let cats3 = p.data.editeurs.map(s => s.toLowerCase());
            return cats3.includes(cat3);
        });

        return result3;
    });

    return {
        dir: {
            input: "src",
            output: "public",
        }
    }
}