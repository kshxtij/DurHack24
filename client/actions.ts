/* eslint-disable */
// @ts-nocheck

"use server";

import { ConsoleTable } from "@/components/console/console";
import { Client } from "@elastic/elasticsearch";
import { aggregationFns } from "@tanstack/react-table";
import connectDB from "./db";
import Alert from "./db/schema";

const client = new Client({
  node: "https://szmnk8f0-9200.uks1.devtunnels.ms/",
});

export async function getServices() {
  const query = {
    size: 10,
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

  if (!resp.aggregations.id) {
    return [];
  }

  return resp.aggregations.id.buckets;
}

export async function getMessageLogs(id: string | undefined, limit = 20) {
  let query = {
    size: limit,
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

  if (!id) {
    query = {
      size: limit,
      query: {
        match_all: {},
      },
    };
  }

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

export async function getHistogram(interval = "minute") {
  const query = {
    aggs: {
      "Group By Date": {
        date_histogram: {
          field: "@timestamp",
          interval: "minute",
          format: "k",
        },
      },
    },
  };

  const resp1 = await client.search({
    index: "log*",
    body: query,
  });

  return resp1.aggregations["Group By Date"].buckets;
}

export type Alert = {
  service: string;
};

import prisma from "./db/";
import { exit } from "process";
import { Automation } from "@prisma/client";

export async function createAutomation(data:  Omit<Automation, "id">) {
  await prisma.automation.create({
    data: {
      ...data,
    },
  });
}

export async function getAutomations() {
  return await prisma.automation.findMany();
}

export async function getAlerts() {
  return await prisma.alert.findMany();
}

export async function deleteAutomation(id: number) {
  return await prisma.automation.delete({
    where: {
      id,
    },
  });
}