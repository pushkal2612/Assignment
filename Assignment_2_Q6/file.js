const {log}=require ("console")
const fs=require ("fs")

const createtodo =(todo)=>{
    const alltodo=loadtodo()
    const duplicate=alltodo.find(ele=>{
        return ele.name == data.name
    })
    if(duplicate)
    {
        console.log("todo is already exist!!");
        return ;
    }
    alltodo.push(todo)
    const jsontodo=JSON.stringify(alltodo)
    fs.writeFile("data.json",jsontodo,(err,todo)=>{
        console.log("todo created...");
    })
}
const Viewtodo=()=>{
    const alltodo = loadtodo()
    console.log(alltodo);
}
const loadtodo=()=>{
    try{
        const todo=fs.readFileSync("todo.json","utf-8")
        return JSON.parse(todo);
    }
    catch(error)
    {
        return [];
    }
}
const removetodo=(title)=>{
    const alltodo = loadtodo()
    const xyz = alltodo.filter(ele=>{
        return ele.title != title;
    })
    
    const jsontodo=JSON.stringify(xyz)
    fs.writeFile("todo.json",jsontodo,(err,data)=>{
        console.log("data remove...");
    })
}
module.exports={createtodo,Viewtodo,removetodo}