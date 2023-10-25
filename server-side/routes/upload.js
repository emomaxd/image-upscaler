const express = require('express');
const multer = require('multer');
const waifu2x = require('waifu2x');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/'); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });






// -------------


router.post('/uploads', upload.single('photo'), async (req, res) => {
  console.log('got post request');

  const uploadedPhoto = req.file;
  const noise = req.body.noise;
  const scale = req.body.scale;
  const mode = req.body.mode;

  const options = {
    upscaler: 'real-esrgan',
    scale: scale,
    mode: mode,
    noise: noise
  };

  const progressCallback = (progress) => {
    console.log(`Progress: ${progress}%`);
  };

  console.log(noise);
  console.log(scale);
  console.log(mode);

  console.log('Uploaded photo:', uploadedPhoto);

  if (!uploadedPhoto) return;

  const sourcePath = path.join(__dirname, '../../uploads/', uploadedPhoto.originalname);
  const destPath = path.join(__dirname, '../../upscale-results/USCLD-' + uploadedPhoto.originalname);


  
  


  await waifu2x.default.upscaleImage(sourcePath, destPath, options, progressCallback)
    .then((resultPath) => {
      console.log('Upscaling completed successfully.');
      console.log('Result image:', resultPath);
      res.download(destPath, (err)=>{
        if(err)
          console.log("ERROR WHILE DOWNLOADING : " + err );    
      })
    })
    .catch((error) => {
      console.error('Upscaling failed:', error);
  });

  
  

});


module.exports = router;
