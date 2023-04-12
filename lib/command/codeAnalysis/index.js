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

// 分析import导入
const analysisImport = (sourceFile, checker) => {
  const imports = sourceFile.statements.filter((item) => item.kind === 269);
  console.log(imports, 222)
  return imports.map((item) => {
    const { moduleSpecifier } = item;
    const { text } = moduleSpecifier;
    console.log(text, 444)
    // const symbol = checker.getSymbolAtLocation(moduleSpecifier);
    // console.log(symbol, 333)
    // const { declarations } = symbol;
    // const { fileName } = declarations[0].getSourceFile();
    return { text };
  });
}

// 代码分析
const codeAnalysis = async () => {
  const file = await scanTsFile();
  const analysis = file.map((item) => {
    const { sourceFile, checker } = item;
    const imports = analysisImport(sourceFile, checker);
    return { imports };
  });
  console.log(analysis, 111);
}

export default codeAnalysis;
