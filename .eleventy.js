module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/assets/sass");
    eleventyConfig.addPassthroughCopy("./src/assets/img/");
    eleventyConfig.addPassthroughCopy("./src/assets/js/");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->"
    });

    eleventyConfig.addCollection("categories", function(collectionApi) {
        let categories = new Set();
        let posts = collectionApi.getFilteredByTag('post');
        posts.forEach(p => {
            let cats = p.data.categories;
            cats.forEach(c => categories.add(c));
        });
        return Array.from(categories);
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
        return datum/1000;
    });

    eleventyConfig.addFilter("limit", function (arr, limit) {
        return arr.slice(0, limit);
    });

    eleventyConfig.addFilter("filterByCategory", function(posts, cat) {
        cat = cat.toLowerCase();
        let result = posts.filter(p => {
            let cats = p.data.categories.map(s => s.toLowerCase());
            return cats.includes(cat);
        });

        return result;
    });

    return {
        dir: {
            input: "src",
            output: "public",
        }
    }
}