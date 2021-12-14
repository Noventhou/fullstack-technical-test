# Dougs technical test for fullstack developers

## Guides
### Install project dependencies

Run `npm install`.

### Start API

You have two choices to start the API :
- `npm run start` : starts the API without watch mode,
- `npm run start:watch` : starts the API in watch mode.

## Technical stack

### Framework

This project uses [NestJS Framework](https://nestjs.com/).

### Data persistence

This project uses [SQLite](https://www.sqlite.org/index.html) a file-based data storage that uses a simplified SQL-like querying language.

### ORM

This project uses [TypeORM](https://typeorm.io/#/).

### Création d'une écriture comptable
http://localhost:3000/accounting-lines?companyId=1&accountingNumber=11&amount=1&date=2021-12-03 19:04:45

### Suppression d'une écriture comptable
http://localhost:3000/accounting-lines/{id}

### Liste des écritures comptables entre 2 dates données
http://localhost:3000/accounting-lines?startDate=2020-01-01 00:00:00&endDate=2020-12-31 23:59:59

### Calcul de la somme des montants pour un client (companyId) 8 et 2 dates pour l'année 2020
http://localhost:3000/accounting-lines/companies/8?startDate=2020-01-01 00:00:00&endDate=2020-12-31 23:59:59

### API Swagger
http://localhost:3000/api/

### Best practices
- Ajout des signatures de méthodes
- Modification du nom de variable values à accountingLine PATCH
- Les fichiers définissant une entité doit avoir comme extension entity.ts
- Installation de class-validator pour vérifier les paramètres de la requête GET, POST, PUT ou DELETE

### Analyse du code
Pour ce CRUD :
- Create : 
    * Méthode POST avec en paramètres la date, l'id de l'entreprise, le numéro de compte et le montant. L'id de l'écriture comptable est incrémenté automatiquement.
- Read :
    * Pour le findById, il y avait un findAll pour l'appel en base puis un tri sur le résultat.
    "findAll" remplacé par un "findOne" avec en paramètre l'id pour optimiser et récupérer directement le résultat
    * Pas de modifications pour le findAll
    * Pour la recherche par date, aucune sous route n'est créée car on récupère les écritures comptables entre deux dates
    * Pour la recherche par date et client, création d'une sous route pour catégoriser par entreprise avec en paramètres les dates. Un contrôle a été ajouté pour gérer une exception : Si on a aucun résultat, on ne fait pas la somme de tous les montants
- Update :
    * Modification du nom de variable "values" à "accountingLine" pour que la variable soit plus explicite
- Delete :
    * Méthode DELETE sans changement de route avec en paramètre l'id

- Validation :
    * Ajout de "class-validator" afin de contrôler les paramètres d'entrée et renvoyer un message d'erreur s'ils sont incorrects

- Swagger :
    * Ajout des types de retour HTTP et une description pour chaque requête
    * Dans les classes DTO, ajout des propriétés pour les afficher dans la documentation Swagger

