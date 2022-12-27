import Resizer from "./resizer";
import moment from 'moment';

export const amountFormat = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatImage = (image, callbackFunc) => {
  let fileInput = false;
  if (image) {
    fileInput = true;
  }
  if (fileInput) {
    try {
      Resizer.imageFileResizer(
        image,
        600,
        400,
        "JPEG",
        100,
        0,
        (uri) => {
          
          callbackFunc(uri);
       
        },
        "base64",
        600,
        400
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export const simpleDateString = (date) => {
  return date ? moment(date).format().replace(/T.+$/, '') : '';
};

export const dateInWord = (date) => {
  return date ? moment(date).format('MMMM Do YYYY') : ""; 
};

export const sentenceCaseFormat = (str) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}


