const app = require('./server.js');


const PORT = 8080;

app.listen(PORT,() => {
    console.log(`The server is listing on PORT: ${PORT}`);
    console.log(`running environment ${process.env.NODE_ENV}`)
    console.log(`running environment ${process.env.DB_CONNECTION_STRING}`)
});