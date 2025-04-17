const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (req, res)=>{
    res.send('working');
});

app.listen(5000, () => console.log(`Server running on port ${5000}`));