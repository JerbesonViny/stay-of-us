import { users } from "@/tests/seeds";
import { Db } from "mongodb";

type PopulateDatabaseInput = {
  mongoConnection: Db;
};

type ResetDatabaseInput = {
  mongoConnection: Db;
};

export async function populateDatabase({
  mongoConnection,
}: PopulateDatabaseInput) {
  await Promise.all([
    await mongoConnection.collection("users").insertMany(users),
  ]);
}

export async function resetDatabase({ mongoConnection }: ResetDatabaseInput) {
  await Promise.all([await mongoConnection.collection("users").deleteMany()]);
}
