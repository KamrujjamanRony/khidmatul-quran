const fs = {
    readFileSync: () => "",
    writeFileSync: () => ""
};

global.fs = fs;
global.require = (module) => {
    if (module === "fs") return fs;
    throw new Error(`Module not found: ${module}`);
};
