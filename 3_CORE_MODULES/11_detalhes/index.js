const fs = require('fs');

fs.stat('arquivo.txt', (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stats.isDirectory());
    console.log(stats.isFile());
    console.log(stats.isSymbolicLink());
    console.log(stats.ctime);
    console.log(stats.size);

})