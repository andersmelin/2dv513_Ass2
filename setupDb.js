const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

new sqlite3.Database("../reddit.sqlite", (err) => {
    if(err){
        return console.log(err);
    }

    console.log("hurra db skapad");
})

db.on("open", () => {
    console.log("db is open");
})
