const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  // we dont have hadnling for failing below requests.
  axios
    .post("http://localhost:4000/events", event)
    .then((data) => console.log("post"))
    .catch((error) => {
      console.log("error post", error);
    });
  axios
    .post("http://localhost:4001/events", event)
    .then((data) => console.log("comments"))
    .catch((error) => {
      console.log("error comment", error);
    });
  axios
    .post("http://localhost:4002/events", event)
    .then((data) => console.log("query"))
    .catch((error) => {
      console.log("error query", error);
    });
  axios
    .post("http://localhost:4003/events", event)
    .then((data) => console.log("comment moderation"))
    .catch((error) => {
      console.log("error moderation", error);
    });

  res.send({ status: "done" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("server is running on port 4005");
});
