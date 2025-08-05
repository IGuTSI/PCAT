const mongoose = require('mongoose');

const Schema = mongoose.Schema; // Schema bir şablon demektir.

//CONNECT db

// eğer girilen veritabanı adresi varsa ona bağlar yok ise o veritabanını oluşturur.
mongoose.connect(
  'mongodb://localhost/pcat-test-db'
  // {
  //   useNewUrlParser:true,
  //   useUnifiedTopology: true           // Eski sürümlerde vardı hocanın yaptığı fakat artık yeni sürümlerde bunları kullanmaya gerek yok bunsuz da olur.
  // }
);

//create schema
const PhotoSchema = new Schema({
  title: String, //değerleri string gireceğimiz için belirttik.
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema); // mongoose bizim yermize alıp bunu db'de çoğul ekli olarak çalıştırıyor yani 'photos' olarak oluşturuldu

//create a photo
// Photo.create({
//   title: 'Photo Title 2 ',
//   description: 'Photo description 2 lorem ipsum'
// }).then(photo => {
//   console.log('Photo created:', photo);
// });

console.log('Database oluşturuldu.');

//read a photo
//Çalışmıyor
//hocanın kullandığı aşağıdaki kod artık geçerli değildir bu eskide kaldı mongodb'de artık yeni yöntemleri aşağıda
// Photo.find({}, (err, data) => {
//   console.log(data);
// });

//yöntem 1 ;(Çalışıyor)
// async function readPhotos(){
//   const photos = await Photo.find({});
//   console.log(photos);
// }

// readPhotos();

//yöntem 2 (Çalışıyor)
// Photo.find({}).then(photo=>{
//   console.log(photo);
// });

//Update photo

//const id = '688203779e13a8e395b96cd5';

//Bu eski kod o yüzden çalışmıyor
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 1 Updated',
//     description: 'Photo description 1 uploated'
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );



//Yöntem 1 (Çalışıyor)

// async function updatePhoto() {
//   const id = '688203779e13a8e395b96cd5';
//   const updatedPhoto = await Photo.findByIdAndUpdate(
//     id,
//     {
//       title: 'Photo Title 1 Updated',
//       description: 'Photo description 1 updated'
//     },
//     { new: true } // Bu, güncellenmiş veriyi döndürmesini sağlar
//   );
//   console.log(updatedPhoto);
// }

// updatePhoto();


//Yöntem 2(Çalışıyor)
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 1 Updated first again',
//     description: 'Photo description 1 updated first again'
//   },
//   { new: true }
// ).then(updatedPhoto => {
//   console.log(updatedPhoto);
// });

//delete a photo
const id2='688203779e13a8e395b96cd5';
//Eski kod çalışmıyor 
// Photo.findByIdAndDelete(id,(err,data)=>{
//   console.log('Photo is removed...');
// });



//Yeni şekli böyle çalışıyor.
Photo.findByIdAndDelete(id).then(deletephoto=>{
  console.log('Photo removed....');
});


