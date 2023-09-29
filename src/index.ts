import { Injector, settings, webpack } from "replugged";
import { UploadArguments } from "./types";

const injector = new Injector();
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export interface SettingsType {
  method: string;
  randomCharLength: number;
  consistentFilename: string;
}

export const cfg = await settings.init<SettingsType>("dev.Teltta.AnonymiseFileNames", {
  randomCharLength: 7,
  method: "Random Characters",
  consistentFilename: "image",
});

function rSplit(text: string, seperator = " ", maxSplit = 1): string[] {
  let split = text.split(seperator);
  return maxSplit
    ? [split.slice(0, -maxSplit).join(seperator)].concat(split.slice(-maxSplit))
    : split;
}

function getFilename(filename: string): string {
  const fileType = rSplit(filename, ".", 1)[1];
  const method = cfg.get("method");
  switch (method) {
    case "Consistent":
      return `${cfg.get("consistentFilename")}.${fileType}`;

    case "Random Characters": {
      const randCharLen = cfg.get("randomCharLength", 7);
      let chars: string[] = [];
      for (let i = 0; i < randCharLen; i++) {
        chars.push(characters.charAt(Math.floor(Math.random() * characters.length)));
      }
      return `${chars.join("")}.${fileType}`;
    }

    case "Timestamp": {
      return `${Date.now()}.${fileType}`;
    }
  }
  return filename;
}

export async function start(): Promise<void> {
  const attachmentStore = await webpack.waitForModule<{
    uploadFiles: (args: UploadArguments) => void;
  }>(webpack.filters.byProps("uploadFiles"));

  injector.before(attachmentStore, "uploadFiles", (args) => {
    for (const file of args[0].uploads) {
      //console.log(file.filename, getFilename(file.filename));
      file.filename = getFilename(file.filename);
    }
    return args;
  });
}

export function stop(): void {
  injector.uninjectAll();
}

export { Settings } from "./Settings";
