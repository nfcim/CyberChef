/**
 * @author dangfan [dangf09@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
import forge from "node-forge/dist/forge.min.js";

/**
 * RSA Sign operation
 */
class RSASign extends Operation {

    /**
     * RSASign constructor
     */
    constructor() {
        super();

        this.name = "RSA Sign";
        this.module = "Crypto";
        this.description = "";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Private Key (PEM)",
                type: "text",
                value: ""
            },
            {
                name: "Digest",
                type: "option",
                value: ["MD5", "SHA1", "SHA256", "SHA384", "SHA512"],
                defaultIndex: 0
            },
            {
                name: "Scheme",
                type: "option",
                value: ["RSASSA-PKCS1-V1_5", "RSASSA-PSS"],
                defaultIndex: 0
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [key, digest, scheme] = args;
        const privateKey = forge.pki.privateKeyFromPem(key);
        let mdAlgo;
        switch (digest) {
            case "MD5":
                mdAlgo = forge.md.md5;
                break;
            case "SHA1":
                mdAlgo = forge.md.sha1;
                break;
            case "SHA256":
                mdAlgo = forge.md.sha256;
                break;
            case "SHA384":
                mdAlgo = forge.md.sha384;
                break;
            case "SHA512":
                mdAlgo = forge.md.sha512;
                break;
        }
        if (scheme === "RSASSA-PKCS1-V1_5") {
            const md = mdAlgo.create();
            md.update(input, "utf8");
            return privateKey.sign(md);
        } else {
            const md = mdAlgo.create();
            md.update(input, "utf8");
            const pss = forge.pss.create({
                md: mdAlgo.create(),
                mgf: forge.mgf.mgf1.create(mdAlgo.create()),
                saltLength: 20
            });
            return privateKey.sign(md, pss);
        }
    }

}

export default RSASign;
