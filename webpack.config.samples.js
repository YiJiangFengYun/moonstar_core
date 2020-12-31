const path = require("path")
const fsExtra = require("fs-extra");

module.exports = env => {
    const pathRoot = path.join(__dirname, "samples");
    const pathBuild = path.join(pathRoot, "build");
    return Promise.resolve()
    .then(() => {
        //Remove build directory
        return fsExtra.emptyDir(pathBuild);
    })
    .then(() => {
        //copy html to build
        return fsExtra.copyFile(path.join(pathRoot, "index.html"), path.join(pathBuild, "index.html"));
    })
    .then(() => {
        return fsExtra.copy(path.join(pathRoot, "res"), path.join(pathBuild, "res"));
    })
    .then(() => {
        return {
            entry: path.join(pathRoot, "src/index.ts"),
            output: {
                filename: "index.js",
                path: pathBuild
            },
            target: "web",
            // Enable sourcemaps for debugging webpack"s output.
            devtool: env.development ? "source-map" : false,
        
            resolve: {
                // Add ".ts" and ".tsx" as resolvable extensions.
                extensions: [".ts", ".tsx", ".js"]
            },
        
            module: {
                rules: [
                    // All files with a ".ts" or ".tsx" extension will be handled.
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.samples.json",
                        }
                        // exclude: /node_modules/,
                    },
                ]
            },
            // When importing a module whose path matches one of the following, just
            // assume a corresponding global variable exists and use that instead.
            // This is important because it allows us to avoid bundling all of our
            // dependencies, which allows browsers to cache those libraries between builds.
            externals: {
            },
            mode: env.development ? "development" : "production",
        };
    })
}