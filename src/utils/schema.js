const fs = require("fs");
const path = require("path");

const loadTypeSchema = type =>
  new Promise((resolve, reject) => {
    const pathToSchema = path.join(
      process.cwd(),
      `src/api/${type}/${type}.gql`
    );
    fs.readFile(pathToSchema, { encoding: "utf-8" }, (err, schema) => {
      if (err) reject(err);
      resolve(schema);
    });
  });

module.exports = loadTypeSchema;
