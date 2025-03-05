import { config } from "@/conf"

function buildLogMessage(
  level: string,
  message: string,
  ...optionalParams: any[]
) {
  return JSON.stringify({
    level,
    timestamp: new Date().toISOString(),
    message,
    extra: optionalParams,
  })
}

class Logger {
  static info(message: string, ...optionalParams: any[]): void {
    const log = buildLogMessage("info", message, ...optionalParams)
    console.log(log)
  }

  static warn(message: string, ...optionalParams: any[]): void {
    const log = buildLogMessage("warn", message, ...optionalParams)
    console.log(log)
  }

  static error(message: string, ...optionalParams: any[]): void {
    const log = buildLogMessage("error", message, ...optionalParams)
    console.log(log)
  }

  static debug(message: string, ...optionalParams: any[]): void {
    if (config.ENV === "development") {
      const log = buildLogMessage("debug", message, ...optionalParams)
      console.log(log)
    }
  }
}

export default Logger
