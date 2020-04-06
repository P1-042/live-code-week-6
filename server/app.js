const express = require('express');
const PORT = 3000
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.get('/',(req,res)=>{
  res.send('hello')
})

app.listen(PORT,()=>{
  console.log(`listening to port ${PORT}`)
})