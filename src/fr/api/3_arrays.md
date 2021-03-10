# Obtenir tous les joueurs et tous les véhicules

Il existe deux arrays spéciales, utilisables côté serveur qui permettent d'obtenir la liste de tous les joueurs et véhicules présents sur le serveur.

## alt.Player.all

Cette array retourne une liste de tous les joueurs présents sur le serveur.

Il y a quelques petites choses que vous devez retenir en utilisant cette array.

1. Pensez toujours à cloner votre array, pour éviter des bugs.

```js
const currentPlayers = [...alt.Player.all];
```

2. Lorsque vous effectuez une boucle sur les joueurs, pensez à verifier que les joueurs sont bien valides.

```js
const currentPlayers = [...alt.Player.all];

// Loop through players.
for (let i = 0; i < currentPlayers.length; i++) {
    const aPlayer = currentPlayers[i];

    // We check validity by checking if 'aPlayer.valid' is true.
    if (!aPlayer || !aPlayer.valid) {
        continue;
    }

    // Do other stuff.
}

// Another way to loop through players.
currentPlayers.forEach((player, index) => {
    // We are checking validity here once again.
    if (!player || !player.valid) {
        return;
    }

    // Do other stuff.
});
```

## alt.Vehicle.all

Les mêmes recommendations pour le paragraphe précédent s'appliquent pour les véhicules.

```js
const currentVehicles = [...alt.Vehicle.all];

// Loop through vehicles.
for (let i = 0; i < currentVehicles.length; i++) {
    const aVehicle = currentVehicles[i];

    // We check validity by checking if 'aVehicle.valid' is true.
    if (!aVehicle || !aVehicle.valid) {
        continue;
    }

    // Do other stuff.
}

// Another way to loop through vehicles.
currentVehicles.forEach((vehicle, index) => {
    // We are checking validity here once again.
    if (!vehicle || !vehicle.valid) {
        return;
    }

    // Do other stuff.
});
```
