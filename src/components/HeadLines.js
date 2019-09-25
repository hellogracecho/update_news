import React, { Component } from "react";
import Moment from "react-moment";
import styles from "./HeadLines.module.css";
import ShowMore from "react-show-more";

const API_KEY = "41c3a691c6064f018a7a27d285276ce6";
const SELECT_COUNTRY = "ca";
const HEAD_LINE_URL =
  "https://newsapi.org/v2/top-headlines?country=" +
  SELECT_COUNTRY +
  "&apiKey=" +
  API_KEY;

const DATE_FORMAT = {
  // year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
};

class HeadLines extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      headlines: [],
      featureUrl: "",
      featureUrlToImage: "",
      featureTitle: "",
      featurePublishDate: "",
      featureDescription: "",
      featureAuthor: ""
    };
    this.getTopHeadlines = this.getTopHeadlines.bind(this);
  }

  componentDidMount() {
    this.getTopHeadlines();
  }

  getTopHeadlines() {
    // Request and wait for data from remote server.
    fetch(HEAD_LINE_URL)
      .then(response => response.json())
      // Data retrieved so parse it.
      .then(data => {
        // console.log(JSON.stringify(data.articles));
        this.setState({ headlines: data.articles });
        // console.log(this.state.headlines[0]);
        this.setState({
          featureUrl: this.state.headlines[0]["url"],
          featureUrlToImage: this.state.headlines[0]["urlToImage"],
          featureTitle: this.state.headlines[0]["title"],
          featurePublishDate: this.state.headlines[0]["publishedAt"],
          featureDescription: this.state.headlines[0]["description"],
          featureAuthor: this.state.headlines[0]["author"]
        });
      })
      // Data is not retieved.
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={styles["headlines-body"]}>
        <div className={styles["headlines-container"]}>
          <div className={styles["lastest-container"]}>
            <h2>
              <span>Top Headlines</span>
            </h2>
            {this.state.headlines.map((article, index) => (
              <div key={index} className={styles["one-grid"]}>
                <a
                  href={article.url}
                  alt={article.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles["title"]}>{article.title}</div>
                </a>
                <div className={styles["publish-date"]}>
                  {new Intl.DateTimeFormat("default", DATE_FORMAT).format(
                    new Date(article.publishedAt)
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* End of Side Headlinse */}
          <div className={styles["feature-news"]}>
            <div className={styles["image"]}>
              <a
                href={this.state.featureUrl}
                alt={this.state.featureTitle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={this.state.featureUrlToImage}
                  alt={this.state.featureTitle}
                  onError={e => {
                    // console.log("img cannot be found");
                    e.target.onError = null;
                    e.target.src = "/error.png";
                  }}
                />
              </a>
            </div>
            <div className={styles["content"]}>
              <h2 className={styles["feature-title"]}>
                <a
                  href={this.state.featureUrl}
                  alt={this.state.featureTitle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.featureTitle}
                </a>
              </h2>
              <div className={styles["feature-publish-date"]}>
                <Moment format="MMM DD, hh:mm A" withTitle>
                  {this.state.featurePublishDate}
                </Moment>
              </div>
              <div className={styles["feature-description"]}>
                <ShowMore
                  lines={6}
                  more="show more"
                  less="show less"
                  anchorClass={styles["show-text"]}
                >
                  {this.state.featureDescription === null
                    ? "Description is not available in this article."
                    : this.state.featureDescription}
                </ShowMore>
              </div>
              <div className={styles["feature-author"]}>
                {this.state.featureAuthor === null
                  ? "The author information is not available."
                  : "by " + this.state.featureAuthor}
              </div>
              <div className={styles["feature-link"]}>
                <a
                  href={this.state.featureUrl}
                  alt={this.state.featureTitle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more information
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End of feature-news */}
        <hr />
      </div>
    );
  }
}

export default HeadLines;
