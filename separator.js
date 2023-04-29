function separate(text)
{
const a=text
let t=a.trim();
const first=t.slice(0,t.indexOf(' '));
let second=t.slice(t.indexOf(' '),t.length).trim();

let second1,second2;
if(second.includes(`'`) && !second.includes(`"`))
{
    // console.log('case 1'); testing
     [second1,second2]=second.split(`'`).map((e)=>e.trim()).filter((e)=>e.trim() && e.trim());
}
if(second.includes(`"`) && !second.includes(`'`))
{
    // console.log('case 2');
     [second1,second2]=second.split(`"`).map((e)=>e.trim()).filter((e)=>e.trim() && e.trim());
}
if(second.includes(`"`) && second.includes(`'`))
{
    // console.log('case 3');
    let str = second;
    let indices = [];
    for(let i=0; i<str.length;i++) {
    if (str[i] === "'" || str[i]=='"') {indices.push(i)};
    second1=second.slice(indices[0]+1,indices[1]);
    second2=second.slice(indices[2]+1,indices[3])

}
}
if(!second.includes(`"`) && !second.includes(`'`)){
    const arr=second.split(' ');
    // console.log('case 4');
    [second1,...temp]=arr;
    second2=temp.join(" ");
}
// console.log(`first:${first}\nsecond:${second}\nSecond1:${second1}\nSecond2:${second2}`);
return {first,second1,second2};
}
module.exports=separate;
