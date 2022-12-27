import { SupabaseStorageClient } from "@supabase/storage-js";

const STORAGE_URL = process.env.STORAGE_URL;
const SERVICE_KEY = process.env.SERVICE_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

const storageClient = new SupabaseStorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const uploadFile = async (fileBody) => {
  const { data, error } = await storageClient
    .from(BUCKET_NAME)
    .upload("", fileBody);
  if (error) {
    return error;
  }
  return data;
};

export { storageClient, uploadFile };
