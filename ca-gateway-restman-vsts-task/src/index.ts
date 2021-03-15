import CABundleFileTransformation from './CABundleFileTransformation';
import HttpClient from './Axios/HttpClient';
import { reject, resolve } from 'q';


export default class Index {
    /**
     *
     */
    constructor() {
    }

    invokeBundleInstall(bundleTest: string, filePath: string, fileName: string, gatewayDestinationBaseUrl: string
        , usernameRestman: string, passwordRestman: string) {

        let transformedXml = new CABundleFileTransformation(filePath).transform(fileName);

        return new Promise((resolve, reject) => {
            new HttpClient(gatewayDestinationBaseUrl, usernameRestman, passwordRestman)
                .put(`/restman/1.0/bundle?test=${bundleTest}&versionComment=1.3`, transformedXml)
                .then(returnData => {
                    console.log('HTTP SUCCESS');
                    resolve(returnData);
                }).catch((err) => {
                    console.log('HTTP FAIL');
                    reject(err);
                });
        });
    }
}