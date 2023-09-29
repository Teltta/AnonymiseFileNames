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
export interface UploadArguments {
  uploads: uploadFile[];
}
