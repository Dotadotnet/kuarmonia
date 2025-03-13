import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS|| "{}");

// نمایش مقدار در کنسول برای بررسی
console.log("Service Account:", serviceAccount);



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
