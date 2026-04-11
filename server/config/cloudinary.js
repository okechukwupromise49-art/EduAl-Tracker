// config/cloudinary.js
require("dotenv").config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("❌ Cloudinary environment variables are missing!");
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("✅ Cloudinary configured successfully");
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'cgpa-tracker/profiles',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    resource_type: 'image', 
    //transformation: [{ width: 500, height: 500, crop: 'fill' }],
  },
});

module.exports = { cloudinary, storage };