const fs=require('fs');
const path=require('path');

function aliasUpdate()
{
let aliasestmp=fs.readFileSync(path.join(path.dirname(__dirname),'config','aliases'))
let aliases=JSON.parse(aliasestmp);
return aliases;
}

module.exports=aliasUpdate;