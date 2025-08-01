import dotenv from 'dotenv';
dotenv.config();
import  imagekit  from 'imagekit';



const uploadImage = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default uploadImage;