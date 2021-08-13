"use strict";

class Artikels {
  like(id) {
    console.log(id);
    fetch("https://thecrew.cc/news/read.php", {
      method: "POST",
      body: JSON.stringify({
        UUID: [id],
      }),
    }).then((res) => console.log(res));
  }
}

const blog = {
  artikels: new Artikels(),
  artikelsArray: [],
  filterBtn: document.getElementById("filterBtn"),
  form: document.getElementById("form"),
  input: document.getElementById("inputForm"),
  container: document.getElementById("container"),
  logo: document.getElementById("logo"),
  likeBtns: [],
  init() {
    this.getData();
    setTimeout(function () {
      if (blog.artikelsArray.length == 0) {
        console.log("array is empty");
      } else {
        blog.render(blog.artikelsArray);
        Array.from(blog.likeBtns).forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            blog.artikels.like(e.target.id);
          });
        });
      }
    }, 500);
    this.logo.addEventListener("click", (e) => {
      window.location.reload();
    });
    this.filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.sortByMostLikes();
      console.log(this.artikelsArray);
      blog.render(blog.artikelsArray);
    });
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.searchKeyword();
      this.container.style.justifyContent = "space-evenly";
    });
  },

  sortByMostLikes() {
    this.artikelsArray.sort((a, b) => {
      return b.likes - a.likes;
    });
  },

  searchKeyword() {
    let searchedKeyword = this.input.value;
    let newArray = [];
    console.log(searchedKeyword);
    this.artikelsArray.forEach((element) => {
      if (
        element.title.includes(searchedKeyword) ||
        element.content.includes(searchedKeyword)
      ) {
        newArray.push(element);
      }
    });
    this.render(newArray);
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

  render(array) {
    let htmlString = "";
    array.forEach((element) => {
      htmlString += `
        <article class='article'>
          <figure>
            <img src="${element.imageURL}" alt="">
          </figure>
          <section>
            <h2>${element.title}</h2>
            <p class="date">${element.datum}</p>
            <p>${element.content}</p>
            <section class="likeContainer">
              <p>${element.likes}</p>
              <span id="${element.id}" class="material-icons likeBtn">
                favorite
                </span>
            </section>
          </section>
        </article>
        `;
    });
    this.container.innerHTML = htmlString;
    this.likeBtns = document.querySelectorAll(".likeBtn");
    // console.log(this.likeBtns);
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