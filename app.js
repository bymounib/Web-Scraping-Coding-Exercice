const { default: axios } = require("axios");
const cheerio = require("cheerio");
const request = require("request");

const fs = require("fs");

let datas = [];

request(`https://medium.com/search?q=pricing`, (err, response, html) => {
  if (response.statusCode === 200) {
    const $ = cheerio.load(html);
    console.log(typeof $);

    $(".js-block").each((index, element) => {
      // const title = $(el).find("h3").text();
      //   const article = $(el).find(".postArticle-content").find("a").attr("href");
      const id = $(element).find(".data-post-id").text();
      const author = $(element).find(".postMetaInline").find("a").text();
      const description = $(element)
        .find(".postArticle-content")
        .find("p")
        .text();
      const pubDate = $(element).find(".postMetaInline").find("time").text();

      let data = {
        id,
        author,
        description,
        pubDate,
      };

      datas.push(data);
    });
  }

  console.log(datas);

  fs.writeFile("output.json", JSON.stringify(datas), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
