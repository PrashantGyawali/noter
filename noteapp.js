const {createnote,appendnote,deletenote, overwritenote,readnote,rename,deleteall} = require('./functions.js');
const separate =require("./separator.js")
const EventEmitter =require('events');

class Emmiter extends EventEmitter{};
const notesemittor =new Emmiter();

const commands=
{
'create':(filename,text)=>{return createnote(filename,text)},
'append':(filename,text)=>appendnote(filename,text),
'delete':(filename)=>deletenote(filename),
'overwrite':(filename,text)=>overwritenote(filename,text),
'read':(filename)=>readnote(filename),
'rename':(filename,newfilename)=>rename(filename,newfilename),
'deleteall':(x,y,z,a)=>{deleteall(z,a);}
};
const newcommands={...commands}

//another name for the basic commands
let aliases={
    'create':['newnote','new-note','form'],
    'append':['addto','addmore'],
    'delete':['rm','remove'],
    'overwrite':['rewrite'],
    'read':['display','open'],
    'rename':['rn','change-name'],
    'deleteall':['delete-all']
}

//adding the aliases to original commands object
for(let command of Object.keys(newcommands))
{
    aliases[`${command}`].forEach((e)=>{newcommands[`${e}`]=commands[command]})
}

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
let commandsarr = Object.keys(commands);
let newcommandsarr=Object.keys(newcommands);
console.log("\n\tWelcome to Simple Note app\n\t   Here are the functions");
console.log([...commandsarr,'info']);

//setting up the emitters
newcommandsarr.forEach((command) =>
notesemittor.on(command,newcommands[command])
);

    
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
            // console.log('command:',cmd)
            notesemittor.emit(cmd,filename,note,readline,checkcmd);
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





