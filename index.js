import express from 'express';

const app = express();
const PORT = 3000;

const posts = [
 
];
let nextId=3;
// Serve static files from the public folder (just like the course!)
app.use(express.static('public'));

// Middleware to parse form data from post requests
app.use(express.urlencoded({ extended: true }));

// Our in-memory data store for blog articl

// Home Route - Express automatically checks the /views folder for index.ejs
app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(404).send("Post not found.");
  }

  res.render("edit.ejs", { post: post });
});

app.post("/create", (req, res) => {
  const title = req.body.title?.trim();
  const content = req.body.content?.trim();

  if (!title || !content) {
    return res.render("create.ejs", {
      error: "Please enter both a title and content."
    });
  }

  posts.push({
    id: nextId++,
    title: title,
    content: content,
    date: new Date().toLocaleDateString()
  });

  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(404).send("Post not found.");
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const postIndex = posts.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (postIndex === -1) {
    return res.status(404).send("Post not found.");
  }

  posts.splice(postIndex, 1);
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).render("404.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
