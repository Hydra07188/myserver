function hello(){
return "Hello, world";
}

function add(a:number,b:number):number{
return a - b;
}

exports.utils = {
    hello,
    add
}