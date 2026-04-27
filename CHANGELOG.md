# CHANGELOG

## [v1.9.0] - 2026-04-27
### Ajouté
- Ajout de la fonctionnalité de sauvegarde de la dernière ville recherchée :
    - sauvegarde dans localStorage lors de la recherche d'une ville
    - récupération de cette dernière lors de l'actualisation ou d'une nouvelle ouverture de l'appli pour afficher directement la météo de cette ville

## [v1.8.1] - 2026-04-24
### Ajouté
- Ajout de commentaires pour InfosSupp.jsx et InfosSupp.module.css

## [v1.8.0] - 2026-04-24
### Ajouté
- Ajout de représentations visuelles pour les données contenues dans InfosSupp :
    - barre de progression pour l'humidité
    - barre avec curseur pour l'indice UV
    - barre de progression avec graduations pour la pression
    - compas avec flèche indiquant la direction du vent
### Modifié
- Ajustement taille des cartes dans InfosSupp
- Retrait ligne de code mort (mis en commentaire) dans SearchBar.module.css

## [v1.7.1] - 2026-04-23
### Modifié
- Mise à jour de README.md suite aux dernières modifications
- Correction de l'affichage de la pression dans InfosSupp.jsx

## [v1.7.0] - 2026-04-23
### Ajouté
- Ajout nouvelles sections InfosSupp comprenant les données vitesse du vent, humidité, pression et indice UV
### Modifié
- Changement description weathercode de "Ciel dégagé" à "Ensoleillé"
- Modification de la WeatherCard :
    - retrait des informations vitesse du vent et humidité
    - ajout des températures max et min de la journée en cours
    - réorganisation de l'affichage Desktop & Mobile

## [v1.6.1] - 2026-04-21
### Modifié
- Ajout d'une courbe pour représenter le cycle du soleil pour la journée en cours
- Retrait des émoji pour le lever et le coucher du soleil
- Ajustements CSS pour le rendu mobile de l'affichage des heures de lever et de coucher du soleil

## [v1.6.0] - 2026-04-20
### Ajouté
- Ajout de l'affichage des heures de lever et de coucher du soleil pour la journée en cours

## [v1.5.1] - 2026-04-20
### Modifié
- Ajout de la possibilité de fermeture de la liste de suggestions sur du clic en dehors de celle-ci ou de la barre de recherche
- Modifications rendu visuel de la liste de suggestions

## [v1.5.0] - 2026-04-17
### Ajouté
- Nouvelle fonctionnalité : ajout d'une liste de suggestions de ville lors de la saisie dans la barre de recherche par l'utilisateur
- Possibilité de recherche par sélection d'une des suggestions de la liste

## [v1.4.6] - 2026-04-16
### Modifié
- Modification sur HourlyForecast.jsx pour prendre en compte l'heure locale de la ville recherché
- Modification de l'affichage de l'heure pour forcer le format 24h même pour un utilisateur étranger

## [v1.4.5] - 2026-04-16
### Ajouté
- Ajout de la prise en charge des codes 85 et 86 pouvant être envoyés par Open-Meteo pour "Averse de neige"

## [v1.4.4] - 2026-04-16
### Corrigé
- Correction de l'ordre des hooks dans HourlyForecast pour empêcher toutes erreurs React
- Correction incohérence de type dans resetApp() dans App.jsx
### Modifié
- Sélection plus spécifique du lien dans le footer dans Footer.module.css

## [v1.4.3] - 2026-04-14
### Modifié
- Modification du code dans App.jsx pour application des images de fond afin de résoudre le problème de l'affichage sur mobile"

## [v1.4.2] - 2026-04-14
### Corrigé
- Correction des effets de saut et saccade sur l'image de fond sur support mobile

## [v1.4.1] - 2026-04-14
## Modifié
- Modifications sur la barre de recherche :
    - retrait du focus sur la barre suite à une recherche afin replier automatiquement le clavier sur mobile
    - mise en place d'une classe CSS et d'un placeholder spécifiques pour afficher une erreur en cas de recherche à vide

## [v1.4.0] - 2026-04-10
## Ajouté
- Ajout de l'affichage des probabilités de précipitations sur WeatherCard, Forecast et HourlyForecast
### Modifié
- Modification de l'aspect des scrollbars

## [v1.3.9] - 2026-04-10
### Ajouté
- Ajout d'un effet de flou aux bordures gauches et droites des deux blocs de prévisions (24h et 7jours) avec mask-image pour coupure visuelle moins nette lors du scroll

## [v1.3.8] -2026-04-09
### Corrigé
- Remise en place du pull-to-refresh sur mobile

## [v1.3.7] - 2026-04-09
### Corrigé
- Correction de l'effet de rebond de l'image de fond sur mobile

## [v1.3.6] - 2026-04-09
### Corrigé
- Correction de l'affichage des images de fond pour mobile

## [v1.3.5] - 2026-04-09
### Modifié
- Modifications pour le rendu visuel sur mobile :
    - retrait du zoom sur le background pour qu'il garde une bonne qualité d'affichage
    - modification de la taille du titre
    - remplacement du display grid par flex pour affichage du Forecast sur mobile => garde l'affichage en une seule ligne avec possibilité de scroll horizontal

## [v1.3.4] - 2026-04-09
### Ajouté
- Reset du contenu de la barre de recherche après recherche d'une ville
### Modifié
- Ajustement visuels pour affichage du skeleton loader format Desktop et Mobile

## [v1.3.3] - 2026-04-09
### Modifié
- Changement de l'emoji renvoyé pour la météo "Averses"

## [v1.3.2] - 2026-04-08
### Modifié
- Modifications affichage des températures sur l'appli
- Modification de README.md par mise à jour de l'image de préview + ajout des prévisions sur 24h

## [v1.3.1] - 2026-04-08
### Ajouté
- Ajout du scroll horizontal à la molette de souris sur le bloc des prévisions sur 24h

## [v1.3.0] - 2026-04-07
### Ajouté
- Ajout du module affichant les prévisions sur 24h à partir de l'heure de la recherche + 1

## [v1.2.2] - 2026-04-07
### Ajouté
- Ajout d'un GIF en tant que skeleton loader lors de la recherche

## [v1.2.1] - 2026-04-04
### Corrigé
- Correction pour vidage de la barre de recherche lors du reset par click sur le header

## [v1.2.0] - 2026-04-03
### Ajouté
- Ajout fonctionnalité de reset de l'application par click sur le Header

## [v1.1.4] - 2026-04-03
### Modifié
- Modification du fichier README.md

## [v1.1.3] - 2026-04-03
### Ajouté
- Ajout du fichier CHANGELOG.md

## [v1.1.2] - 2026-04-03
### Ajouté
- Ajout de la date en plus de l'heure dans lastUpdate 
- Ajout de l'affichage de la version de l'appli dans le footer

## [v1.1.1] - 2026-04-02
### Corrigé
- Correction de l'affichage des images en background sur mobile

## [v1.1.0] - 2026-04-02
### Ajouté
- Ajout d'un footer à l'application
- Optimisation SEO
- Ajout de commentaires
- Réinitialisation du Forecast lors de nouvelle recherche

## [v1.0.1] - 2026-03-30
### Modifié
- Modification du titre affiché sur l'application

## [v1.0.0] - 2026-03-30
### Ajouté
- Première version stable de l'appli