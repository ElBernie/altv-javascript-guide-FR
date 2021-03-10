# Guide de l'utilisation des évènements

Maintenant que nous avons fait un tour rapide des évènements disponibles, il est important de comprendre la documentation.

_Si ces liens ne fonctionnent plus,avertissez Stuyk sur Discord._

-   [API serveur](https://altmp.github.io/altv-typings/modules/_alt_server_.html#on)
-   [API Client](https://altmp.github.io/altv-typings/modules/_alt_client_.html#on)

Les sections ci-dessous sont des exemples d'utilisation des évènements
Below is some common use cases for events. Just some general code regarding how to use them.

[Référence d'utilisation des Evenements serveur](./server_events)

## playerConnect exemple côté serveur

Cet évènement est le point d'entrée pour tout joueur qui rejoint votre serveur. Cette évènement devrait être utilisé une seule fois dans toute votre ressource. Vous pouvez même kicker un joueur avant qu'il soit totalement connecté !

**Serveur**

```js
// An event to handle when a player connects.
alt.on('playerConnect', handlePlayerConnect);

// Uses the class alt.Player
function handlePlayerConnect(player) {
    alt.log(`${player.name} has connected.`);
}
```

Vous devez prendre en compte le fait que \*_RIEN NE SE PASSE_ après la connexion d'un joueur.

Le joueur ne peut pas bouger et le modèle du joueur n'est pas défini.

Voici comment définir le modèle du joueur et le faire spawn.

**Serveur**

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

const spawn = {
    x: -1291.7142333984375,
    y: 83.43296813964844,
    z: 54.8916015625
};

alt.on('playerConnect', handlePlayerConnect);

function handlePlayerConnect(player) {
    player.spawn(spawn.x, spawn.y, spawn.z, 0);
    player.model = `mp_m_freemode_01`;
}
```

## connectionComplete exemple côté client

L'alternative à l'évèneùe,t `playerConnect` est l'évènement client `connectionComplete`. Cet évènement est déclenché quand le joueur est totalement connecté au serveur.

Cet évènement s'execute côté client, et nous savons déjà qui est le joueur qui se connecte.

Cela signifie que cet évènement ne s'exécute que sur le client du joueur qui se connecte, et pas pour l'ensemble des joueurs connectés.

**Client**

```js
alt.on('connectionComplete', handleConnectionComplete);

function handleConnectionComplete() {
    const myClientPosition = { ...alt.Player.local.pos };

    alt.log(`My Position Is: ${JSON.stringify(myClientPosition)}`);
    alt.emitServer('helloFromClient', 'this is a string');
}
```

**Server**

```js
alt.onClient('helloFromClient', handleHelloFromClient);

function handleHelloFromClient(player, msg) {
    console.log(`${player.name} sent up an event.`);
    console.log(msg);
}
```

## playerDeath exemple côté serveur & côté client

La mort d'un joueur est évènement assez commun. Si un joueur meurt, il faudra utiliser la fonction `player.spawn` pour le ramener à la vie.

Vous aurez besoin de le mettre en position de ragdoll manuellement après la mort du joueur, si vous souhaitez qu'il reste sur place pour un long moment. Gardez en tête qu'il faut absolument le faire respawn (`player.spawn`) avant de le mettre en position de ragdoll.

### Côté serveur

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    if (killer && killer.valid) {
        alt.log(`${victim.name} was killed by ${killer.name}`);
    }

    alt.log(`${victim.name} will spawn in 5 seconds...`);
    alt.setTimeout(() => {
        if (!victim || !victim.valid) {
            return;
        }

        victim.spawn(0, 0, 0);
        victim.health = 200;
    }, 60000 * 3); // Will respawn the victim in 3 Minutes.
}
```

### Cas classique d'utilisation

Imaginons que nous souhaitons mettre le joueur en position de ragdoll après sa mort jusqu'a son respawn. L'exemple suivant permet de faire ça très simplement.

#### Serveur

```js
alt.on('playerDeath', handlePlayerDeath);

function handlePlayerDeath(victim, killer, weaponHash) {
    // Validate that the victim exists.
    if (!victim || !victim.valid) {
        return;
    }

    // Respawn the player.
    victim.spawn(victim.pos.x, victim.pos.y, victim.pos.z);

    // If we already marked the victim as dead. Stop code execution.
    if (victim.isDead) {
        return;
    }

    // Mark the victim as dead.
    victim.isDead = true;
    alt.emitClient(victim, 'death:Handle', victim.isDead);

    // Start a timeout in 5 seconds that will respawn them.
    alt.setTimeout(() => {
        // Verify they are still in the server in 5 seconds.
        if (!victim || !victim.valid) {
            return;
        }

        // Unmark them as dead and respawn them.
        victim.isDead = false;
        alt.emitClient(victim, 'death:Handle', victim.isDead);
        victim.spawn(0, 0, 0); // Set to your Hospital Position
        victim.health = 200;
    }, 5000);
}
```

#### Client

```js
let interval;
let isDead = false;

// Receive the value from server side.
alt.on('death:Handle', value => {
    // Update our local value.
    isDead = value;

    // If the value is false. Don't re-create the interval.
    if (!isDead) {
        return;
    }

    // Start an interval that calls a function every 100ms.
    interval = alt.setInterval(handleDeathTicks, 100);
});

function handleDeathTicks() {
    // If they are no longer marked as dead. Clear the interval.
    if (!isDead) {
        alt.clearInterval(interval);
        return;
    }

    // If they are marked as dead. Ragdoll them.
    native.setPedToRagdoll(alt.Player.local.scriptID, 5000, 0, 0, true, true, false);
}
```

## playerLeftVehicle & playerEnteredVehicle côté serveur

Ces évènements sont déclenchés quand un joueur entre ou quitte un véhicule.

Voici un exemple de code pour supprimer le véhicule du joueur quand il le quitte.

```js
alt.on('playerEnteredVehicle', handlePlayerEnteredVehicle);
alt.on('playerLeftVehicle', handlePlayerLeftVehicle);

function handlePlayerEnteredVehicle(player, vehicle, seat) {
    // Store information about the vehicle and seat on the player.
    player.currentSeat = seat;
    player.lastVehicle = vehicle;
}

function handlePlayerLeftVehicle(player, vehicle, seat) {
    // Check if the seat is the driver seat. Check if the vehicle is valid.
    if (player.currentSeat === -1 && player.lastVehicle.valid) {
        player.lastVehicle.destroy();
        player.lastVehicle = null;
        player.currentSeat = -2;
    }
}
```
