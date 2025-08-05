const Photo = require('../models/Photo');
const fs = require('fs');



exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1 ;  // sayfayı seç yada seçilmiyorsa 1 den başlat 
  const photosPerPage = 2; // her sayfada 2 adet fotoğraf olmasını istyioruz

  const totalPhotos = await Photo.find().countDocuments(); //  bu şekilde toplam fotoğrafları yakaladık . 
  //console.log(totalPhotos);
  const photos = await Photo.find({})
  .sort('-dateCreated')
  .skip((page-1)*photosPerPage) // pas geçmesi gereken fotoğraf adetlerini söylüyoruz
  .limit(photosPerPage); // her sayfada göstermek istediğimiz fotoğraf limiti


  res.render('index' , {
    photos:photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage)
  });


  // const photos = await Photo.find({}).sort('-dateCreated'); // sort ile zincirleme DatecReated sırası ile sıralamasını istiyoruz fotoları. En son yazılanın en başa gelmesi için başına '-' işareti koyuyoruz.
  // console.log(req.query);
  // res.render('index', {
  //   photos, // photos:photos diyeceğimiz için direkt photos sadece yazsak yeter
  // });
};

exports.getPhoto = async (req, res) => {
  //console.log(req.params.id);
  //res.send("Fotoğraf ID'si loglandı");
  //res.render('about');
  const photo = await Photo.findById(req.params.id); // bu seçim ile hangi fotoğrafa ait bilgiler varsa o id'den çekiyoruz.
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  // tıkanma yaşamamak için async fonksiyona çeviriyoruz.
  // add.ejs kısmında action olayında POST metodunda photos'a yönlendiriyoruz.
  //console.log(req.files.image);
  //await Photo.create(req.body); // request body den gelen veriyi kullanarak oluşturduk.
  //res.redirect('/'); // req,res döngüsünden sonra tamamlayınca anasayfaya dönmesini istiyoruz.

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    //klasörün olup olmadığını kontrol etmek için bunu yazarız başına ! ile eğer yoksa koşulu yaptık
    fs.mkdirSync(uploadDir);
  }
  //bu işlemleri asenkron değil senkron şekilde yapılmasını istedik

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name; //__dirname = var olan klasörün kendisini gösterir. // uploads dosyasını public dosyasına kendisi açacak

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};
//Photo nun içine sahip olunan değerler haricinde diğer değerleri ekletiyoruz ...req.body'den sonra

exports.updatePhoto = async (req, res) => {
  // tarayıcı ve uygulama tarafını birbirine karıştırmıyoruz içerisinde put kullandık edit.ejs'de put geçecez POST yazıyordu fakat
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  //console.log(req.params.id); // terminalden console.log ile ID'Yİ yakalayıp yakalamadığımızı kontrol ediyoruz.
  //await Photo.findByIdAndDelete(req.params.id);

  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  //burada kullandığıımız image veritabanındaki    'image:"/uploads/harley_unsplash.jpg"' adresine gidiyor aslında yani bir daha bu adresi yazma gereği yok image diye belirttik.
  fs.unlinkSync(deletedImage); // senkron bir işlem yapamsını istedik bu işlemi yapmadan bir alt satıra geçsin istemiyoruz.
  await Photo.findByIdAndDelete(req.params.id); // veritabanından da siliyoruz.
  res.redirect('/'); // işlemden sonra anasayfaya yönlendirmesini sağlıyoruz.

  //önce fotoğrafı yakal sonrasıdan o fotoğrafı klasörden sil, sonrasında da o bilgileri veri tabanından sil şeklinde ilerleyeceğiz.
};
