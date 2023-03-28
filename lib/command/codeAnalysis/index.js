import { globby } from "globby";

// 扫描ts, tsx文件
const scanTsFile = async () => {
  const files = await globby(["**/*.ts", "**/*.tsx", !"node_modules"]);
  console.log(files);
}
const codeAnalysis = async () => {
  await scanTsFile();
}

export default codeAnalysis;
