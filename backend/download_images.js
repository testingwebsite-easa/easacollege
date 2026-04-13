const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(__dirname, 'public', 'images', filename);
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the file async. (But we don't check for this error so whatever)
            console.error(`Error downloading ${filename}: ${err.message}`);
            reject(err);
        });
    });
};

const images = [
    { url: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop", name: "news-ai-conf.jpg" },
    { url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop", name: "news-cult-fest.jpg" },
    { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop", name: "news-hackathon.jpg" },
    { url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop", name: "news-guest-lecture.jpg" },
    { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop", name: "news-robotics.jpg" },
    { url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop", name: "hero-shape-future.jpg" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQxWuc9cVw8xPCbfplGe1lzFLOxNrS6Y6iQ&s", name: "hero-world-class.jpg" }, // This might be a tricky URL, usually encrypted-tbn0
    { url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1920&auto=format&fit=crop", name: "hero-innovation.jpg" },
    { url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop", name: "gallery-campus.jpg" },
    { url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1000&auto=format&fit=crop", name: "gallery-sports.jpg" },
    { url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000&auto=format&fit=crop", name: "gallery-labs.jpg" },
    // Reuse guest lecture image for library as per original data or find new one? Original used same url.
    { url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop", name: "gallery-library.jpg" },
    { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop", name: "mgmt-chairman.jpg" },
    { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop", name: "mgmt-secretary.jpg" },
    { url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop", name: "mgmt-principal.jpg" },
    // Placement logos
    { url: "https://i.pinimg.com/736x/8e/eb/fb/8eebfbb6c7bbc81b9298854da7064486.jpg", name: "logo-google.jpg" },
    { url: "https://i.pinimg.com/1200x/59/30/80/593080bd01278d5346f217fdd5fc4356.jpg", name: "logo-microsoft.jpg" },
    { url: "https://i.pinimg.com/736x/89/6c/5b/896c5bae8a9ef75618c6f6969a4248cd.jpg", name: "logo-amazon.jpg" },
    { url: "https://i.pinimg.com/1200x/3d/66/f4/3d66f4a2db7152d475421484f274baee.jpg", name: "logo-tcs.jpg" },
    { url: "https://i.pinimg.com/1200x/89/0c/25/890c250fe129488a586b1a99e8b68107.jpg", name: "logo-infosys.jpg" },
    { url: "https://i.pinimg.com/736x/16/f8/7a/16f87a2a909a06634e61d63d57e79bb0.jpg", name: "logo-wipro.jpg" },
    { url: "https://i.pinimg.com/1200x/1f/a2/46/1fa246a7fb1e2072df8b8bf0f8b30d26.jpg", name: "logo-ibm.jpg" },
    { url: "https://i.pinimg.com/736x/27/7a/0d/277a0d995f6cbabf50bbb3a2a407e5e5.jpg", name: "logo-accenture.jpg" },
    { url: "https://i.pinimg.com/736x/c9/61/ec/c961ecca1206926f6991d22222dd7516.jpg", name: "logo-hcl.jpg" },
    { url: "https://i.pinimg.com/1200x/7c/b5/df/7cb5dfa2786c33a3411f252313aeefb3.jpg", name: "logo-capgemini.jpg" },

    // Life At EASA
    { url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSHnZFdut5cx18JS2NiXARRmy-Zoc-5BcGGnZA6AqaGOGL-iety", name: "life-at-EASA.jpg" },

    // Programs
    { url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "program-cs.jpg" },
    { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "program-mech.jpg" },
    { url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "program-ece.jpg" },
];

const downloadAll = async () => {
    for (const img of images) {
        try {
            await downloadImage(img.url, img.name);
        } catch (e) {
            console.error(`Failed to download ${img.name}`);
        }
    }
};

downloadAll();
