const yargs = require("yargs")
const file=require("./file")

yargs.command({
    command: "create",
    builder:{
        title:{
            type:String
        },
        todo:{
            type:String
        }
    },
    handler:function(argv)
    {
        const todo={
            title:argv.title,
            todo:argv.todo
        }
        file.createtodo(todo)
    }
})
yargs.command({
    command:"view",
    handler:function(argv){
        file.Viewtodo()
    }
})
yargs.command({
    command:"remove",
    builder:{
        title:{
            type:String
        }
    },
    handler:function(argv)
    {
        file.removetodo(argv.name)
    }
})
yargs.argv