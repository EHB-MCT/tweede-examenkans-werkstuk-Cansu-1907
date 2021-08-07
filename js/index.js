"use strict";

const blog = {
  artikelsArray: [],
  init() {
    this.getData();
  },
  async getData() {
    await fetch("https://thecrew.cc/news/read.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.news);
        data.news.forEach((element) => {
          this.artikelsArray.push(
            new Artikel(
              element.UUID,
              element.title,
              element.content,
              element.imageURI,
              element.likes,
              element.publicationDate
            )
          );
        });
        console.log(this.artikelsArray);
      });
  },
};

class Artikel {
  constructor(id, title, content, imageURL, likes, datum) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.imageURL = imageURL;
    this.likes = likes;
    this.datum = datum;
  }
}

blog.init();