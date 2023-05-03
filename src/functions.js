const {format}=require('date-fns');
const color=require('./color')
const path=require('path');
const fs=require('fs');
let aliasestmp=fs.readFileSync(path.join(path.dirname(__dirname),'config','aliases'))
let aliases=JSON.parse(aliasestmp);

const createnote=async (filename,note)=>{
    try{
        const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
        const toaddtxt=`${dateTime}\t\t${note}\n`
        if(!fs.existsSync(path.join(path.dirname(__dirname),'notes')))
        {
            fs.mkdirSync(path.join(path.dirname(__dirname),'notes'));
        }
        
        if(!fs.existsSync(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`)))
        {
            fs.writeFileSync(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`),toaddtxt);
            console.log(color.toLGreen("Note created... "));
        }

        else{
            console.log(color.toRed('file already exists'));
        }

    }
    catch(err){
        console.log(color.toBgRed(err));
    }
    
}

const overwritenote=async (filename,note)=>{
    try{
        const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
        const toaddtxt=`${dateTime}\t\t${note}\n`
        if(!fs.existsSync(path.join(path.dirname(__dirname),'notes')))
        {
            fs.mkdirSync(path.join(path.dirname(__dirname),'notes'));
        }
        { 
            if(fs.existsSync(path.join(path.dirname(__dirname),'notes',`${filename}.txt`)))
            {
                fs.writeFileSync(path.join(path.dirname(__dirname),'notes',`${filename}.txt`),toaddtxt);
                console.log(color.toLGreen('Note overwritten'));
            }
            else{
                console.log(color.toBgRed("!!! [File does not exist] !!!"));
            }  
        }


    }
    catch(err){
        console.log(color.toBgRed(err));
    }
    
}

const appendnote=async (filename,note)=>{
    try{
        const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
        const toaddtxt=`${dateTime}\t\t${note}\n`
        if(!fs.existsSync(path.join(path.dirname(__dirname),'notes')))
        {
         fs.mkdirSync(path.join(path.dirname(__dirname),'notes'));
        }
        fs.appendFileSync(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`),toaddtxt);
        console.log(color.toLGreen('Note appended'));
    }
    catch(err){
        console.log(color.toBgRed(err));
    }   
}

const deletenote=async (filename)=>{
    const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
    if(fs.existsSync(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`)))
    {
        try{
            fs.rm(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`),()=>{console.log('Deleted: '+filename)});
            console.log(color.toLGreen('Note deleted'));
        }
        catch(err){
            console.log(color.toBgRed(err));
        }  
    }
    else{
        console.log(color.toRed('!!! [File does not exist] !!!'));
    } 
}

const readnote=async (filename)=>{
    const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
    if(fs.existsSync(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`)))
    {    try{
            const rs=fs.readFileSync(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`), 'utf-8');
            console.log(rs)
        }
        catch(err){
            console.log(color.toBgRed(err));
        }  
    } 
    else{
        console.log(color.toRed('!!! [File does not exist] !!!'));
    }
}

const rename=async (filename,newfilename)=>{
    const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
    if(fs.existsSync(path.join(path.dirname(__dirname),'notes',`${filename||dateTime}.txt`)))
    {
        try{
            fs.renameSync(path.join(path.dirname(__dirname),'notes',`${filename}.txt`),path.join(path.dirname(__dirname),'notes',`${newfilename}.txt`));
        console.log('Note renamed');
    }
        catch(err){
            console.log(color.toBgRed(err));
        }

    }
    else{
        console.log(color.toRed('!!! [File does not exist] !!!'));
    }
}

const deleteall= (readline,a)=>{

    readline.question('!![ Are you sure?(y/n) ]!!:  ', 
    text => {
        const yessy=['y','Y','yes','Yes','YES','yEs','1'];

        if(yessy.includes(text))
        {
            fs.rmSync(path.join(path.dirname(__dirname),'notes'),{recursive:true,force:true}); 
            console.log(color.toLGreen('Deleted all notes'));

            a();
        }
        else{
            console.log(color.toRed('Not deleted'));
            a(); 
        }
    }
    )
}


const createAlias = async (cmdname, alias) => 
{
  let newAliases = { ...aliases };
  newAliases[cmdname].push(alias);
  fs.writeFileSync(
    path.join(path.dirname(__dirname), "config", "aliases"),
    JSON.stringify(newAliases)
  );
  console.log(color.toLGreen(`Alias '${alias}' created for "${cmdname}" `));
};

const deleteAlias = async (cmdname, alias) => {
  let newAliases = { ...aliases };
  let tmp = newAliases[`${cmdname}`].filter((e) => e !== alias);

  newAliases[`${cmdname}`] = tmp;

  fs.writeFileSync(
    path.join(path.dirname(__dirname), "config", "aliases"),
    JSON.stringify(newAliases)
  );
  console.log(color.toLGreen(`Alias '${alias}' deleted for "${cmdname}" `));
};



const edit= (filename,readline,fn)=>{

    let rs;
    if(fs.existsSync(path.join(path.dirname(__dirname),'notes',`${filename}.txt`)))
    {    try{
            rs=fs.readFileSync(path.join(path.dirname(__dirname),'notes',`${filename}.txt`), 'utf-8');
            }
        catch(err){
            console.log(color.toBgRed(err));
        }
    }
    else{
        console.log(color.toRed('! File not found !'));
    }
    console.log(`\nNote: ${filename} ${rs}`);
    fn(`overwrite ${filename} `)
}



module.exports={createnote,appendnote,deletenote,overwritenote,readnote,rename,deleteall,createAlias,deleteAlias,edit};
