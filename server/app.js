const express = require('express');
const PORT = 3000
const app = express();
const cors = require('cors');
const router = require('./routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use(router)

app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`)
})