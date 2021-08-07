"use strict";

const blog = {
  artikelsArray: [],
  init() {
    this.getData();
    setTimeout(function () {
      if (blog.artikelsArray.length == 0) {
        console.log("array is empty");
      } else {
        blog.render();
      }
    }, 500);
  },

  async getData() {
    await fetch("https://thecrew.cc/news/read.php")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.news);
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

  render() {
    let htmlString = "";
    let container = document.getElementById("container");
    this.artikelsArray.forEach((element) => {
      htmlString += `
        <article>
          <figure>
            <img src="${element.imageURL}" alt="">
          </figure>
          <section>
            <h2>${element.title}</h2>
            <p>${element.datum}</p>
            <p>${element.content}</p>
            <section class="likeContainer">
              <p>${element.likes}</p>
              <span class="material-icons">
                favorite
                </span>
            </section>
          </section>
        </article>
        `;
    });
    container.innerHTML = htmlString;
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