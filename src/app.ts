import cors from 'cors';
import {GraphQLServer, PubSub} from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import decodeJWT from './utils/decode.JWT';
import { Response, NextFunction, Request } from 'express';

class App {
    public app: GraphQLServer;
    public pubSub: any;
    constructor () {
        this.pubSub = new PubSub(); 
        this.pubSub.ee.setMaxListners(99);
        this.app = new GraphQLServer ({
            schema: schema,
            context: req => {
                return {
                    req: req.request,
                    pubSub: this.pubSub
                };
            }
        })
        this.midlewares();
    }
    private midlewares = () : void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
    };
    private jwt = async (req, res: Response, next: NextFunction): Promise<void> => {
      const token = req.get("X-JWT");
      if (token) {
        const user = await decodeJWT(token);
        if(user) {
            req.user = user;
        }else{
            req.user = undefined;
        }
      }
      next();
    };
  }
  export default new App().app;