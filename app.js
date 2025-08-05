const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
//const path = require('path');
//const fs = require('fs'); // fs kodu ile artık dosya işlemleri yapılabilir.
//const Photo = require('./models/Photo');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db')
.then(() => {
  console.log('DB CONNECTED!')
}).catch((err)=>{
  console.log(err);
})

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //add sayfasında submit edince girilen değerleri yanıt alamıyor dönüyordu bunu da express ile hallettik. Yani request , response döngüsüne başlıyor bu döngüyü tamamlamamız lazım şimdilik console'a yazdı burası sayesinde.
app.use(express.json()); // bu iki kod yukaridaki ve bu aldığımız aldığımız requiesti sonlandırmamıza yardımcı oldu.
//url'deki datayı okumamızı sağlıyor. bu iki kod
app.use(fileUpload()); // yukarıya tanımladığımı require ile bunu çalıştırıcaz. MIDDLEWARE kayıdımız oldu.
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
); //Hangi methodların overrate edilmesi gerektiğiini yani expressit olarak yani ayrıcı belirtmemeiz gerekiyor o yüzden yanına '_method' yanına ekleyeceğiz.

app.get('/', photoController.getAllPhotos);

app.get('/photos/:id', photoController.getPhoto);

app.post('/photos', photoController.createPhoto);

app.put('/photos/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);


app.get('/about', pageController.getAboutPage);

app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);

const port = 4000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
