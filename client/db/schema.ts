import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Level = {
  CRITICAL: "critical",
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
};

const AlertSchema = new Schema({
  appName: String,
  severity: Level,
  cron: Date,
  messageContains: String,
});

export default mongoose.model("Alert", AlertSchema);
