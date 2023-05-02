const {createnote,appendnote,deletenote, overwritenote,readnote,rename,deleteall,createAlias,deleteAlias} = require('./functions.js');
const separate =require("./separator.js");
const aliasUpdate=require('./aliasUpdate');

const EventEmitter =require('events');
class Emmiter extends EventEmitter{};
const notesemittor =new Emmiter();

let aliases=aliasUpdate();



//Basic Commands always same
const commands=
{
'create':(filename,text)=>{return createnote(filename,text)},
'append':(filename,text)=>appendnote(filename,text),
'delete':(filename)=>deletenote(filename),
'overwrite':(filename,text)=>overwritenote(filename,text),
'read':(filename)=>readnote(filename),
'rename':(filename,newfilename)=>rename(filename,newfilename),
'deleteall':(x,y,z,a)=>{deleteall(z,a)},
'create-alias': (cmdname,alias)=>{return createAlias(cmdname,alias)},
'delete-alias': (cmdname,alias)=>{return deleteAlias(cmdname,alias)}
};
let commandsarr = Object.keys(commands);


//Any change done will be on newcommands
const newcommands={...commands}





//another name for the basic commands: alias
function setUpAlias()
{
        notesemittor.removeAllListeners();

        //updating the new alias
        aliases=aliasUpdate();

        //adding the aliases to original commands object
        for(let command of Object.keys(newcommands))
        {
            aliases[`${command}`]?.forEach((e)=>{newcommands[`${e}`]=commands[command]})
        }

        let newcommandsarr=Object.keys(newcommands);

        
        //setting up the emitters
        newcommandsarr.forEach((command) =>
        notesemittor.on(command,newcommands[command])
        );
}



setUpAlias();
//commands info
const commandsinfo=
['\n\t!! [INFO] !!\t\n',
'create: Creates a new note\nSyntax: create filename text\n',
'append: Adds to an existing note\nSyntax: append filename text\n',
'delete: Deletes a note\nSyntax: delete filename \n',
'overwrite: Overwrites an existing note\nSyntax: create filename text\n',
'read: Reads a note\nSyntax: read filename\n',
'rename: Renames an existing file to newone\nSyntax: rename filename newfilename\n'
];








//welcome screen
console.log("\n\tWelcome to Simple Note app\n\t   Here are the functions");
console.log([...commandsarr,'info']);
    
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

function checkcmd(){
    readline.question('Notes app:  ', text => {

        let infocmd=['info','help','tutorial'], quitcmd=['close','exit','quit','terminate','end'];
        let extracmds=infocmd.concat(quitcmd);

        if(!extracmds.includes(text.trim()))
        {   const obj=separate(text);
            const {first:cmd,second1:filename,second2:note}=obj;
            console.log('command:',cmd)
            notesemittor.emit(cmd,filename,note,readline,checkcmd);
            setUpAlias();
        }

        if(quitcmd.includes(text.trim()))
            {
                readline.close();
                process.exit(0);
            }
        if(infocmd.includes(text.trim()))
        {
            commandsinfo.forEach((e)=>{console.log(e);}) 
        }
        if(text.trim()=='alias'||text.trim()=='aliases')
        {
            console.log(aliases);
        }

        setTimeout(()=>{ checkcmd();},0);
      }
      );     
  }

checkcmd();





