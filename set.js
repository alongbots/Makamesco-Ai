const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0lPekZHc3pzSmdVOG4rR1g3dkk1VEZWVjZYQjQ5V0laeDFMZXcrU3UxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjQzUHZqdlovK3d1ZkppczRpbE9jKzdkRVY5Y2YyN2lzQWZ4MEoyNVNCRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNR213L1VKT2ttcjR6dk1iaWFiUDI3M2tRUXNTRi8yWmRDRUlsOEtXRmt3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJubXNvU3U1R0FSSHA0bWJUdmNKS05BaEJzTkxKSmQ5ZTYzVFBBQTlEQkE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVFZE94dnh3OTBELzJwaEQ3ck9XYnJMVVRBaGFBR2FGOTAxQnJHcDNtR2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjE1Y3FBR1VhaVF0dlFUdUwxWjZwNEsxamExQVpBUFlFc1VZYU1adFF2SE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1B1M1hrcUFpTlZyVDlvaHdtdWlBMU9KeUVkaUgxckdsci9lNnVzV21Faz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZyVThEWjBIVUcwS0JUVUM3ckhtK2FKTlpaWVplZWxqTVZhMlRSdW5WVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFlQno4MTZ0aUpVTVJwTnRhRENRY1ZEaGxNOFlIcFk4VHBOd1ZiTnFNNXRSWWRyV2hMbGJLUHR2VDRLU1JLa2pHV0hqR3V0ejg2MUdLSEVJMjdIZWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE5LCJhZHZTZWNyZXRLZXkiOiJOQjFYMm1sSzErelQ2YnQ0N0JQRXYwZk1jWG9jUlhtdkVNUnZadjdncFdJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxNzAwNTk3MjA4NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQzUyOTlBM0Q5M0M0RDM3REY1RTI4MTE1MzIzMjkwNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU4MjAwNDEzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTcwMDU5NzIwODVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUM0OTIzOEI0QUM4QTBEQzMzRTI5NUYxOTE0NzExM0EifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1ODIwMDQxOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE3MDA1OTcyMDg1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDNTA3NEFGNzAxM0ZEOEJGQUU0QURDRTVDQzhEODczIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTgyMDA0NDh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjFMVjEzRFlYIiwibWUiOnsiaWQiOiI5MTcwMDU5NzIwODU6MTJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMjEyNzcxMTc3NTU1Nzk6MTJAbGlkIiwibmFtZSI6IkdvZHpfYWt1bSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHFBMHZJQ0VNQ0VzTVlHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoielpOWmxXSWVQdXJtam5QUlNQWWtWaWVDVmx4b2NIMTM2M1dEaG1mNWFTdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNHQrejNaSzJqMWRmeFlWRFp6N3F5UDFZdkpOVlVML04waTJmU2dFem96OHQyNForVTk3Y3JMU1NoTEFITDRxaTN0ZytwcktOUXdvSkFZMCtodTMyQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImVRZnpxeW51YlgwR0pHa0pzLzM5QnN6Y2JmWmFhWFRES0lpY2FubTV4UHBQTmpGZklrREdBbzQ1Wjh3R3A4MXRkK1AwVDlvSHMrY3VuQ1FoSktiQmpnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE3MDA1OTcyMDg1OjEyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmMyVFdaVmlIajdxNW81ejBVajJKRlluZ2xaY2FIQjlkK3QxZzRabitXa3MifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1ODIwMDM5OSwibGFzdFByb3BIYXNoIjoiQzRmSk4iLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtKUyJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| '',
    OWNER_NAME : process.env.OWNER_NAME || "AKUM",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "917005972085",
    DEV : process.env.DEV || "Along",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/fxpj2p.jpg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/fxpj2p.jpg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "",
    WEBSITE :process.env.GURL || "",
    CAPTION : process.env.CAPTION || "ALONG",
    BOT : process.env.BOT_NAME || 'Along',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "NAGALAND", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'yes',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
