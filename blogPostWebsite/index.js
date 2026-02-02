import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Needed because __dirname does NOT exist in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/index.ejs", (req, res) => {
  res.render("index.ejs");
});
app.get("/create.ejs", (req, res) => {
  res.render("create.ejs");
});

// Tell Express we are using EJS
app.set("view engine", "ejs");

// 🔹 TEMPORARY STORAGE (IMPORTANT)
// This array lives as long as the server runs
const blogPosts = [];
var idvalue = 1;
app.post("/submit", (req, res) => {
  var newPost = {
    id: idvalue,
    title: req.body.nameofpost,
    content: req.body.content,
  };
  idvalue++;
  console.log(newPost);
  // Store post (THIS IS THE KEY STEP)
  blogPosts.push(newPost);
  console.log(blogPosts);

  console.log("req hit");
  var submit = true;
  res.render("create.ejs", {
    submit1: submit,
  });
});

app.get("/view.ejs", (req, res) => {
  res.render("view.ejs", {
    posts: blogPosts, // send ALL stored posts to EJS
  });
});

app.get("/update.ejs", (req, res) => {
  res.render("update.ejs", {
    posts: blogPosts,
  });
});

app.get("/posts/:id/edit", (req, res) => {
  const post = blogPosts.find((p) => p.id == req.params.id);
  res.render("edit.ejs", { post });
});

app.post("/posts/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id == req.params.id);
  console.log(post);

  console.log(req.body.title);
  post.title = req.body.title;
  post.content = req.body.content;
  res.render("edit.ejs", {
    submit2: true,
  });
});

app.post("/posts/:id/delete", (req, res) => {
  const postId = req.params.id;

  const index = blogPosts.findIndex((post) => post.id === postId);
  
  blogPosts.splice(index, 1);
  console.log("delete req hit ");


  res.render("edit.ejs", {
    delete1: true,
  });
});

app.listen(port, () => {
  console.log("server is running ");
});
