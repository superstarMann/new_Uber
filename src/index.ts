import {Options} from "graphql-yoga";
import app from "./app";
const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND: string = "/playground";
const ENDPOINT: string = "/graphql";

const appOption : Options = {
    port: PORT,
    playground: PLAYGROUND,
    endpoint: ENDPOINT
};

const handleAppStart = () => console.log(`working on port ${PORT}😎😎`)

app.start(appOption,handleAppStart);
