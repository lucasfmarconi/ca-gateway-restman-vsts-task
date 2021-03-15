import axios from 'axios';
import { Console } from 'node:console';
import Promise from 'Promise';

export default class HttpClient {

    private _config: object;
    private _hostBasePathUrl: string;
    private _contentType: string;
    
    /**
     *
     */
    constructor(hostBasePathUrl: string, username: string = "", password: string = "") {
        this._hostBasePathUrl = hostBasePathUrl;
        this._contentType = "text/xml"
        let withCredentials: boolean = (username != "" && password != "");
        this._config = {
            withCredentials: withCredentials,
            auth: {
                username: username,
                password: password
            },
            timeout: 30000,
            headers: {"Content-Type": this._contentType }
        };
    }

    put(apiBasePath: string, data: string) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

        return new Promise((resolve, reject) => {
            let url = new URL(apiBasePath, this._hostBasePathUrl);

            axios.put(url.href, data, this._config)
                .then((response) => {
                    console.log(`HTTP CALL STATUS ${response.status} - ${response.statusText}`);
                    resolve(response.data as string);
                }).catch((err) => {
                    console.log(`HTTP CALL ERROR ${err.message}`);
                    reject(err);
                });
        });
    }
}
