/* eslint-disable no-undef */
import fs from "fs";
import path from "path";

// Helper function to list log files
export const listLogFiles = (logType: string): string[] => {
  const logDir = path.join(process.cwd(), "logs", "winston", logType);
  try {
    return fs.readdirSync(logDir).filter((file) => file.endsWith(".log"));
  } catch (err) {
    console.error(`Failed to list ${logType} logs: `, err);
    return [];
  }
};
