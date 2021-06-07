import {MongoClient} from 'mongodb';

import keys from "../config/keys";

export async function connectToDatabase() {
  return await MongoClient.connect(keys.mongoAuthURI);
}
