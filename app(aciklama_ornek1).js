// const express = require('express');
// const ejs = require('ejs');
// const path = require('path');

// const app = express();

// //express.static middleware'dir
// // requise ve response döngüsünün içersindeki her şeye middleware denir. yani arasında yapılır.

// // const myLogger = (req,res,next)=>{
// //   console.log("Middleware Log 1");
// //   //next demedğimiz için istek attık ama cevap alamıyoruz beklemeye alıyor icon dönüyor
// //   //yani kısaca bir sonraki middleware ilerlemiyor.
// //   next();
// // }

// // const myLogger2 = (req,res,next)=>{
// //   console.log("Middleware Log 2");
// //   next();
// // }

// //TEMPLATE ENGINE
// app.set('view engine', 'ejs');

// //MIDDLEWARE
// app.use(express.static('public'));
// // app.use(myLogger);
// // app.use(myLogger2);

// //Routes 
// app.get('/', (req, res) => {
//   // const photo = {
//   //   id: 1,
//   //   name: 'Photo Name',
//   //   description: 'Photo Description'
//   // };
//   // res.send(photo);

//   //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
//   res.render('index');
// });

// const port = 4000;
// app.listen(port, () => {
//   console.log(`Sunucu ${port} portunda başlatıldı...`);
// });
