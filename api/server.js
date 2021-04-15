// implement your server here
// require your posts router and connect it here
const express = require("express")

const postsRouter = require("./posts/posts-router.js")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Live Version of my Posts API",
    })
})
server.use(postsRouter)

module.exports = server
