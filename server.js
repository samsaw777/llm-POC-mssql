import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains/sql_db";
import * as dotenv from "dotenv";

dotenv.config();

const run = async () => {
  // const datasource = new DataSource({
  //   type: "sqlite",
  //   database: "db/chinook.db",
  // });

  // Configuring mssql database.
  const datasource = new DataSource({
    type: "mssql",
    host: "SAMEEP",
    port: 1433,
    username: "sa",
    password: "sameep@85841435",
    database: "testdatabase",
    synchronize: true,
    options: {
      trustServerCertificate: true,
    },
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const chain = new SqlDatabaseChain({
    llm: new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    }),
    database: db,
  });

  const res = await chain.run("what is the age if Pep ?");
  console.log(res);
};

run();
