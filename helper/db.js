const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movie_user:onFgPpl8RqkCLAam@cluster0-v9ufy.mongodb.net/test?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

    mongoose.connection.on('open', () => {
        console.log('MongoDB Connection Başarılı');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB Bağlantı Başarısız')
    })
}