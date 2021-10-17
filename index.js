let express = require("express");
const app = express();

//let users = require("./users.json")
let fs = require("fs")

const userData = JSON.parse(fs.readFileSync("users.json","utf8"))

app.get("/", (req, res) => {
  res.send("John Jademar Lopez <br>101231787")
})

// retrieves user from json file by the use of ID
//http://localhost:8080/user?uid=?
app.get("/user", (req, res) =>{
  let idNum = req.query.uid;

  // looks for the ID
  let query = userData.find(user => user.id == idNum)
  
  // if ID is not found 
  if(!query){
    return res.status(400).send({
      message: "No user found"
    })
  }
  res.send(query)
})

app.get("/user/all", (req, res) => {
  /* callback function accepts 2 parameters (username from json)
   * if a should appear before b it returns -1
   * if b should appear after be it returns 1
   * if it is equal it returns 0
   * all elements are converted to lowercase incase some usernames are in uppercase
   */
  let sorted = userData.sort(function(a,b){
    if(a.username.toLowerCase() < b.username.toLowerCase()) return -1;
    if(a.username.toLowerCase() > b.username.toLowerCase()) return 1;
    return 0;
    
  })

  res.send(sorted)
})


let SERVER_PORT = process.env.PORT || 8080
app.listen(SERVER_PORT)
console.log("Server Running at "+ SERVER_PORT)