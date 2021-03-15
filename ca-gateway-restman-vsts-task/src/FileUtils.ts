import * as fs from 'fs';
import path from 'path';

export default class FileUtils {
    private _dir: string;
    constructor(dir: string) {
        this._dir = dir;
    }

    read(fileName: string) {
        let filePath: string = path.join(this._dir, fileName);
        let content: string = "";
        
        content = fs.readFileSync(filePath).toString();

        return content;
    }

    write(fileName: string, content: string){
        let filePath: string = path.join(this._dir, fileName);
        fs.writeFileSync(filePath, content);
    }
}