import fileManeger  from "./fileManeger.js";
import readlineSync  from "readline-sync";
import path  from "path";
import { fileURLToPath } from "url";

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const baseDir = path.join(__dirname, "my_files");
  fileManeger.createDirectory(baseDir);
  while (true) {
    console.log("=== Menu ===");
    console.log("1. Criar arquivo");
    console.log("2. Listar arquivo");
    console.log("3. Ler arquivo");
    console.log("4. Escrever arquivo");
    console.log("5. Deletar Arquivo");
    console.log("6. Sair");
    const choice = readlineSync.question("Escolha uma opção: ");

    try {
      switch (choice) {
        case "1":
          const fileName = readlineSync.question("Digite o nome do arquivo: ");
          const fileContent = readlineSync.question(
            "Digite o conteúdo do arquivo (ou deixe em branco): "
          );

          const filePath = path.join(baseDir, fileName);

          const files = await fileManeger.createFile(filePath, fileContent);
          console.log("Arquivos no diretorio:", files);

          break;
        case "2":
          const fileMessage = await fileManeger.listFile(baseDir);
          console.log(fileMessage);
          console.log("Lendo arquivo");
          break;
        case "3":
          const readFileName = readlineSync.question(
            "Digite o nome e extensão do arquivo: "
          );
          const readFilePath = path.join(baseDir, readFileName);
          const content = await fileManeger.readFile(readFilePath);
          console.log("Conteudo do arquivo", content);
          break;
        case "4":
          const writeFileName = readlineSync.question(
            "Digite o nome e extensão do arquivo: "
          );
          const newContent = readlineSync.question(
            "Digite o conteudo a ser escrito: "
          );
          const messagewriteFile =await fileManeger.writeFile(writeFileName, newContent);
          console.log(messagewriteFile);
          break;
        case "5":
          const deleteFileName = readlineSync.question(
            "Digite o nome e extensão do arquivo: "
          );
          const deleteFilePath = path.join(baseDir, deleteFileName);
          const messageDeleteFile = await fileManeger.deleteFile(deleteFilePath);
          console.log(messageDeleteFile);
          break;
        case "6":
          console.log("Saindo...");
          return;
        default:
          console.log("Opção inválida");
      }
    } catch (err) {
      console.log("Erro:", err.message);
    }
  }
}
main();
