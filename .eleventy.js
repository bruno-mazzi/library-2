module.exports = function(eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/assets/sass");
    eleventyConfig.addPassthroughCopy("./src/assets/img/");
    eleventyConfig.addPassthroughCopy("./src/assets/js/");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts/");

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->"
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

    return {
        dir: {
            input: "src",
            output: "public",
        }
    }
}