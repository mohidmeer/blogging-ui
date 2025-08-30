const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const env = process.argv[2] || "default";
const zipName = `auto-blog-poster.zip`;


const projectRoot = path.resolve(__dirname, '..');
const output = fs.createWriteStream(path.join(projectRoot, zipName));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ Zipped ${archive.pointer()} bytes to ${zipName}`);
});

archive.on('error', err => { throw err; });

archive.pipe(output);

archive.directory(path.join(projectRoot, 'dist'), 'dist');
archive.file(path.join(projectRoot, 'auto-blog-poster.php'), { name: 'auto-blog-poster.php' });
archive.file(path.join(projectRoot, 'readme.txt'), { name: 'readme.txt' });

archive.finalize();