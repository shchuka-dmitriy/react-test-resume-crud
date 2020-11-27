const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = env === 'production' ? 3000 : 9634;

export default {
  STATIC_IMAGES_PATH: '/staticImages/',
  STATIC_PHOTOS_PATH: '/photos/',
  ANONYM_IMAGE_PATH: '/staticImages/anonymous2.png',
  ANONYM_PHOTO: 'anon.png',
  BASE_URL: `http://${ serverIP }:${ serverPort }/`,
  HOME_URL: `http://${ serverIP }:3000`,
  publicURL: env === 'production'
    ? `http://${ serverIP }:80/photos/`
    : `http://${ serverIP }:${ serverPort }/public/photos/`,
  publicPhotosURL: env === 'production'
      ? `http://${ serverIP }:80/photos/`
      : `http://${ serverIP }:${ serverPort }/public/photos/`,
  ACCESS_TOKEN: 'accessToken'
};