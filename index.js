const express = require("express");
const app = express();
const mongoose = require("mongoose"); 
const path = require("path")
const Chat = require("./models/chats.js");
const methodOverride = require("method-override")


//ejs path satup
app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//mongoose connection
main().then(()=>{
    console.log("connection Succecful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/",(req,res)=>{
    res.send("working")
})

//Index route
app.get("/chats",async (req, res)=>{
    let chats = await Chat.find();
    res.render("deepAI.ejs",{chats});
})

//New Route

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

// Create Route
app.post("/chats",(req, res)=>{
    let { from, to , msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg
    })
    newChat.save()
    .then((res)=>{
        console.log("chas saved")
    })
    .catch((err)=>{
        console.log("some err to save")
    })
    res.redirect("/chats")
})


//edit Route
app.get("/chats/:id/edit",async (req, res)=>{
    let {id} = req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat})
})

//update Route

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;

    try {
        let updatedChat = await Chat.findByIdAndUpdate(
            id,
            { msg: newMsg },
            { runValidators: true, new: true }
        );
        console.log("Updated chat:", updatedChat);
        res.redirect("/chats");
    } catch (err) {
        console.error("Error updating chat:", err);
        res.send("Something went wrong!");
    }
});

//distroy Route

app.delete("/chats/:id",async (req, res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats")

})


//express server connection
app.listen(8080, ()=>{
    console.log("server is lisining on Port 8080")
})