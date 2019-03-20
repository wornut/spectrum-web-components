#!/usr/bin/env node

/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const path = require('path');
const fs = require('fs-extra');

const processIcon = (srcPath, fd, scaleWidth, scaleHeight) => {
    // get icon name from filename
    const iconName = path.basename(srcPath, path.extname(srcPath));
    // regex will extract width, height and svg content into $1, $2 and $3 respectively
    const regex = new RegExp(
        /<svg.*width="([0-9]+)".*height="([0-9]+)">(.*?)<\/svg>/i
    );

    const content = fs.readFileSync(srcPath, 'utf8');

    const match = content.match(regex);
    if (!match) {
        // no matching result, bail
        return;
    }
    const svgWidth = parseInt(match[1], 10);
    const svgHeight = parseInt(match[2], 10);
    const svgContent = match[3];
    // calculate viewbox offsets to be centered within the target icon size at this scale
    const viewBoxMinX = -(scaleWidth - svgWidth) / 2;
    const viewBoxMinY = -(scaleHeight - svgHeight) / 2;
    const viewBoxWidth = scaleWidth;
    const viewBoxHeight = scaleHeight;
    // append the content to the target file handle
    fs.writeSync(
        fd,
        `<symbol id="spectrum-icon-${iconName}" viewBox="${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}">${svgContent}</symbol>`
    );
};

// load our license file
const license = fs.readFileSync(
    path.join(__dirname, '..', 'config', 'license.js')
);

// where is spectrum-css?
// TODO: use resolve package to find node_modules
const spectrumIconsPath = path.resolve(
    path.join(
        __dirname,
        '..',
        'node_modules',
        '@adobe',
        'spectrum-css',
        'icons'
    )
);

// define the target icon sizes for each scale
const scales = {
    medium: { width: 18, height: 18 },
    large: { width: 24, height: 24 },
};

// process the scales
Object.keys(scales).forEach((scaleKey) => {
    console.log(`processing scale ${scaleKey}...`);

    const scale = scales[scaleKey];
    const srcPath = path.join(spectrumIconsPath, scaleKey);
    const outputPath = path.join(
        __dirname,
        '..',
        'src',
        'icons',
        `icons-${scaleKey}.svg.ts`
    );
    let outputFd = fs.openSync(outputPath, 'w');

    fs.writeSync(outputFd, license);
    fs.writeSync(
        outputFd,
        'import { svg } from \'lit-element\'; export default svg`<svg xmlns="http://www.w3.org/2000/svg">'
    );

    fs.readdirSync(srcPath).forEach((iconFile) => {
        const srcIconPath = path.join(srcPath, iconFile);
        console.log(`\ticon ${iconFile}`);
        processIcon(srcIconPath, outputFd, scale.width, scale.height);
    });

    fs.writeSync(outputFd, '</svg>`;');
    fs.close(outputFd);
});

console.log('complete.');