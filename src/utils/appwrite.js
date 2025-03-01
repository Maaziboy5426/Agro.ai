import { Client, Account, ID } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("67c06f84002155503e9d"); // Replace with your Appwrite project ID

const account = new Account(client);


export { account, ID };
