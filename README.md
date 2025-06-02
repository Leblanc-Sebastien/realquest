1️⃣ Prérequis
Avant de commencer, assure-toi d’avoir les outils suivants installés sur ta machine : - Node.js (v18 ou supérieur) - Git

2️⃣ Installer les dépendances

    - npm install

3️⃣ Configurer les variables d’environnement
Copie le fichier .env.example en .env et configure les variables si nécessaire :

    - cp .env.example .env

4️⃣ Préparer la base de données
Générer et appliquer les migrations Prisma + créer la base de données :

    - npx prisma migrate reset --skip-seed

5️⃣ Lancer le projet en local

    - npm run dev

    Le projet est maintenant disponible sur :
    🌐 http://localhost:3000

➡️ Enjoy !
