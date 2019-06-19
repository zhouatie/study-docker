const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.end('success')
})

app.listen(6001)