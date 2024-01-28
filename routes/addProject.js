const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const project = require('../models/Projects')
const fs = require('fs')
const path  = require ('path')

const projectsArray = [
    {
        "id": "0",
        "name": "Nations",
        "description": "A social media website where real life procedures apply. Be your own president!",
        "tags": "Angular - NodeJS",
        "github": "https://github.com/mouhamadalmounayar/NationsServer.git",
        "image": "../../assets/images/Mushoku Tensei - 11 - Large 04.jpg"
    },
    {
        "id": 1,
        "name": "Simulating a Transmission Chain",
        "description": "Simulating a transmission chain in order to verify theoretical conditions on the emission and reception filters.",
        "tags": "Python",
        "github": "https://github.com/mouhamadalmounayar/Simulating-a-transmission-chain.git",
        "image": "../../assets/images/desktop-wallpaper-electronic-47-electronic-backgrounds-electronic.jpg"
    },
    {
        "id": 2,
        "name": "Poker Game",
        "description": "Developing a poker game using object-oriented programming principles.",
        "tags" : "java",
        "github": "",
        "image": "../../assets/images/gwent-the-witcher-card-game-nithral-uhd-4k-wallpaper.jpg"
    },
    {
        "id": 3,
        "name": "Portfolio Website",
        "description": "I developed my portfolio website using Angular 17 for the frontend and express for the backend",
        "tags": "Angular",
        "github" : "https://github.com/mouhamadalmounayar/portfolio.git",
        "image": "../../assets/images/webdevelopement.avif"
    }
]
router.get('/getProjects', (req , res) => {
  const pathFile =  'db.json'
  fs.readFile(pathFile , 'utf-8' , (err, data) => {
    if (err){
        res.status(500).send(err)
    }
    else {
        res.send(data)
    }
  })
})
router.post('/addProject' , auth,  (req, res) => {
    const filepath = 'db.json'
    projectsArray.push(req.body)
    console.log(projectsArray)
    const toBeAdded = JSON.stringify(projectsArray)
    fs.writeFile(filepath , toBeAdded , (error) => {
        res.send(error)
    })
})

router.delete('/deleteProject' , auth ,(req , res) => {
    const filePath = 'db.json'
    fs.writeFile(filePath, JSON.stringify(projectsArray) , (error) => {
        res.send(error)
    })
})

module.exports = router