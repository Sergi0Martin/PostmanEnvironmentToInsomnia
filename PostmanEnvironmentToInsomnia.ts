import * as commander from 'commander';
import * as fs from 'fs';
import { postmanFormat } from './postmanFormat';

const program = new commander.Command();
program.version('1.0.0');

program
    .name("convert")
    .description('File to convert')
    .command('convert')
    .argument('[input-file]', 'File to convert', 'conversionFiles/postman_environment.json')
    .argument('[output-file]', undefined, 'conversionFiles/insomnia_environment.json')
    .action((inputFile, outputFile) => {
        parseFile(inputFile, outputFile);
        console.log("Your file is ready: \n" + outputFile);
    });

program.parse();

function parseFile(inputFile: string, outputFile: string) {
    const jsonData = fs.readFileSync(inputFile, 'utf-8');
    try {
        const originalData: postmanFormat = JSON.parse(jsonData);
        const dynamicObject: any = {};

        originalData.values.forEach((item) => {
            dynamicObject[item.key] = item.value;
        });

        const outputJsonData = JSON.stringify(dynamicObject, null, 2);
        fs.writeFileSync(outputFile, outputJsonData, 'utf-8');

    } catch (error) {
        console.error('JSON file conversion error:', error);
    }
}

