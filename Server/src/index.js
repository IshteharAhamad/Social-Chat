import DBConnection from './Database/Connection.js'
import app from './app.js'
DBConnection()
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    })
    .on('error',(error)=>{
        console.error("Server Error",error)
        process.exit(1)
    });
})
.catch((error)=>{
    console.log(`Database connection has failed`,error)
})
