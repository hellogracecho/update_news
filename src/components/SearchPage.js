import React from "react";
import CookieService from "./CookieService";
import styles from "./SearchPage.module.css";
import ShowMore from "react-show-more";

const API_KEY = "41c3a691c6064f018a7a27d285276ce6";
const MAIN_CATEGORY = "mainNewsCategory";
const cookie = new CookieService();

const DATE_FORMAT = {
  year: "numeric",
  month: "long",
  weekday: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: API_KEY,
      defaultCategory: "passionfruit",
      category: ""
    };
  }

  componentDidMount() {
    let mainCategory = cookie.getCookie(MAIN_CATEGORY);
    if (mainCategory === null || mainCategory === "") {
      cookie.setCookie(MAIN_CATEGORY, this.state.defaultCategory);
      mainCategory = this.state.defaultCategory;
      console.log("cookie is not set");
    }
    this.props.getNews(mainCategory);
    console.log("cookie is SET: " + mainCategory);
  }

  // ** This function does not need to be changed. **
  // Set cookie that expires 1000 days from now.
  // This can store the user's preferred news category.
  setCookie(cookieType, cookieValue) {
    var numDays = 1000;
    var d = new Date();
    d.setTime(d.getTime() + numDays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      cookieType + "=" + cookieValue + ";" + expires + ";path=/";
  }

  // ** This function does not need to be changed. **
  // Get category from cookie if one exists.
  getCookie(cookieType) {
    var name = cookieType + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        // Cookie found.
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  render() {
    return (
      <div>
        <h2 className={styles["search-text"]}>
          {this.props.search === ""
            ? null
            : "Recent Search History: " +
              this.props.search.split("+").join(" ")}
        </h2>
        <div className={styles["grid-container"]}>
          {this.props.articles.map((article, index) => (
            <div key={index} className={styles["one-grid"]}>
              <div className={styles["image"]}>
                <a
                  href={article.url}
                  alt={article.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    onError={e => {
                      // console.log("img cannot be found");
                      e.target.onError = null;
                      e.target.src = "/error.png";
                    }}
                  />
                </a>
              </div>
              <div className={styles["content"]}>
                <h2 className={styles["title"]}>
                  <a
                    href={article.url}
                    alt={article.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h2>
                <div className={styles["publish-date"]}>
                  {new Intl.DateTimeFormat("default", DATE_FORMAT).format(
                    new Date(article.publishedAt)
                  )}
                </div>
                <div className={styles["description"]}>
                  <ShowMore
                    lines={5}
                    more="show more"
                    less="show less"
                    anchorClass={styles["show-text"]}
                  >
                    {article.description === null
                      ? "Description is not available in this article."
                      : article.description}
                  </ShowMore>
                </div>
                <div className={styles["author"]}>
                  by{" "}
                  {article.author === null
                    ? "The author information is not available."
                    : article.author}
                </div>
                <div className={styles["link"]}>
                  <a
                    href={article.url}
                    alt={article.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Search;
