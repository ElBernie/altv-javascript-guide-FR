# Les évènements

Les évènements s'utilisent d'une manière spécifiques, et il est très important de comprendre leur fonctionement.

Le serveur peut communiquer avec n'importe quel client.

Le client peut seulement communiquer avec le serveur ou les WebViews.

Un client **NE PEUT PAS** communiquer avec un autre client.

| Function Name  | Description                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| alt.emit       | Emet un évènement sur le serveur ou sur le client. L'évènement est reçu uniquement du côté d'ou il est émit. |
| alt.on         | Reçoit un évènement. Le serveur reçoit les évènements émis depuis le serveur, et inversement pour le client. |
| alt.onServer   | Reçoit un évènement émit depuis le serveur vers le client. Déclenché avec `alt.emitClient`.                  |
| alt.emitClient | Emet un évenement vers un client spécifique. Le client reçoit l'évènement avec `alt.onServer`.               |
| alt.onClient   | Recoit un évènement émis par un client sur le serveur. Déclenché avec `alt.emitServer`.                      |
| alt.emitServer | Emet un évènement depuis le client vers le serveur. Le serveur reçoit l'évènement avec `alt.onClient`.       |

## Du serveur vers le client

Le serveur peut transmettre des données au client avec `emitClient`, qui demande un élément de type Player.
Cependant, il est possible de remplacer un Player avec `null`. L'évènement sera alors transmis a tous les clients connectés et non plus à un seul client en particulier.

**Côté serveur**

```js
alt.on('playerConnect', player => {
    alt.emitClient(player, 'disBonjour');
});
```

**Côté client**

```js
alt.onServer('disBonjour', () => {
    alt.log('Bonjour depuis le serveur !');
});
```

## Du client vers le serveur

Le client peu transmettre des données vers le serveur avec emitServer.
Du côté serveur, l'évènement onServer va reçevoir automatiquement un Player pour identifier le client émetteur.

**Côté client**

```js
alt.on('connectionComplete', () => {
    alt.emitServer('disBonjour');
});
```

**Côté serveur**

```js
alt.onClient('disBonjour', player => {
    alt.log(`${player.name} nous dit bonjour !`);
});
```

## Ressource côté serveur vers ressource côté serveur

Le serveur peut communiquer avec lui même avec les functions `on` et `emit`.
Les données sont disponibles dans toutes les ressources.

**Côté serveur**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Ressource côté client vers ressource côté client

Le client peut communiquer avec lui même avec les functions `on` et `emit`.
Les données sont disponibles dans toutes les ressources.

**Côté client**

```js
alt.emit('hello', 'this is a message');

alt.on('hello', msg => {
    alt.log(msg);
});
```

## Du client vers la WebView, et inversement

**Note:** `Resource` dans l'adresse HTTP se réfère à la ressource pour laquelle vous êtes actuellement en train d'écrire du code.

**Côté client**

```js
const webview = new alt.WebView('http://resource/client/html/index.html');
webview.on('test2', handleFromWebview);

function handleFromWebview(msg) {
    alt.log(msg);
}

alt.setTimeout(() => {
    webview.emit('test', 'Hello from Client');
}, 500);
```

**Page HTML côté client**

```html
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <p>Words</p>
        <script type="text/javascript">
            if ('alt' in window) {
                alt.on('test', msg => {
                    console.log(msg);
                    alt.emit('test2', 'hello from webview');
                });
            }
        </script>
    </body>
</html>
```
