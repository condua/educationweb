import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the folder containing individual grammar JSON files
const SOURCE_FOLDER = path.join(__dirname, "public", "grammar");

// Path for the final merged output file
const OUTPUT_FILE = path.join(__dirname, "public", "grammar.json");

try {
  // 1. Read all files from the source folder
  const files = fs.readdirSync(SOURCE_FOLDER);

  // 2. Filter for .json files and read/parse them
  const allTopics = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(SOURCE_FOLDER, file);
      try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileContent);
      } catch (error) {
        console.error(`❌ Error parsing JSON from file: ${file}`, error);
        return null; // Return null if a file is invalid
      }
    })
    .filter(Boolean); // Filter out any null entries from failed parsing

  // 3. Write the combined array to the output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allTopics, null, 2), "utf8");

  console.log(
    `✅ Successfully merged ${allTopics.length} files into ${path.basename(
      OUTPUT_FILE
    )}`
  );
} catch (error) {
  console.error("❌ An error occurred during the merge process:", error);
}
