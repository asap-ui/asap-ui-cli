import { globby } from "globby";
import pkg from 'typescript';

const { createProgram } = pkg;

// 扫描ts, tsx文件
const scanTsFile = async () => {
  const files = await globby(["**/*.ts", "**/*.tsx", "!node_modules"]);
  return Promise.all(files.map((file) => parseTsFile(file)));
}

// 解析ts文件
const parseTsFile = async (fileName) => {
  const program = createProgram([fileName], {});
  const sourceFile = program.getSourceFile(fileName);
  const checker = program.getTypeChecker();
  return { sourceFile, checker };
}
const codeAnalysis = async () => {
  const file = await scanTsFile();
  console.log(file)
}

export default codeAnalysis;
