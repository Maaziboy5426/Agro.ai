import { Client, Account } from "appwrite";

const client= new Client();
client  
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject('679f4754002ceb19441a');
export const account = new Account(client);
export default client;