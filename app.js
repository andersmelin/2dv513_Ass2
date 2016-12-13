const fs = require("fs");

let stream = fs.createReadStream("../RC_2011-07");
var remainder = "";

function insertIntoDb(post){
    let { id, parent_id, link_id, name, author, body, subreddit_id, score, created_utc } = post;
    console.log(author);
}

stream.setEncoding('utf8')

stream.on('data', (data) => {
    let posts = data.split(/\r?\n/);
    posts[0] = remainder + posts[0];

    posts.forEach(post => {
        try{
            insertIntoDb(JSON.parse(post))
        } catch(err){
            if(err.name === 'SyntaxError'){
                return remainder = posts.pop();
            }

            throw err;
        }
    })
});

stream.on('end', function(){
    console.log("no more");
})
