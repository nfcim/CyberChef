/**
 * @author dangfan [dangf09@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
import forge from "node-forge/dist/forge.min.js";

/**
 * RSA Encrypt operation
 */
class RSAEncrypt extends Operation {

    /**
     * RSAEncrypt constructor
     */
    constructor() {
        super();

        this.name = "RSA Encrypt";
        this.module = "Crypto";
        this.description = "Encrypt data using the public key.";
        this.infoURL = "https://en.wikipedia.org/wiki/RSA_(cryptosystem)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Public Key (PEM)",
                type: "text",
                value: ""
            },
            {
                name: "Scheme",
                type: "option",
                value: ["RSAES-PKCS1-V1_5", "RSA-OAEP", "RAW"],
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
        const [key, scheme] = args;
        const publicKey = forge.pki.publicKeyFromPem(key);
        return publicKey.encrypt(input, scheme);
    }

}

export default RSAEncrypt;
