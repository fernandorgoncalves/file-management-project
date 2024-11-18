import fileManeger from "./fileManeger.js";
import readlineSync from 'readline-sync';
import path from "path"
import url, { fileURLToPath } from "url"

async function main() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const baseDir = path.join(__dirname, "my_files")
    fileManeger.createDirectory(baseDir)

    while (true) {
        console.log('\nMenu:');
        console.log('1. Criar arquivo');
        console.log('2. Listar arquivos');
        console.log('3. Ler arquivo');
        console.log('4. Escrever no arquivo');
        console.log('5. Deletar arquivo');
        console.log('6. Sair');

        const choice = readlineSync.question('Escolha uma opção: ');

        try{
            switch(choice) {
                case "1":
                    const fileName = readlineSync.question("Digite o nome do arquivo ");
                    const fileContent = readlineSync.question("Digite o conteudo do arquivo (ou deixe em branco)");
                    const createFilePath = path.join(baseDir, fileName)
                    const fileMessage = await fileManeger.createFile(createFilePath, fileContent)
                    console.log(fileMessage)
                    break;
                    
                case "2":
                    const files = await fileManeger.listFiles(baseDir)
                    console.log("Arquivos no diretório", files)
                    break;        
                case "3":
                    const readFIleName = readlineSync.question("Digite o nome e a extensão do arquivo")
                    const readFilePah =path.join(baseDir, readFIleName);
                    const content = await fileManeger.readFile(readFilePah)
                    console.log("Conteudo do arquivo ", content)
                    break;
                case "4":
                    const writeFileName = readlineSync.question("Digite o nome do arquivo: ");
                    const writeFilePath = path.join(baseDir, writeFileName);
                    const NewContent = readlineSync.question("Digite o conteudo a ser escrito: ")
                    const message = await fileManeger.writeFile(writeFilePath, NewContent)
                    console.log(message)
                    break;
                case "5":
                    const deleteFileName = readlineSync.question("Digite o nome do arquivo a ser deletado: ")
                    const deleteFilePath = path.join(baseDir, deleteFileName);
                    const messageDelete = await fileManeger.deleteFile(deleteFilePath);
                    console.log(messageDelete)
                    break;
                case "6":
                    console.log("Saindo")
                    return;
                default:
                    console.log("Opção inválida Tente novamente.");
            }  
        }catch(err) {
            console.log(err)
        }

     
    }

}

main();
