import nc from "next-connect";
import formidable from "formidable";
import { getPublicUrl, saveOnStorage } from "../../utils/storage";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc().post((req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    console.log({ files });
    const rawData = fs.readFileSync(files.image.filepath);
    const result = await saveOnStorage(files.image, rawData);
    const publicUrl = getPublicUrl(result.path);
    res.status(200).json(publicUrl);
  });
});

export default handler;
