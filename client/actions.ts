"use server";

import { ConsoleTable } from "@/components/console/console";
import { Client } from "@elastic/elasticsearch";
import { aggregationFns } from "@tanstack/react-table";
import connectDB from "./db";
import Alert from "./db/schema"

const client = new Client({
  node: "https://szmnk8f0-9200.uks1.devtunnels.ms/",
});

export async function getServices() {
  const query = {
    size: 10000,
    aggs: {
      id: {
        composite: {
          sources: [
            { id: { terms: { field: "id.keyword" } } },
            { service: { terms: { field: "service.keyword" } } },
          ],
        },
      },
    },
  };

  const resp = await client.search({
    index: "log*",
    body: query,
  });

  return resp.aggregations.id.buckets;
}

export async function getLogs(id: string | undefined) {
  const query = {
    size: 10000,
    query: {
      bool: {
        must: [
          {
            match: {
              id,
            },
          },
        ],
      },
    },
  };

  const resp = await client.search({
    index: "log*",
    body: query,
  });
  const logs = resp.hits.hits;

  const result: MessageLog[] = [];

  const levelMap = {
    INFO: "info",
    ERROR: "error",
    DEBUG: "debug",
    WARNING: "warn",
    CRITICAL: "critical",
  };

  for (const log of logs) {
    result.push({
      time: log._source["@timestamp"],
      level: levelMap[log._source.logLevel],
      content: log._source.logStatement,
    });
  }

  return result;
}




export type Alert = {
  service: string;
}


import prisma from './db/'

export async function createAlert() {
  console.log("DUPA")
  await prisma.alert.create({
    data: {
      appName: "test",
      contains: "test",
      severity: "test",
    cron: "DUPA"
    }
  })
}


export async function getAlerts() {
  return await prisma.alert.findMany()
}