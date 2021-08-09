"use strict";

const blog = {
  artikelsArray: [],
  filterBtn: document.getElementById("filterBtn"),
  init() {
    this.getData();
    setTimeout(function () {
      if (blog.artikelsArray.length == 0) {
        console.log("array is empty");
      } else {
        blog.render();
      }
    }, 500);
    this.filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.sortByMostLikes();
      console.log(this.artikelsArray);
      blog.render();
    });
  },

  sortByMostLikes() {
    this.artikelsArray.sort((a, b) => {
      return b.likes - a.likes;
    });
  },

  // https://stackoverflow.com/questions/4611754/javascript-convert-seconds-to-a-date-object
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  toDate(value) {
    let [month, date, year] = new Date(value * 1000)
      .toLocaleDateString("en-US")
      .split("/");
    return `${date}/${month}/${year}`;
  },

  async getData() {
    await fetch("https://thecrew.cc/news/read.php")
      .then((response) => response.json())
      .then((data) => {
        data.news.forEach((element) => {
          this.artikelsArray.push(
            new Artikel(
              element.UUID,
              element.title,
              element.content,
              element.imageURI,
              element.likes,
              //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
              this.toDate(parseInt(element.publicationDate))
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
            <p class="date">${element.datum}</p>
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