const mongoose = require("mongoose");
const Chat = require("./models/chats.js") 
//mongoose connection
main().then(()=>{
    console.log("connection Succecful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// mongose chats saved
let allChat =[
  {
    from: "shariful01",
    to: "taki01",
    msg: "Hello bro, kemon aso?"
    // created_at auto হবে
  },
  {
    from: "taki01",
    to: "shariful01",
    msg: "Bhalo asi, tumi?"
    // created_at auto হবে
  },
  {
    from: "rafi01",
    to: "shariful01",
    msg: "Kal ki tumi free aso?",
    created_at: new Date("2025-08-15T10:30:00") // manual date
  },
  {
    from: "shariful01",
    to: "rafi01",
    msg: "Haan, kal dekha hobe.",
    created_at: new Date("2025-08-15T11:00:00")
  },
  {
    from: "nishat01",
    to: "shariful01",
    msg: "Vai project er kaj sesh hoyse?",
    // created_at auto হবে
  }
];

Chat.insertMany(allChat);



