const {format}=require('date-fns');

const fs=require('fs');

const path=require('path');

const createnote=async (filename,note)=>{
    try{
        const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
        const toaddtxt=`${dateTime}\t\t${note}\n`
        if(!fs.existsSync(path.join(__dirname,'notes')))
        {
            fs.mkdirSync(path.join(__dirname,'notes'));
        }
        
        if(!fs.existsSync(path.join(__dirname,'notes',`${filename||dateTime}.txt`)))
        {
            fs.writeFileSync(path.join(__dirname,'notes',`${filename||dateTime}.txt`),toaddtxt);
            console.log("Note created... ")
        }

        else{
            console.log('file already exists');
        }

    }
    catch(err){
        console.log(err);
    }
    
}

const overwritenote=async (filename,note)=>{
    try{
        const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
        const toaddtxt=`${dateTime}\t\t${note}\n`
        if(!fs.existsSync(path.join(__dirname,'notes')))
        {
            fs.mkdirSync(path.join(__dirname,'notes'));
        }
        { 
            if(fs.existsSync(path.join(__dirname,'notes',`${filename}.txt`)))
            {
                fs.writeFileSync(path.join(__dirname,'notes',`${filename}.txt`),toaddtxt);
                console.log('Note overwritten');
            }
            else{
                console.log("!!! [File does not exist] !!!")
            }  
        }


    }
    catch(err){
        console.log(err);
    }
    
}

const appendnote=async (filename,note)=>{
    try{
        const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
        const toaddtxt=`${dateTime}\t\t${note}\n`
        if(!fs.existsSync(path.join(__dirname,'notes')))
        {
         fs.mkdirSync(path.join(__dirname,'notes'));
        }
        fs.appendFileSync(path.join(__dirname,'notes',`${filename||dateTime}.txt`),toaddtxt);
        console.log('Note appended');
    }
    catch(err){
        console.log(err);
    }   
}

const deletenote=async (filename)=>{
    const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
    if(fs.existsSync(path.join(__dirname,'notes',`${filename||dateTime}.txt`)))
    {
        try{
            fs.rm(path.join(__dirname,'notes',`${filename||dateTime}.txt`),()=>{console.log('Deleted: '+filename)});
            console.log('Note deleted');
        }
        catch(err){
            console.log(err);
        }  
    }
    else{
        console.log('!!! [File does not exist] !!!')
    } 
}


const readnote=async (filename)=>{
    const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
    if(fs.existsSync(path.join(__dirname,'notes',`${filename||dateTime}.txt`)))
    {    try{
            const rs=fs.readFileSync(path.join(__dirname,'notes',`${filename||dateTime}.txt`), 'utf-8');
            console.log(rs)
        }
        catch(err){
            console.log(err);
        }  
    } 
    else{
        console.log('!!! [Note does not exist] !!!');
    }
}
const rename=async (filename,newfilename)=>{
    const dateTime=`${format(new Date(),'yyyy-MM-dd HH-mm-ss')}`
    if(fs.existsSync(path.join(__dirname,'notes',`${filename||dateTime}.txt`)))
    {
        try{
            fs.renameSync(path.join(__dirname,'notes',`${filename}.txt`),path.join(__dirname,'notes',`${newfilename}.txt`));
        console.log('Note renamed');
    }
        catch(err){console.log(err)}

    }
    else{
        console.log("!!! [File does not exist] !!!")
    }
}

const deleteall= (z,a)=>{

    z.question('!![ Are you sure? ]!!:  ', 
    text => {
        const yessy=['y','Y','yes','Yes','YES','yEs','1'];

        if(yessy.includes(text))
        {
            fs.rmSync(path.join(__dirname,'notes'),{recursive:true,force:true}); 
            console.log('Deleted all notes');

            a();
        }
        else{
            console.log('Not deleted');
            a(); 
        }
    }
    )



 
}

module.exports={createnote,appendnote,deletenote,overwritenote,readnote,rename,deleteall};
