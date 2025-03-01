import { Client, Account, ID } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite endpoint
    .setProject("67bea2dc001e1c340258"); // Replace with your actual Appwrite project ID

const account = new Account(client);

export { account, ID };
