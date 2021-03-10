# Ressource unique vs multiple ressources

En fonction de l'orientation que vous souhaitez donner a votre prijet, vous devriez vous poser la question suivante: dois-je faire une seule ressource pour tout le serveur, ou séparer les ressources en petits blocs qui peuvent être activés ou désactivés.

Il faut garder a l'esprit que chaque ressource va avoir son propre thread d'exécution !

Commençons par observer les limites d'une organisation multi ressources.

## Limite de l'organisation multi ressources

Une limite est définie comme pouvant provoquer des problèmes ou des difficultés lors de la création de votre serveur.

### Les prototypes ne sont pas partagés

Si vous appréciez étendre les fonctionnalité des classes de base pour ajouter de nouvelles fonctionnalité, alors le système multi ressource n'est pas fait pour vous. Voyons pourquoi.

Imaginons que vous avez ce prototype.

```js
alt.Player.local.addMoney = function addMoney(amount) {
    if (isNaN(amount)) {
        return false;
    }

    if (!this.money) {
        this.money = amount;
    } else {
        this.money += amount;
    }

    return true;
};
```

Vous pourrez uniquement accèder a la fonction `addMoney` depuis la ressource ou elle est écrite.

Il est absolument impossible d'utiliser cette fonction a une autre ressource, tout simplement parce que les variables ne sont pas partagées entre ces deux ressources.

### Les propriétés customs ne sont pas partagées

Vous vous demandez pourquoi les fonctions `setMeta` and `getMeta` existent? Voilà pourquoi.
Ever wonder why `setMeta` and `getMeta` exist? This is why.

Avec la fonction défini plus haut nous pouvons ajouter de l'argent au joueur, mais comment faire si on veut y accéder depuis d'autres ressources ?

Un petit exemple avec le code suivant.

```js
// Exporting this function because we can import it into other resources.
export function addMoney(amount) {
    if (isNaN(amount)) {
        return false;
    }

    if (!this.hasMeta('money')) {
        this.setMeta('money', amount);
    } else {
        let currentAmount = this.getMeta('money');
        currentAmount += amount;
        this.setMeta('money', currentAmount);
    }
}

// Exporting this function because we can import it into other resources.
export function getMoney(amount) {
    if (!this.hasMeta('money')) {
        return 0;
    }

    return this.getMeta('money');
}
```

Comme vous pouvez le voir, on vient de créer deux nouvelles fonctions. Elles peuvent importées dans n'importe quelle autre ressource tant que la ressource ci-dessus est enregistré comme dépendance de la ressource dans laquelle nous utiliser nos fonctions.

Ca fonctionne parfaitement, mais le seul bénéfice de cette utilisation serait d'utiliser des threads définis en C++.

Alors pourquoi s'embêter a découper nos ressources ainsi alors que nous pourrions le faire sans problème avec une seule ressource ? (Evidemment pas dans un seul fichier. Très mauvaise idée. Alt:V c'est pas SAMP.)

## Limite des ressources uniques

Le seul défaut des ressources uniquement c'est qu'il n'est pas possible de profiter des threads du serveur. Mais la plupart des développeurs de serveur n'ont pas besoin d'eux. Celà inclue également les gens qui veulent développer des gamemodes RP et souhaitent suivre les meilleures pratiques de développement.

### Perte d'état

Lorsque vous redémarrez une ressource unique, vous perdez l'intégralité de l'état de votre ressource.

Vous êtes donc obligés de vous reconnecter pour réinitialiser l'état de votre ressource.

Un exemple: `player.money` est défini à 500 avant le redémarrage de la ressource.

Quand vous redémarrez la ressource, l'état de `player.money` est remis à 0.

### Maintenance de l'architecture de fichiers

Si vous construisez un gros projet, vous allez probablement avoir une ressource énorme. Ce qui veut dire que si vous n'avez pas une bonne architecture de dossier, vous allez avoir beaucoup de problèmes pour organiser votre code. C'est la raison principale pour laquelle les développeurs vont choisir un système multi-ressources.

Mon architecture favorite est la suivante.

#### Structure du code client

```sh
├───anticheat 				# A folder for anticheat related systems.
├───events				    # A folder for handling client-side events only.
├───gamedata			    # A folder for object data related to the game.
├───html				    # A folder for all HTML/VUE interfaces.
│   ├───atm
│   ├───charactereditor
│   ├───characterselect
│   ├───clothing
│   ├───hud
│   ├───help
│   ├───inventory
│   ├───login
├───systems					# A folder of files with corresponding functionality on server-side.
│   ├───inventorySystem.js	 	# Handles general inventory functionality.
│   └───vehicleSystem.js		# Handles general vehicle functionality. ie. setIntoVehicle
├───utility					# Math Functions and Such
└───views					# Where you call all your WebView creation and removal.
    ├───atm.js				# Handles working with ATM's on client-side.
    └───chat.js				# Handles working with chat on client-side.
```

Gardez a l'esprit que chaque dossiers peut être divisé en plusieurs sous dossiers.

L'astuce pour cette architecture de projet est de conserver les memes noms de fichier sur le serveur afin de savoir quel fichier correspond a quel système.

#### Structure du code serveur

```sh
├───commands				# Different command handlers.
│   ├───cmdPlayer.js 			# Commands for players specifically.
│   └───cmdVehicle.js			# Commands for vehicles specifically.
├───configuration			# Anything configuration related. Spawn points, presets, etc.
├───events				    # Used to handle server-side events only.
├───extensions				# Prototypes for different alt:V API classes.
│   ├───player.js
│   ├───vehicle.js
│   └───colshape.js
├───gamedata
├───systems					# A folder of files with corresponding clones on client-side.
│   ├───inventorySystem.js	 	 # Handles general inventory functionality.
│   └───vehicleSystem.js		 # Handles general vehicle functionality. ie. setIntoVehicle
├───utility					# Math Functions and Such
└───views					# Corresponding folder that handles view functionality on server-side.
    ├───atm.js				# Handles working with ATM's on server-side.
    └───chat.js 			# A server side chat handler for routing messages.
```

## Un avis sur la question

Je crois que les fonctionnalités ajoutées par les prototypes dépassent largement les inconvénients du systeme de ressource unique. Avec une bonne structure de projet et une bonne compréhension de votre code, c'est très simple de travailler avec une ressource uniquement. Tant que vous divisez vos fichiers en systèmes individuels qui ont les mêmes noms côté client et côté serveur.

La plupart des développeurs qui travaillent avec le framework alt:V choissisent de ne pas utiliser les système multi ressources pour cette raison.
