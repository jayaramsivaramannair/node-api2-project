// implement your posts router here
const express = require("express")
const posts = require("./posts-model.js")

const router = express.Router()


//Gets all the posts
router.get("/api/posts", (req, res) => {
    posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

//Gets post with a specific ID
router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

//Creates a new Post
router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        posts.insert(req.body)
            .then((post) => {
                res.status(201).json(post)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
                })
            })
    }
})

//Deletes a single post
router.delete("/api/posts/:id", (req, res) => {
    posts.remove(req.params.id)
        .then((response) => {
            if (response) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "the post could not be removed"
            })
        })
})

//Updates a single post
router.put("/api/posts/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        posts.update(req.params.id, req.body)
            .then((response) => {
                if (response) {
                    res.status(200).json(response)
                } else {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist"
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "The post information could not be modified"
                })
            })
    }
})

//Gets the posts for a comment
router.get("/api/posts/:id/comments", (req, res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                posts.findPostComments(req.params.id)
                    .then((comments) => {
                        res.status(200).json(comments)
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(500).json({
                            message: "The comments information could not be retrieved"
                        })
                    })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
})

module.exports = router
