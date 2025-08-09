import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "public", "vocabulary");
const outputFile = path.join(__dirname, "public", "vocabulary.json");

const files = fs
  .readdirSync(folderPath)
  .filter((file) => file.endsWith(".json"));

let topics = [];

files.forEach((file) => {
  const filePath = path.join(folderPath, file);
  const content = fs.readFileSync(filePath, "utf8");
  try {
    const jsonData = JSON.parse(content);
    topics.push(jsonData);
  } catch (err) {
    console.error(`❌ Lỗi đọc file ${file}:`, err.message);
  }
});

fs.writeFileSync(outputFile, JSON.stringify({ topics }, null, 2), "utf8");
console.log(`✅ Đã merge ${files.length} file vào vocabulary.json`);
