// Migration script to fix old image paths in database
// Run this once to update all existing records

const mongoose = require('mongoose');
const path = require('path');

const DB_PATH = "mongodb+srv://kkp1882006_db_user:MongoDBPass123@airnb.qsqzoam.mongodb.net/airnb?appName=airnb";

// Home model schema
const homeSchema = new mongoose.Schema({
    homename: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    photo: String,
    rulesFile: String,
    description: String
});

const Home = mongoose.model('Home', homeSchema);

// Helper function to convert absolute path to web-friendly path
const normalizePathForWeb = (filePath) => {
    if (!filePath) return null;

    // If it's already a web path (starts with /), return as is
    if (filePath.startsWith('/')) return filePath;

    // Convert Windows backslashes to forward slashes
    filePath = filePath.replace(/\\/g, '/');

    // Extract the relative path starting from Data/
    if (filePath.includes('/Data/homeImages/')) {
        const filename = path.basename(filePath);
        return `/Data/homeImages/${filename}`;
    }
    if (filePath.includes('/Data/homeRules/')) {
        const filename = path.basename(filePath);
        return `/Data/homeRules/${filename}`;
    }

    // If it contains Data/homeImages or Data/homeRules, extract it
    const dataMatch = filePath.match(/Data\/(homeImages|homeRules)\/(.+)$/);
    if (dataMatch) {
        return `/${dataMatch[0]}`;
    }

    // Default: return as is
    return filePath;
};

async function migratePaths() {
    try {
        await mongoose.connect(DB_PATH);
        console.log('Connected to MongoDB');

        const homes = await Home.find();
        console.log(`Found ${homes.length} homes to process`);

        let updated = 0;
        for (const home of homes) {
            let needsUpdate = false;

            // Normalize photo path
            if (home.photo) {
                const newPhotoPath = normalizePathForWeb(home.photo);
                if (newPhotoPath !== home.photo) {
                    console.log(`\nUpdating photo path for "${home.homename}":`);
                    console.log(`  Old: ${home.photo}`);
                    console.log(`  New: ${newPhotoPath}`);
                    home.photo = newPhotoPath;
                    needsUpdate = true;
                }
            }

            // Normalize rulesFile path
            if (home.rulesFile) {
                const newRulesPath = normalizePathForWeb(home.rulesFile);
                if (newRulesPath !== home.rulesFile) {
                    console.log(`\nUpdating rules path for "${home.homename}":`);
                    console.log(`  Old: ${home.rulesFile}`);
                    console.log(`  New: ${newRulesPath}`);
                    home.rulesFile = newRulesPath;
                    needsUpdate = true;
                }
            }

            if (needsUpdate) {
                await home.save();
                updated++;
            }
        }

        console.log(`\n✅ Migration complete! Updated ${updated} of ${homes.length} records.`);

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run migration
migratePaths();
