const { triggerAsyncId } = require('async_hooks')
const fs=require('fs')
const entities=require('./entities.json')
const bodyOfHTML=(data)=>{
    fs.readFile('./index.html','utf-8',(err,data)=>{
        if(err)
        console.error(err)
        else
        extractBody(data);
    })
}

function extractBody(HTML) {
    let Elements=HTML.split("\n")
    let filtered=Elements.filter(removeEmpty=>removeEmpty)
    const clear=[];
    filtered.forEach(removeSpaces => {
        clear.push(removeSpaces.trim())    
    });
    let body={
        start:0,
        end:0
    }
    for(let i=0;i<clear.length;i++){
        if(clear[i]=='<body>')
        body.start=i+1;
        if(clear[i]=='</body>')
        body.end=i;
    }
    const final=clear.slice(body.start,body.end)
    //remove ends
    const tags=[];
    const endsRegex=/(<\/\w*>)/gi
    final.forEach(el=>{
        if(!el.match(endsRegex))
        tags.push(el);
    })
    decode(tags)
}
function decode(HTML){
    let output="";
    const size=HTML.length;
    HTML.forEach(el=>{
        if(entities[el]!==undefined)
            output+=entities[el];
            else output+=el
    })
    console.log(output)
}
bodyOfHTML();