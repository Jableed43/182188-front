const fs = require('fs');
const https = require('https');

async function fetchPage(page) {
    return new Promise((resolve, reject) => {
        https.get(`https://rickandmortyapi.com/api/character?page=${page}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', err => reject(err));
    });
}

async function main() {
    try {
        let allCharacters = [];
        for (let i = 1; i <= 5; i++) {
            console.log(`Descargando página ${i}...`);
            const data = await fetchPage(i);
            allCharacters = allCharacters.concat(data.results);
        }
        
        const dbPath = 'db.json';
        let db = {};
        if (fs.existsSync(dbPath)) {
            db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
        
        // Agregamos o actualizamos el endpoint de characters
        db.characters = allCharacters;
        
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        console.log('Se guardaron ' + allCharacters.length + ' personajes exitosamente en db.json');
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
