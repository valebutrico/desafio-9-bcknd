import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET
};

export const connectDB = async () => {
    try {
        await mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
        process.exit(1); 
    }
};

export default config;
