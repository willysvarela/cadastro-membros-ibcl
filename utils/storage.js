import { StorageClient } from "@supabase/storage-js";

const STORAGE_URL = process.env.STORAGE_URL;
const SERVICE_KEY = process.env.SERVICE_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const saveOnStorage = async (fileData, fileBody) => {
  const { data, error } = await storageClient
    .from(BUCKET_NAME)
    .upload(fileData.originalFilename, fileBody, {
      cacheControl: 3600,
      contentType: fileData.mimetype,
      upsert: true,
    });
  if (error) {
    return error;
  }
  return data;
};

const getPublicUrl = (filePath) => {
  const { data } = storageClient.from(BUCKET_NAME).getPublicUrl(filePath);
  return data?.publicUrl;
};

export { storageClient, saveOnStorage, getPublicUrl };
