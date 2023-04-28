const {createnote,appendnote,deletenote, overwritenote,readnote,rename} = require('./functions.js');
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
'rename':(filename,newfilename)=>rename(filename,newfilename)
};

const commandsinfo=
['\n\t!! [INFO] !!\t\n',
'create: Creates a new note\nSyntax: create filename text\n',
'append: Adds to an existing note\nSyntax: append filename text\n',
'delete: Deletes a note\nSyntax: delete filename \n',
'overwrite: Overwrites an existing note\nSyntax: create filename text\n',
'read: Reads a note\nSyntax: read filename\n',
'rename: Renames an existing file to newone\nSyntax: rename filename newfilename\n'
];

let commandsarr = Object.keys(commands);

console.log("\n\tWelcome to Simple Note app\n\t   Here are the functions");
console.log([...commandsarr,'info']);

commandsarr.forEach((command) =>
notesemittor.on(command,commands[command])
);

    
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

function checkcmd(){
    readline.question('Notes app:  ', text => {

        const arr=text.split(' ');

        const [cmd,filename,...temp]=arr;
        const note=temp.join(" ");
        

        if(text=='close'||text=='exit')
            {
                readline.close();
                process.exit(0);
            }
        if(text=='info'||text=='help')
        {
            commandsinfo.forEach((e)=>{console.log(e);}) 
        }
        notesemittor.emit(cmd,filename,note);
        setTimeout(()=>{ checkcmd();},0);


      }
      );     
  }

checkcmd();



