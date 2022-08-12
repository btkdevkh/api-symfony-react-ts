SIELI recrutement - API
-----------------------

#Description de l'API

Cette API expose des endpoints afin de contrôler un CRUD depuis le front.

L'entité du CRUD est "Movie" :
- id : clef primaire (int autoincrémenté)
- title : chaîne de caractères (colonne non nullable)
- director: chaîne de caractères (colonne non nullable)
- isFavorite : booléen (colonne non nullable)
- releaseDate : datetime (colonne nullable)


Endpoints : 

- [GET] /api/movie/ - liste des films (id, title, isFavorite)
- [GET] /api/movie/{id} - détails d'un film  (id, title, director, isFavorite, releaseDate)
- [POST] /api/movie/ : création d'un film
- [PUT] /api/movie/{id} : modification d'un film
- [DELETE] /api/movie/{id} : liste des films (id, title, isFavorite)

*Note : {id} correspond à l'entier correspondant à la clef primaire du film voulu*

#Configuration de l'API

Prérequis :
- Section "Technical Requirements"

https://symfony.com/doc/current/setup.html#creating-symfony-applications

Paramétrage de la base de données :
- Paramétrer le fichier ".env" par rapport aux accès d'une base de données sur votre poste

https://symfony.com/doc/current/doctrine.html#configuring-the-database

- Créer la base de données et jouer les migrations (SQL de la structure de la base de données)

```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate -n
```

La structure de la base de données est alors prête. Il vous faut désormais lancer l'API afin de pouvoir le consulter.

#Lancement de l'API

Commande à lancer à la racine du projet : 
```
symfony serve
```

L'API est alors accessible sur cet URL : https://127.0.0.1:8000

*Note: si le port 8000 est déjà utilisé, l'API basculera sur un autre port, penser à bien regarder le retour de la ligne de commande.*

*Note 2 : exemple d'URL pouvant être appelée sur le port 8000 : "https://127.0.0.1:8000/api/movie/"*



*Have fun - Jérôme*