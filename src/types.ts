interface messageReference {
  guild_id: string; // eslint-disable-line
  channel_id: string; // eslint-disable-line
  message_id: string; // eslint-disable-line
}
interface localFile {
  lastModified: number;
  lastModifiedDate: object;
  name: string;
  path: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
interface uploadLocalItem {
  file: localFile;
  isClip: boolean;
  isThumbnail: boolean;
  platform: number;
}
interface uploadFile {
  channelId: string;
  classification: string;
  currentSize: number;
  description: null | string;
  filename: string;
  id: string;
  isClip: boolean;
  isImage: boolean;
  isThumbnail: boolean;
  isVideo: boolean;

  item: uploadLocalItem;

  loaded: number;
  mimeType: string;
  preCompressionSize: number;
  reactNativeFileIndex: number;
  reactNativeFilePrepped: boolean;
  responseUrl: string;
  showLargeMessageDialog: boolean;
  spoiler: boolean;
  status: string;
  uniqueId: string;
  uploadedFileName: string;

  _aborted: boolean;
  _eventsCount: number;
  _maxListeners: null | number;
}
interface allowedMentions {
  parse: string[];
  replied_user: boolean; // eslint-disable-line
}
interface parsedMessage {
  content: string;
  tts: boolean;
  invalidEmojis: unknown[];
  validNonShortcutEmojis: unknown[];
}
interface options {
  stickerIds: string[];
  allowedMentions: allowedMentions | undefined;
  messageReference?: messageReference;
}
export interface UploadArguments {
  channelId: string;
  uploads: uploadFile[];
  draftType: number;
  parsedMessage: parsedMessage;
  options: options;
}
