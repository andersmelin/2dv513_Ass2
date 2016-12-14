const fs = require("fs");

let stream = fs.createReadStream("../RC_2011-07");
let remainder = "";
let postcount = 0;

function insertIntoDb(post){
    // let { id, parent_id, link_id, name, author, body, subreddit_id, score, created_utc } = post;
    postcount++;
}

stream.setEncoding('utf8');

stream.on('end', function(){
    console.log("total: " + postcount + " posts" );
});

stream.on('data', (data) => {
    stream.pause();

    let posts = data.split(/\r?\n/);
    posts[0] = remainder + posts[0];

    posts.forEach(post => {
        try{
            insertIntoDb(JSON.parse(post));
        } catch(err){
            if(err.name === 'SyntaxError'){
                return remainder = posts.pop();
            }

            throw err;
        }
    })

    stream.resume();
});
