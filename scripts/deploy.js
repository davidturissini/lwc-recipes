const glob = require('glob');
const babel = require('@babel/core');
const fs = require('fs-extra');
const path = require('path');
const child_process = require('child_process');

const dest = path.resolve('./dist');

function compileTypescript(componentPath) {
    const src = fs.readFileSync(componentPath).toString();
    const { code } = babel.transform(src, {
        filename: componentPath,
        plugins: [
            '@babel/plugin-syntax-class-properties',
            [
                '@babel/plugin-syntax-decorators',
                {
                    decoratorsBeforeExport: true
                }
            ]
        ],
        presets: ['@babel/preset-typescript']
    });
    return code;
}

function deployToSFDX(files) {
    console.log('deploying');
    // sfdx force:source:deploy --sourcepath /Users/dturissini/Development/build-apps-with-lwc/force-app/main/default/lwc/helloWebComponent/helloWebComponent.js --json --loglevel fatal
    child_process.exec(
        `sfdx force:source:deploy --sourcepath ${dest} --json --loglevel fatal`,
        err => {
            console.log('done', err);
        }
    );
}

glob('./force-app/**/*.*', (err, components) => {
    const files = components
        .map(componentPath => {
            const extname = path.extname(componentPath);
            const targetDir = path.join(dest, path.dirname(componentPath));
            fs.mkdirpSync(targetDir);

            if (extname !== '.ts') {
                const copyPath = path.format({
                    dir: targetDir,
                    name: path.basename(componentPath, extname),
                    ext: extname
                });

                fs.copyFileSync(componentPath, copyPath);
                return copyPath;
            }

            const code = compileTypescript(componentPath);
            const javascriptPath = path.format({
                dir: targetDir,
                name: path.basename(componentPath, '.ts'),
                ext: '.js'
            });
            fs.writeFileSync(javascriptPath, code);

            return javascriptPath;
        })
        .filter(fileName => {
            const ext = path.extname(fileName);
            return ['.js', '.html', '.css'].includes(ext);
        });

    deployToSFDX(files);
});
