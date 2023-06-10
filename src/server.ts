import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./router/user.router";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";

class ServerBootstrap extends ConfigServer {
  
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT') || 8000;

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Start to Database
    this.dbConnect();

    this.app.use(morgan("dev"));
    this.app.use(cors());

    // Routes
    this.app.use('/api', this.routers())
    this.listen();
  }

  private routers(): Array<express.Router>{
    return [new UserRouter().router];
  }

  async dbConnect(): Promise<DataSource> {
    return await new DataSource(this.typeORMConfig).initialize();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`);
    });
  }
}

new ServerBootstrap();
