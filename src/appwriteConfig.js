import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('67bea2dc001e1c340258'); // Replace with your project ID

const databases = new Databases(client);

export { client, databases };
