const express = require('express');
const cros = require('cors');
require("./db")

//init
const app = express();

//middlewere
app.use( cros() );
app.use( express.json() );

//routs
app.use('/api/get_all', require('./routes/view') );
app.use('/api/create', require('./routes/create_user') );
app.use('/api/update', require('./routes/update') );
app.use('/api/delete_user', require('./routes/delete_user') );

app.get('/', (req, res)=>{
    res.send("<h1>Welcome</h1>")
})

//run the server
app.listen(1000, ()=>console.log('server is listening on port 1000. visit: http://localhost:1000'))


