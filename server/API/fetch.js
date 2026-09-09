const fs = require('fs');
const https = require('https');
const path = require('path');

async function fetchPage(page) {
    return new Promise((resolve, reject) => {
        https.get(`https://rickandmortyapi.com/api/character?page=${page}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', err => reject(err));
    });
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                   .on('error', reject)
                   .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Fallo al descargar ${url} (Status: ${res.statusCode})`));
            }
        }).on('error', reject);
    });
}

async function main() {
    try {
        // Asegurar que exista la carpeta public/images para servir los estáticos con json-server
        const imagesDir = path.join(__dirname, 'public', 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        let allCharacters = [];
        const delay = ms => new Promise(res => setTimeout(res, ms));

        for (let i = 1; i <= 5; i++) {
            console.log(`Descargando página ${i}...`);
            const data = await fetchPage(i);
            
            for (let character of data.results) {
                const imageName = `${character.id}.jpeg`;
                const imagePath = path.join(imagesDir, imageName);
                
                console.log(`  Descargando imagen de ${character.name}...`);
                
                let success = false;
                let retries = 3;
                while (!success && retries > 0) {
                    try {
                        await downloadImage(character.image, imagePath);
                        success = true;
                    } catch (e) {
                        retries--;
                        console.log(`    Fallo, reintentando... quedan ${retries} intentos. Esperando 2 segundos...`);
                        await delay(2000);
                    }
                }
                
                await delay(300); // 300ms delay base
                
                // Actualizar la URL de la imagen al servidor local
                character.image = `http://localhost:3000/images/${imageName}`;
                
                allCharacters.push(character);
            }
        }
        
        const dbPath = path.join(__dirname, 'db.json');
        let db = {};
        if (fs.existsSync(dbPath)) {
            db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
        
        // Agregamos o actualizamos el endpoint de characters
        db.characters = allCharacters;
        
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        console.log(`Se guardaron ${allCharacters.length} personajes y sus imágenes exitosamente en db.json`);
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
