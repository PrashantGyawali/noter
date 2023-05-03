const {createnote,appendnote,deletenote, overwritenote,readnote,rename,deleteall,createAlias,deleteAlias,edit} = require('./src/functions.js');
const color=require('./src/color.js')
const separate =require("./src/separator.js");
const aliasUpdate=require('./src/aliasUpdate.js');

const EventEmitter =require('events');
class Emmiter extends EventEmitter{};
const notesemittor =new Emmiter();

let aliases=aliasUpdate();


//clears the colors on exit of the app
process.on('exit', function () {
  console.log('\x1b[0m');
});
// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  console.log('\x1b[0m');
  process.exit(0);
});


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
'delete-alias': (cmdname,alias)=>{return deleteAlias(cmdname,alias)},
'edit':(filename,y,readline,fn)=>{return edit(filename,readline,fn)},
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
[color.toYellow('\n\t!! [INFO] !!\t\n'),
color.toLBlue('create:')+' Creates a new note\n'+color.toLBlue('Syntax:')+' create filename text\n',
color.toLBlue('delete:')+ 'Deletes a note\n'+ color.toLBlue('Syntax:')+' delete filename \n',
color.toLBlue('append:')+ 'Adds to an existing note\n'+ color.toLBlue('Syntax:')+' append filename text\n',
color.toLBlue('overwrite:')+ 'Overwrites an existing note\n'+ color.toLBlue('Syntax:')+' create filename text\n',
color.toLBlue('read:')+ 'Reads a note\n'+ color.toLBlue('Syntax:')+' read filename\n',
color.toLBlue('rename:')+ 'Renames an existing file to newone\n'+ color.toLBlue('Syntax:')+' rename filename newfilename\n',
color.toLBlue('create-alias:')+ 'Creates an alias to a command\n'+ color.toLBlue('Syntax:')+' create-alias basecommandname alias\n',
color.toLBlue('delete-alias:')+ 'Deletes an alias to a command\n'+ color.toLBlue('Syntax:')+' delete-alias basecommandname alias\n'
];








//welcome screen
console.log(color.toYellow("\n\t\tWelcome to Simple Note app\n\t\t   Here are the functions"));
console.log('[ '+(color.toLBlue([...commandsarr,'info'].join(', ')) +' ]'));
    

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,

  });

function checkcmd(y) {
  setTimeout(() => {
    if (y) {
      readline.write(y);
    }
  }, 10);

  readline.question(
    "\n\x1b[0m" + color.toGreen("Noter:  ") + "\x1b[38;5;50m",
    (text) => {
      console.log("\x1b[0m");
      let infocmd = ["info", "help", "tutorial"],
        quitcmd = ["close", "exit", "quit", "terminate", "end"];
      let extracmds = infocmd.concat(quitcmd);

      let tmp;

      if (!extracmds.includes(text.trim())) {
        const obj = separate(text);
        const { first: cmd, second1: filename, second2: note } = obj;
        // console.log('command:',cmd)
        notesemittor.emit(cmd, filename, note, readline, checkcmd);
        setUpAlias();
        tmp = cmd;
      }

      if (quitcmd.includes(text.trim())) {
        console.log("\x1b[0m");
        readline.close();
        process.exit(0);
      }
      if (infocmd.includes(text.trim())) {
        commandsinfo.forEach((e) => {
          console.log(color.toYellow(e));
        });
      }
      if (text.trim() == "alias" || text.trim() == "aliases") {
        console.log(aliases);
      }

      setTimeout(() => {
        checkcmd();
      }, 0);
    }
  );
}


console.log('\n');
checkcmd();





