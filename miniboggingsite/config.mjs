import dotenv from 'dotenv'
dotenv.config();
const URI= process.env.mongoDB;
const PORT= process.env.PORT;
export{URI,PORT};