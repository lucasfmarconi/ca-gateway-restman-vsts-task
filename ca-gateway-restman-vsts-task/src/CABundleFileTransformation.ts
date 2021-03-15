import FileUtils from "./FileUtils";

export default class CABundleFileTransformation {

    private regexLines: RegExp;
    private regexBundleXmlSearchTag: RegExp;
    private regexBundleFinalXmlSearchTag: RegExp;
    private bundleXmlTagReplace: string;
    private bundleFinalXmlTagReplace: string;
    private _dir: string;

    /**
     *
     */
    constructor(dir: string) {
        this.regexLines = /\n/g;
        this.regexBundleXmlSearchTag = /<l7:Item([\s\S]*?)<l7:Bundle>/;
        this.regexBundleFinalXmlSearchTag = /<\/l7:Bundle>([\s\S]*?)<\/l7:Resource>([\s\S]*?)<\/l7:Item>/;

        this.bundleXmlTagReplace = "<l7:Bundle xmlns:l7=\"http://ns.l7tech.com/2010/04/gateway-management\">";
        this.bundleFinalXmlTagReplace = "</l7:Bundle>";

        this._dir = dir;
    }

    transform(fileName: string) {
        let fileUtils = new FileUtils(this._dir);
        let fileContent: string = fileUtils.read(fileName);

        fileContent = this.replaceXmlTags(fileContent);

        return fileContent;
    }

    private replaceXmlTags(fileContent : string) {
        fileContent = fileContent.replace(this.regexLines, "");
        fileContent = fileContent.replace(this.regexBundleXmlSearchTag, this.bundleXmlTagReplace);
        fileContent = fileContent.replace(this.regexBundleFinalXmlSearchTag, this.bundleFinalXmlTagReplace);
        return fileContent;
    }

}