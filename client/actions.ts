"use server";

import { ConsoleTable } from "@/components/console/console";
import { Client } from "@elastic/elasticsearch";
import { aggregationFns } from "@tanstack/react-table";

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
