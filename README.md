# Maquettes 
https://miro.com/app/board/uXjVIof90g8=/?share_link_id=200302325297

# Diagrammes de la DB
https://drive.google.com/file/d/19sf1EQsVrzR73O4Lgcv9n4f_YNUbnNbP/view?usp=sharing

---
# Installation du projet

```
npm i
npm run install-client-packages
docker compose up
npm run db:seed
npm run dev
```
# Base de données et Drizzle
## interface admin de la base de données : 
```
npm run db:studio
```

# Choix techniques
## frontend
- Daisy ui : simple d'utilisation et simple à configurer, et car cette libraire est 100% en tailwind.

- tanstack router car cela est plus pratique à utiliser que React Router. 

- architecture basée sur un dossier features : pour séparer les différentes fontionnalités et ne pas avoir tout de mélangé ensemble. 

## backend:
-Drizzle ORM pour avoir des schemas de base de données ainsi que typescript sur les requêtes. C'est aussi utile pour les migrations et le seeding. 