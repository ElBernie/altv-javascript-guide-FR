# Installer les fichiers du serveur

## Prérequis

Avant le commencement, veillez à installer les programmes suivants.

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   [Visual Studio Code](https://code.visualstudio.com/download)
-   [GIT](https://git-scm.com/downloads)
-   [Client alt:V](https://altv.mp/#/downloads)

## Principes généraux

Ce guide part du principe que vous travaillerez sur un environnement de dévelopement Windows.

-   Vous devez savoir utiliser l'invite de commande ou le Powershell.
-   Vous devez savoir comment ouvrir l'invite de commande ou le Powershell.
-   Vous devez savoir comment exécuter un fichier .exe dans l'invite de commande ou le Powershell.
-   Vous devez connaitre les bases du JavaScript.

**Important**

Tous les blocs de code commencant par `$` doivent être utilisé dans l'invite de commande ou avec le Powershell.
**NE COPIEZ PAS** le sign `$` en copiant les commandes

## Installer altv-pkg

[altv-pkg](https://github.com/stuyk/altv-pkg) est un utilitaire qui va vous permettre de rapidement mettre en place votre serveur sur Windows ou Linux. Il installera aussi une resource de base pour travailler dessus.

Vous pouvez l'installer depuis l'invite de commande.

```sh
$ npm install -g altv-pkg
```

Si vous avez un soucis d'installation, ouvrez une fenêtre **Powershell** avec les permissions **Administrateur** et executez la commande suivante.

```sh
$ Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force;
```

Vérifiez l'installation en vérifant la version installée.

```sh
$ altv-pkg --version
```

## Utiliser altv-pkg

Suite à l'installation, nous allons télécharger les fichiers du serveur.

Créez un dossier pour votre serveur, puis ouvrez une invite de commande dans ce même dossier et exécutez la commande suivante.

```sh
$ altv-pkg d release
```

Cette commande va vous demander quelques informations concernant le gamemode que vous créez.

Par défaut, les fichiers du serveurs et les ressoures seront automatiquement générés dans votre dossier actuel.

Suivez les instructions.

-   **N** pour Voice
-   **Y** pour Example Resource

![](../../img/cmd_altvpkg.gif)

## Comprendre la structure de votre serveur

Avant de continuer, il est important de comprendre les fichiers et la structure générale de votre dossier après le téléchargement des fichiers du serveur. Voici l'arborescence que vous devriez trouver après avoir utilisé la commande `altv-pkg d release`

```
|   altv-server.exe
|   libnode.dll
|   package-lock.json
|   package.json
|   server.cfg
|   update.json
|
+---data
|       vehmodels.bin
|       vehmods.bin
|
+---modules
|       js-module.dll
|
\node_modules
\---resources
    \---example
        |   resource.cfg
        |
        +---client
        |       startup.js
        |
        \---server
                startup.js
```

### altv-server.exe

C'est le fichier principal pour lancer le serveur. Depuis la console de commande, il peut être démarré avec la commande suivante.

```
$ altv-server.exe
```

Utilisez `Ctrl + C` pour éteindre votre serveur.

### package.json

C'est le fichier ou seront installés les modules (`node_modules`) utilisés côté serveur. N'oubliez pas qu'il n'est pas possible d'utiliser les `node_modules` côté client.

```json
{
    "name": "altv-pkgserver",
    "version": "0.0.0",
    "description": "Don't worry we made this package.json for you.",
    "main": "index.js",
    "scripts": {
        "update": "altv-pkg d release"
    },
    "author": "stuyk",
    "type": "module",
    "prettier": {
        "printWidth": 120,
        "tabWidth": 4,
        "singleQuote": true,
        "bracketSpacing": true
    },
    "devDependencies": {
        "@altv/types-client": "^1.1.1",
        "@altv/types-natives": "^1.1.0",
        "@altv/types-server": "^1.4.2",
        "@altv/types-webview": "^1.0.2"
    }
}
```

Quelques petites choses importantes définies par cette structure.

-   On utilise l'extension [Prettier extension for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   On utilise `"type": "module"` pour avoir accès à la [Syntaxe ES6](https://www.w3schools.com/js/js_es6.asp).
-   On peut utiliser la commande `$ npm run update` pour mettre à jour notre serveur.

Ce fichier fonctionne comme pour tout les projets NodeJS.

### server.cfg

Ce fichier sert à paramètrer votre serveur.

```sh
name: "TestServer",
host: "0.0.0.0",
port: 7788,
players: 1024,
#password: "verysecurepassword",
announce: false,
#token: no-token,
gamemode: "Freeroam",
website: "test.com",
language: "en",
description: "test",
debug: false,
modules: [
  "js-module",
],
resources: [
    "example"
],
tags: [
  "customTag1",
  "customTag2",
  "customTag3",
  "customTag4"
]
```

#### password

Le mot de passe est un paramètre optionnel. Il est commenté avec le signe `#`.

#### token

Le token est un paramètre optionnel. Il est commenté avec le signe `#`. Vous pouvez obtenir un token en contactant un des bots du discord alt:V.

#### debug

Si vous développez votre serveur, il est fortement recommandé de configurer ce paramètre sur `true`. Ce paramètre vous permettra d'utiliser la commande `reconnect` si ce paramètre est également paramètré sur `true` dans votre [configuration client](https://wiki.altv.mp/Altv.cfg)

#### resources

C'est la liste des ressources que votre serveur utilisera. Chaque ressource a un dossier attribué et doit contenir un fichier `resource.cfg` pour être chargé par votre serveur.

Voici le fichier `resource.cfg` du dossier `/resources/example`.

```sh
type: js,
main: server/startup.js,
client-main: client/startup.js,
client-files: [
	client/*
],
deps: []
```

La ressource principale pour le serveur pour la ressource `example` est le fichier `/resources/example/server/startup.js`

La ressource principale pour le côté client se trouve quant à elle dans le dossier `client`.

### /data

Ce dossier contient les fichiers de données de votre serveur, par exemple pour associer quel valeur correspond à un nom de véhicule. Ces fichiers sont automatiquement téléchargé par le client à la connexion a votre serveur.

### /modules

C'est dans ce dossier que sont installés les fichiers spéciaux en `.dll` ou `.so` pour des modules qui utilisent différents langages, par le C# ou le Lua. Ces fichiers sont généralement créés par d'autres membres de la communauté alt:V.

### /node_modules

C'est dans ce dossier que sont installés les modules que vous téléchargez depuis le Node Package Manager (NPM). Pour installer un module NPM vous pouvez utiliser la commande suivante. L'exemple ci dessous installe le module Stanford Javascript Crypto Libr

```sh
$ npm i sjcl
```

### /resources

Ce dossier est l'endroit ou vous pouvez créer des ressources qui seront chargées par votre serveur par le biais du fichier `server.cfg`. Si vous créez un projet important, nous vous recommandons de créer une seule et unique ressource pour des raisons de performance et de facilité d'utilisation.

## Ouvrir votre espace de travail

Avec VS:Code, ouvrez le dossier ou vous avez installé votre serveur alt:V.

Le dossier devrait ressembler à ça.

![](../../img/vscode_entry.png)

Vous pouvez dès a présent commencer à écrire votre code dans le fichier `resources/example/startup.js`.

Assurez vous que dans votre `server.cfg`, à la section `resources` soit inscrit le nom de votre ressource, dans notre cas `example`.

```sh
resources: [
  "example"
],
```

Lancez votre serveur depuis l'invite de commande pour être sûr que tout charge correctement.

![](../../img/cmd_loaded.png)

## Se connecter à votre serveur

Vous pouvez vous connect en ouvrant votre client alt:V, en cliquant sur le bouton `direct connect` puis en entrant l'adresse suivante.

```
127.0.0.1:7788
```

## Code côté serveur

Le code côté serveur doit être écrit dans le dossier `server`.

Vous devez également importer les `types` pour le code côté serveur d'alt:V.

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

alt.log('test');
```

Vous devriez alors avoir l'auto-complétion pour votre code côté serveur.

![](../../img/vscode_server_test.png)

## Code côté client

Le code côté client doit être écrit dans le dossier `client`.

C'est le seul endroit ou vous pouvez utiliser les `native`.

Vous devez également importer les `types` pour le code côté client d'alt:V.

```js
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';

alt.log(`You connected! Nice!`);
```

Votre client devrait maintenant également dispoer de l'auto-complétion.

![](../../img/vscode_client_test.png)
