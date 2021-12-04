import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA53ctMGYKyKu8Ps0NgSox70MBNlSaZMdM',
  authDomain: 'netflix-59757.firebaseapp.com',
  projectId: 'netflix-59757',
  storageBucket: 'netflix-59757.appspot.com',
  messagingSenderId: '198276156901',
  appId: '1:198276156901:web:51e071032c59c9f0db330c',
  measurementId: 'G-SFQ2JFT42M',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
