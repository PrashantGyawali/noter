const fs=require('fs');
const path=require('path');

function aliasUpdate()
{
let aliasestmp=fs.readFileSync(path.join(__dirname,'config','aliases'))
let aliases=JSON.parse(aliasestmp);
return aliases;
}

module.exports=aliasUpdate;