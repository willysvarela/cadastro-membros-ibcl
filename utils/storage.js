import { StorageClient } from '@supabase/storage-js';

const { STORAGE_URL } = process.env;
const { SERVICE_KEY } = process.env;
const { BUCKET_NAME } = process.env;

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`
});

const saveOnStorage = async (fileData, fileBody) => {
  const timestamp = new Date().getTime();
  const splitted = fileData.originalFilename.split('.');
  const extension = splitted[splitted.length - 1];
  const fileName = `${timestamp}.${extension}`;

  const { data, error } = await storageClient
    .from(BUCKET_NAME)
    .upload(fileName, fileBody, {
      cacheControl: 3600,
      contentType: fileData.mimetype,
      upsert: true
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
