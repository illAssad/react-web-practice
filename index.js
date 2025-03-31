const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    let kittySchema
    let Kitten
    try {
        kittySchema = new mongoose.Schema({
            name: String
        });
        Kitten = mongoose.model('Kitten', kittySchema);
    } catch (error) {
        console.log('error:');
        console.log(error);
    }



    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'


}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.send('Post Heello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


main()