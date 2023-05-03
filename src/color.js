function toRed(string)
{
    return "\x1b[31m" + string.toString() +"\x1b[0m" ;
}

function toGreen(string)
{
    return "\x1b[32m" + string.toString() +"\x1b[0m" ;
}

function toLGreen(string)
{
    return "\x1b[38;5;46m" + string.toString() +"\x1b[0m" ;
}

function toYellow(string)
{
    return "\x1b[33m" + string.toString() +"\x1b[0m" ;
}

function toLBlue(string)
{
    return "\x1b[36m" + string.toString() +"\x1b[0m" ;
}

function toBgRed(string)
{
    return "\x1b[41m" + string.toString() +"\x1b[0m" ;
}


module.exports={toRed,toGreen,toYellow,toBgRed,toLBlue,toLGreen}