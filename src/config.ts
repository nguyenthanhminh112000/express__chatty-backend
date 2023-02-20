import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';
//
console.log('src/config.ts');
dotenv.config({});

class Config {
  public readonly DATABASE_URL: string | undefined;
  public readonly JWT_TOKEN: string | undefined;
  public readonly NODE_ENV: string | undefined;
  public readonly SECRET_KEY_ONE: string | undefined;
  public readonly SECRET_KEY_TWO: string | undefined;
  public readonly CLIENT_URL: string | undefined;
  public readonly REDIS_HOST: string | undefined;
  public readonly CLOUDINARY_CLOUD_NAME: string | undefined;
  public readonly CLOUDINARY_API_KEY: string | undefined;
  public readonly CLOUDINARY_API_SECRET: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.NODE_ENV = process.env.NODE_ENV;
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.REDIS_HOST = process.env.REDIS_HOST;
    this.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
  }
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }
  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined || value === '') throw new Error(`Value of ${key} is ${value}`);
    }
  }
  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUDINARY_CLOUD_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET
    });
  }
}
export const config: Config = new Config();
