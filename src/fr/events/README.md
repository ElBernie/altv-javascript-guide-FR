# Introduction aux évènements

Les évènements sont véritables le socle du développement avec alt:V.

Les évènements permettent de récupérer une instance d'un jour dès qu'il effectue un évènement spécifique. Par exemple, lorsque le joueur se connecte au serveur, lorsqu'il entre dans un véhicule, lorsqu'il en sort et plein d'autres !

Voici la lsite des évènements a votre disposition.

## Evènements côté serveur

| Nom                      | Description                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| playerConnect            | Quand un joueur se connecte sur le serveur.                                                      |
| playerDisconnect         | Quand un joueur quitte le serveur.                                                               |
| anyResourceStart         | Quand une ressource démarre.                                                                     |
| anyResourceStop          | Quand une ressource s'arrête.                                                                    |
| anyResourceError         | Quand une ressource rencontre une erreur.                                                        |
| resourceStart            | Quand une ressource spécifique démarre.                                                          |
| resourceStop             | Quand une ressource spécifique s'arrête.                                                         |
| syncedMetaChange         | Quand une entité voit ses syncedMeta changées.                                                   |
| streamSyncedMetaChange   | Quand une entité dans la zone de streaming d'un client voit ses syncedMeta changées.             |
| playerDamage             | Quand un joueur prend un dégat d'un autre joueur ou d'un autre objet.                            |
| playerDeath              | QUand un joueur meurt.                                                                           |
| explosion                | Quand une explosion a lieu, par exemple lorsqu'on percute une pompe a essence.                   |
| weaponDamage             | Quand une arme fait un dégat.                                                                    |
| vehicleDestroy           | Quand un véhicule est détruit.                                                                   |
| entityEnterColshape      | Quand une entité entre dans une ColShape.                                                        |
| entityLeaveColshape      | Quand une entité quitte une ColShape.                                                            |
| playerEnterVehicle       | Quand un joueur rentre dans un véhicule. L'évènement se déclenche uniquement quand il s'asseoit. |
| playerLeaveVehicle       | Quand un joueur quitte un véhicule.                                                              |
| playerChangedVehicleSeat | Quand un joueur change de siège dans un véhicule.                                                |
| removeEntity             | Quand une entitée est supprimée du jeu                                                           |
| consoleCommand           | Quand vous tappez une commande dans la console et que vous appuyez sur Entrée                    |

[Liste des évènements côté serveur](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)

## Evènement côté client

| Nom                    | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| connectionComplete     | Quand un joueur est totalement connecté au serveur du côté client.                   |
| disconnect             | Quand un joueur quitte le serveur, évènement déclenché côté client.                  |
| anyResourceStart       | Quand une ressource démarre.                                                         |
| anyResourceStop        | Quand une ressource s'arrête.                                                        |
| anyResourceError       | Quand une ressource rencontre une erreur.                                            |
| resourceStart          | Quand une ressource spécifique démarre.                                              |
| resourceStop           | Quand une ressource spécifique s'arrête.                                             |
| syncedMetaChange       | Quand une entité voit ses syncedMeta changées.                                       |
| streamSyncedMetaChange | Quand une entité dans la zone de streaming d'un client voit ses syncedMeta changées. |
| keydown                | Quand un joueur appuie sur une touche.                                               |
| keyup                  | Quand un joueur relache une touche.                                                  |
| gameEntityCreate       | Quand une entité entre dans la zone de streaming du client.                          |
| gameEntityDestroy      | Quand une entité quitte la zone de streaming du client.                              |
| removeEntity           | Quand une entité est supprimée du jeu.                                               |
| consoleCommand         | Quand vous tappez une commande dans la console et que vous appuyez sur Entrée.       |

[Liste des évènements côté client](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)
