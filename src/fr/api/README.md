# Introduction à l'API.

L'API est l'endroit ou vous pouvez obtenir la majorité des informations concernants les fonctionnalités et la façon d'écrire du code pour alt:V.

Le seul soucis c'est qu'il y a peu d'exemple d'utilisation pour la plupart des fonctions.

-   [https://altmp.github.io/altv-typings/](https://altmp.github.io/altv-typings/)

## Comprendre l'API

Quand vous lisez l'API, il y a deux sections. **Cliquez sur le lien ci-dessus**

-   alt-server

    -   Concerne les fonctions utilisables côté serveur.

-   alt-client

    -   Concerne les fonctionnalités disponibles côté client.Referring to all functionality available on the client-side.

    -   Utilise souvent les fonctionnalités natives/du jeu.

    -   N'affecte que un seul joueur, pas l'intégralité des joueurs sur le serveur.

## Lire correctement l'API

Quand vous lisez l'API, l'intégralité des paramètres et des types sont définis pour les fonctions et les classes.

Voici un exemple avec la fonction `alt.on`.

```ts
on(eventName: "playerConnect", listener: (player: Player) => void): void
```

A première vue, cela peut paraitre un peu confus si vous ne savez pas comment lire une API.

-   L'évènement est appelé avec `on`
-   Le premier paramètre est `playerConnect`
-   Le second paramètre est une callback. Des données du type `alt.Player` sont transmises à la callback.
    -   Vous pouvez cliquer sur Player pour voir les propriétés de cet objet.
    -   Ses propriétés sont par exemple `name`, `ip`, etc.
-   `:void` signifie que la function ne retourne rien.

Voici comment utiliser cette fonction.

```js
alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    alt.log(`${player.name} s'est connecté au serveur.`);
}
```

## Utiliser l'API

Vous avez plusieurs types de variables, fonctions, classes etc.

Penchons nous sur la définition et l'utilisation de chacun de ces objets.

### Fonctions

Les fonctions fonctionnent comme des fonctions (sans dec' ?) et l'API a généralement une section pour elles.

![](../../img/functions.png)

Voici comment utiliser une fonction.

```js
alt.setTimeout(() => {
    alt.log(`Hello. This triggered after 5 seconds.`);
}, 5000);
```

### Classes

Les classes fonctionnent comme les classes JavaScript normales. Tout dépend de la façon dont vous importez `alt-server` ou `alt-client`

Supposons que vous utilisez le préfixe `alt`.

![](../../img/classes.png)

Gardez à l'esprit que toutes ces classes ne sont pas forcément accessibles ou utilisables.

Voici un exemple de l'utilisation de classes.

```js
const pos = new alt.Vector3(0, 0, 0);
const vehicle = new alt.Vehicle('infernus', pos.x, pos.y, pos.z, 0, 0, 0);
const shape = new alt.ColshapeCylinder(pos.x, pos.y, pos.z, 5, 10);
```

### Propriétés

Une propriété est généralement définie au sein d'une classe.

Elles sont aussi en mode lecture, donc il n'est pas nécessaire de les définir à chaque fois.

Voici un simple exemple avec un véhicule.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

if (vehicle.engineOn === false) {
    vehicle.engineOn = true;
}
```

### Méthodes

Les méthodes sont généralement définies au sein d'une classe, elles s'utilisent avec des parenthèses comme les fonctions.

```js
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);
const result = vehicle.getDoorState(0);
vehicle.setArmoredWindowHealth(0, 100);
```
