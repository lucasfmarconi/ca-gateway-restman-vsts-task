import tl = require('azure-pipelines-task-lib/task');
import * as task from './src/index';

async function run() {
    try {
        const gatewayDestinationBaseUrl: string
            = verificarPreenchimentoCampoObrigatorio(tl.getInput('gatewayDestinationUrlBase', true));
        const gatewayRestmanDestinationUsername: string
            = verificarPreenchimentoCampoObrigatorio(tl.getInput('gatewayRestmanDestinationUsername', true));
        const gatewayRestmanDestinationPassword: string
            = verificarPreenchimentoCampoObrigatorio(tl.getInput('gatewayRestmanDestinationPassword', true));
        const filePath: string = verificarPreenchimentoCampoObrigatorio(tl.getInput('filePath', true));
        const xmlFileName: string = verificarPreenchimentoCampoObrigatorio(tl.getInput('xmlFileName', true));

        console.log('gatewayDestinationBaseUrl', gatewayDestinationBaseUrl);
        console.log('gatewayRestmanDestinationUsername', gatewayRestmanDestinationUsername);
        console.log('gatewayRestmanDestinationPassword', gatewayRestmanDestinationPassword);
        console.log('filePath', filePath);
        console.log('xmlFileName', xmlFileName);

        let taskExec = new task.default();

        let testResponse = taskExec.invokeBundleInstall('true', filePath, xmlFileName,
            gatewayDestinationBaseUrl, gatewayRestmanDestinationUsername, gatewayRestmanDestinationPassword);

        testResponse.then(() => {
            console.log('------- Executando BUNDLE INSTALL -------');

            // ARGUMENT IGUAL TO FALSE TO NEGATIVE TEST PARAMETER ON RESTMAN SERVICE
            let installResponse = taskExec.invokeBundleInstall('false', filePath, xmlFileName,
                gatewayDestinationBaseUrl, gatewayRestmanDestinationUsername, gatewayRestmanDestinationPassword);

            installResponse.then(() => {
                console.log('------- BUNDLE INSTALL SUCESS -------');
                console.log('------- BUNDLE RESTMAN MIGRATION OK -------');
            }).catch((err) => {
                tl.setResult(tl.TaskResult.Failed, err.message);
            });


        }).catch((err) => {
            tl.setResult(tl.TaskResult.Failed, err.message);
        });
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();

function verificarPreenchimentoCampoObrigatorio(inputString: string | undefined): string {
    if (inputString == 'bad' || inputString === undefined) {
        tl.setResult(tl.TaskResult.Failed, 'Campo obrigatório não informado. Informe todos os campos marcados como "Required"');
        return '';
    }
    return inputString.toString();
}