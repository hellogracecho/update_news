import React from "react";
import styles from "./About.module.css";

class About extends React.Component {
  render() {
    return (
      <div className={styles["about-body"]}>
        <h2>Who Am I?</h2>
        <p>
          Check Out Graceful Movie Feed:{" "}
          <a
            href="https://gcho.bcitwebdeveloper.ca/movie"
            alt="Gracefull movie feed"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://gcho.bcitwebdeveloper.ca/movie
          </a>
        </p>
        <p>
          Visit my portfolio site:{" "}
          <a
            href="https://hellogracecho.com"
            alt="Grace Cho portfolio site"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://hellogracecho.com
          </a>
        </p>
        <p>
          Visit my BCIT site:{" "}
          <a
            href="https://gcho.bcitwebdeveloper.ca"
            alt="Grace Cho BCIT TWD site"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://gcho.bcitwebdeveloper.ca
          </a>
        </p>
        <br />
        <h2>Reference</h2>
        <p>
          The News Database API:{" "}
          <a
            href="https://newsapi.org/"
            alt="The News DB API"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://newsapi.org/
          </a>
        </p>
      </div>
    );
  }
}

export default About;
