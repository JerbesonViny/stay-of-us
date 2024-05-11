import dotnev from "dotenv";
dotnev.config();

import axios, { AxiosInstance } from "axios";
import { populateDatabase, resetDatabase } from "@/tests/utils/mongo";
import {
  MongoConnectionSingleton,
  MongoDatabase,
} from "@/main/config/mongo-connection";
import { Db } from "mongodb";
import { gql } from "apollo-server-express";
import { print } from "graphql";

describe("User (e2e)", () => {
  let app: AxiosInstance;
  let mongoDatabase: MongoDatabase;
  let mongoConnection: Db;

  beforeAll(async () => {
    mongoDatabase = new MongoConnectionSingleton().getInstance();
    mongoConnection = await mongoDatabase.getConnection();

    app = axios.create({
      baseURL: "http://localhost:4000",
    });
  });

  afterAll(async () => {
    await mongoDatabase.close();
  });

  beforeEach(async () => {
    await resetDatabase({ mongoConnection });
    await populateDatabase({ mongoConnection });
  });

  it("Should create user", async () => {
    const result = await app
      .post("/", {
        query: print(gql`
          mutation CreateUser($input: CreateUserInput) {
            createUser(input: $input) {
              id
            }
          }
        `),
        variables: {
          input: {
            confirmPassword: "123",
            name: "Example2",
            login: "example4@example.com",
            password: "123",
          },
        },
      })
      .then((response) => {
        const { data } = response;

        return Object.assign(response, data);
      })
      .catch((error) => {
        return {
          data: null,
          error: error.response.data,
        };
      });

    expect(result).not.toHaveProperty("error");
    expect(result.data.createUser).toHaveProperty("id");
    expect(result.data.createUser.id).not.toBeNull();
  });

  it("Should get user", async () => {
    const result = await app
      .post("/", {
        query: print(gql`
          query {
            users {
              id
              name
            }
          }
        `),
      })
      .then((response) => {
        const { data } = response;

        return Object.assign(response, data);
      })
      .catch((error) => {
        return {
          data: null,
          error: error.response.data,
        };
      });

    expect(result).not.toHaveProperty("error");
    expect(result.data.users.length).toBe(2);
    expect(result.data.users).toMatchSnapshot();
  });
});
