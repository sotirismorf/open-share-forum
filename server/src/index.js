var express = require('express')
var app = express()


const sotiris = {
  name:"Sotiris Morfakidis",
  username:"sotirismorf"
}

const comment = {
  author: sotiris,
  body:"nice!",
  date:"Jan 2nd 2021"
}

const posts = [
  {
    id:123456,
    title:"first post",
    author:sotiris,
    date:"Jan 1st 2021",
    body:"This is my first post",
    commentNum:4,
    comments:[]
  },
  {
    id:345456,
    title:"second post",
    body:"This is my second post",
    date:"Jan 1st 2021",
    author:sotiris,
    commentNum:4,
    comments:[comment,comment]
  }
]

app.get('/posts', function (req, res) {
  res.send(posts)
})

app.get('/post/:id', function (req, res) {
  const { id } = req.params;
  res.send(posts[1])
})

app.listen(4000)
