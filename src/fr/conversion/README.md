# Convertir depuis un autre mod multijoueur

Bonne nouvelle, vous n'êtes pas le premier à la faire !

alt:V offre énormément de possibilités, mais il est important de prendre en compte certaines choses.

-   Le code serveur peut seulement être écrit en JavaScript, C# ou LUA.
-   Le code client peut seulement être écrit en JavaScript.
-   Un module est en cours de développement pour supporter **n'importe quel** langage avec la technologie WASM.
-   Le nom des Natives se base sur les noms donnés par Rockstar.

Ce sont les seules choses majeures à prendre en compte pour alt:V.

Mais il y a également des choses importantes !

✔️ Oui alt:V peut utiliser les vêtements customisés.

✔️ Oui alt:V peut utiliser la plupart des mods.

✔️ Oui alt:V peut utiliser les MLO.

✔️ Oui alt:V peut utiliser les maps customisées.

Mais alt:V n'est pas en mesure de faire certaine choses.

❌ Pas de LUA côté client

❌ Pas d'ESX

❌ Pas d'ELS (Dex++ travaille dessus)

❌ Pas de censure

❌ Pas de support pour l'utilisation des fichiers .asi, .dll ou ENB.N

❌ Pas d'utilisation de ScriptHookV.

<br />

---

## De FiveM vers alt:V

Voici les différences majeures entre alt:V et FiveM.

### Côté serveur et côté client

Oui, le code côté client et côté serveur sont séparés. Cela signifie que les injections ne sont pas un problème régulier avec alt:V. Cependant il n'est absolument pas impossible pour un programmeur expert de modifier le code côté client

[Vidéo présentant les différences entre le côté serveur et le côté client](https://www.youtube.com/watch?v=z-knlYI_QZM)

### Joueur local?

Nous n'utilisons pas `local playerPed = PlayerPedId()` pour obtenir les données du joueur local.

On utilise `alt.Player.local.scriptID`.

### Véhicule du joueur local?

Nous n'utilisons pas les natives quand nous n'en avons pas besoin.

```js
alt.Player.local.vehicle;
```

### Threads?

Nous utilisons les intervalles et les timeouts pour générer des threads.

Nous avons également accès à `alt.everyTick` qui est essentiellement un interval de 0ms.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`This was called at every 5 seconds.`);
}

function doSomethingElse() {
    alt.log(`This was called after 10 seconds.`);
}

alt.everyTick(() => {
    alt.log(`Your console will die with this every tick`);
});
```

### Evènements?

Les évènements sont utilisables pour a peu près tout. Consultez la section sur [les évènements](../api/events)

### Natives?

Les natives sont importées et uniquement accessible depuis le côté client.

Vous pouvez visiter [la base de donnée de natives d'alt:V](https://natives.altv.mp) pour en savoir d'avantage.

### Ecran de chargement?

Nous n'utilisons par actuellement les écrans de chargement. Nous pensons que cette fonctionnalité n'est pas nécessaire pour le multijoueur.

---

## De RAGE:MP vers alt:V

Voici les différences majeures entre alt:V et RAGE:MP.

### Local Player?

Nous n'utilisons pas `local playerPed = PlayerPedId()` pour obtenir le joueur local.

On utilise `alt.Player.local.scriptID`.

### mp.events.add('render')

Nous utilisons les intervalles et les timeouts pour générer des threads.

Nous avons également accès à `alt.everyTick` qui est essentiellement un interval de 0ms.

```js
const myInterval = alt.setInterval(doSomething, 5000);
const myTimeout = alt.setTimeout(doSomethingElse, 10000);

function doSomething() {
    alt.log(`This was called at every 5 seconds.`);
}

function doSomethingElse() {
    alt.log(`This was called after 10 seconds.`);
}

alt.everyTick(() => {
    alt.log(`Your console will die with this every tick`);
});
```

### mp.events.add & mp.events.call

Les évènements sont utilisables pour a peu près tout. Consultez la section sur [les évènements](../api/events)

Nous avons bien plus de controles sur nos évènements avec alt:V !

### Text Labels, Markers, etc.

Consultez la section snippets du site.
