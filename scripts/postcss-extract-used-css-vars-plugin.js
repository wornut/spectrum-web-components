/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const postcss = require('postcss');
const valueParser = require('postcss-value-parser');
const fs = require('fs');

module.exports = postcss.plugin('postcss-extract-used-css-vars', () => {
    return (root, result) => {
        const filename = root.source.input.file + '.json';
        const variables = {};
        root.walkDecls((decl) => {
            const parsed = valueParser(decl.value);
            parsed.walk((node) => {
                // only process var entries
                if (node.type !== 'function' && node.value !== 'var') return;
                const firstParam = node.nodes[0];
                if (firstParam.type !== 'word') {
                    return;
                }
                const secondParam = node.nodes[2];
                variables[firstParam.value] = secondParam
                    ? valueParser.stringify(secondParam)
                    : '';
                return false; // don't traverse any further, we found our variable
            });
        });
        fs.writeFileSync(filename, JSON.stringify(variables));
    };
});
