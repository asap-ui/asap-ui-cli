import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import url from 'url';


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const createFile = async (folderName) => {
  const absoluteFolderPath = path.resolve('src');
  const folderPath = path.join(absoluteFolderPath, folderName);
  if (fs.existsSync(folderPath)) {
    console.log('Folder already exists');
    return;
  }

  try{
    await fs.promises.mkdir(folderPath, { recursive: true });
    await fs.promises.mkdir(path.join(folderPath, 'demo'));

    // 生成组件名称
    const componentName = folderName.charAt(0).toUpperCase() + folderName.slice(1);

    // 渲染模板
    const templatePath = path.join(__dirname, 'template', 'demo.tsx.ejs');
    const demoContent = fs.readFileSync(templatePath, 'utf-8');
    const demo = ejs.render(demoContent, { componentName });
     // ejs文件路径
    const indexTemplatePath = path.join(__dirname, 'template', 'index.tsx.ejs');
    // 读取ejs文件内容
    const indexContent = fs.readFileSync(indexTemplatePath, 'utf-8');
    // 渲染模板
    const index = ejs.render(indexContent, { componentName });

    // 获取 index.md 的绝对路径
    const mdPath = path.join(__dirname, 'template', 'index.md');
    // 读取 index.md 文件的内容
    const mdContent = await fs.promises.readFile(mdPath, 'utf8');

    // 获取 props.ts 的绝对路径
    const propsPath = path.join(__dirname, 'template', 'props.ts');
    // 读取 props.ts 文件的内容
    const propsContent = await fs.promises.readFile(propsPath, 'utf8');

    await Promise.all([
      fs.promises.writeFile(path.join(folderPath, 'index.less'), ''),
      fs.promises.writeFile(path.join(folderPath, 'index.tsx'), index),
      fs.promises.writeFile(path.join(folderPath, 'index.md'), mdContent),
      fs.promises.writeFile(path.join(folderPath, 'props.ts'), propsContent),
      fs.promises.writeFile(path.join(folderPath, 'demo', 'index.tsx'), demo),
    ])

    console.log(`The folder ${folderName} has been created successfully.`);
  } catch (err) {
    console.error(err);
  }
}

export default createFile;