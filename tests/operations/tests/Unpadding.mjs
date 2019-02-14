/**
 * UnUnpadding tests
 *
 * @author dangfan [dangf09@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */
import TestRegister from "../TestRegister";

TestRegister.addTests([
    {
        name: "Unpad ANSI X9.23",
        input: "\x12\x34\x56\x78\x00\x00\x00\x04",
        expectedOutput: "\x12\x34\x56\x78",
        recipeConfig: [
            { "op": "Unpad",
                "args": ["ANSI X9.23"] }
        ]
    },
    {
        name: "Unpad PKCS#7",
        input: "\x12\x34\x56\x78\x04\x04\x04\x04",
        expectedOutput: "\x12\x34\x56\x78",
        recipeConfig: [
            { "op": "Unpad",
                "args": ["PKCS#7"] }
        ]
    },
    {
        name: "Unpad ISO/IEC 7816-4",
        input: "\x12\x34\x56\x78\x80\x00\x00\x00",
        expectedOutput: "\x12\x34\x56\x78",
        recipeConfig: [
            { "op": "Unpad",
                "args": ["ISO/IEC 7816-4"] }
        ]
    }
]);
