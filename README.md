# imazure
Pomona, leader de la distribution alimentaire, face à un défi de gestion de photos chez PassionFroid. Notre appli DAM Azure permet recherche d'images/vidéos basée sur tags, présence de produits, humains, logos, etc. Recherche vocale et gestion CRUD pour équipe marketing national.

## gestion du projet
Trello est un outil de gestion de projet en ligne qui permet de créer des tableaux pour organiser et suivre les tâches. Le Trello Agile de l'application* est spécifiquement conçu pour la gestion de projet en utilisant la méthodologie Agile. Il vous permet de visualiser et de gérer les différentes étapes du projet, de manière collaborative, en utilisant des cartes pour représenter les tâches, des listes pour les regrouper par catégories, et des tableaux pour suivre l'avancement global du projet. Vous pouvez cliquer sur le lien ci-dessous pour accéder au Trello Agile de l'application* et ainsi suivre et contribuer activement à la progression du projet.

> https://trello.com/b/9N90ps9g/tableau-agile

## Maquettage

la maquette de l'application à été fait grace à l'outil penpot lien du projet (privée)

> https://design.penpot.app/#/workspace/0656f724-90d3-81c2-8002-6815c0b04693/0656f724-90d3-81c2-8002-6815fd53bc20?page-id=0656f724-90d3-81c2-8002-6815fd53bc21

## conventions et dénomination du repository

### conventions de structure du repository

- le dossier front est le code associé au front-end de l'application
- le dossier back est le code associé au back-end de l'application

### conventions d'utilisation du git
- La branche 'main' est la branche de déploiement.
- La branche 'develop' est utilisée pour merger les développements validés.

### conventions des noms de branche

- Les noms des branches sont toujours en majuscules.
- Les mots des noms branches sont séparés par un underscore.
- Lorsqu'une nouvelle branche est créée pour un ticket concernant une nouvelle fonctionnalité, le nom de la branche commence par FCT_
- Pour les correctifs, le préfixe utilisé est FIX_ 
- **la branche API-ENDPOINT-INFO serra la documentation des endpoints de l'api flask ou autre endpoints necessaire**
- **la branche BDD-DOC serra contient la doc technique de la base de données**
- **la branche FRONT-END-DOC contient le manuel utilisateur de l'application**
- **la branche CI_CD-DOC contient le manuel utilisateur de l'application**

### conventions des commits
- Chaque commit doit être précédé du numéro d'identification du ticket entre crochets, par exemple : [\<id du ticket\>], comme [DNP-45].

## convention du trello

- Chaque ticket doit avoir un ID entre crochets, par exemple : [\ <ID du ticket\ >], comme [DNP-45].
- Chaque ticket doit avoir une étiquette signalant le type de développement : front-end, back-end, etc.
- Chaque ticket doit être associé à une branche (pas nécessairement une branche par ticket, il est préférable de regrouper les tickets associés sur une même branche).



    
