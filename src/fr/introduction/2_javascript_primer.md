# Bases du JavaScript

Cette page va vous permettre de comprendre les bases du JavaScript. Elle est destinée aux personnes qui ne souhaitent pas apprendre le JavaScript par le biais de site comme CodeAcademy. Vous pouvez trouver d'autres ressources pour apprendre le JavaScript ci-dessous.

-   [https://learnxinyminutes.com/docs/javascript/](https://learnxinyminutes.com/docs/javascript/)
-   [https://www.learn-js.org/](https://www.learn-js.org/)
-   [https://bonsaiden.github.io/JavaScript-Garden/](https://bonsaiden.github.io/JavaScript-Garden/)

## Variables

Il existe de type de variables qui peuvent être utilisées avec le JavaScript

```js
const maVariable = 'example';
let monAutreVariable = 'example';
```

**const** signifie que cette variable est une constante. Cela veut dire que le type de cette variable, ainsi que ses propriétés ne peuvent changer. Elle doit également avoir une valeur lors de son initialisation.

**let** signifie que cette variable peut être réassignée. Une variable de ce type peut être réutilisée. Définir une valeur à l'initialisation de ce type de variable est optionnel.

```js
let maVariable;
maVariable = 'test';
maVariable = 25;
maVariable = {
    maPropriété: 'Cool Stuff'
};
```

## Mathématiques de base

Les mathématiques en JavaScript sont quasiment similaires aux autres langages.

```js
let resultat;

// Addition
resultat = 5 + 5;
resultat += 1;
console.log(resulta);

// Soustraction
resultat = 10 - 5;
resultat -= 1;
console.log(resultat);

// Multiplication
resultat = 10 * 5;
resultat *= 2;
console.log(resultat);

// Division
resultat = 10 / 5;
console.log(resultat);
```

## Fonctions basiques

Les fonctions sont des blocs de code qui peuvent être appelés depuis d'autres blocs de code. Les fonctions peuvent également être exportées et importées dans d'autres fichiers. On parlera de l'importation de fonctions un peu plus bas dans cette section.

Vous pouvez écrire les fonctions de diverses façons. Je préfère la façon traditionnelle plutôt que les `arrow functions`.

**Exemple de fonction traditionnelle**

```js
function maSuperFonction(monArgument, monAutreArgument) {
    console.log(monArgument);
    console.log(monAutreArgument);
}

maSuperFonction('hello', 'world');

function addition(n1, n2) {
    return n1 + n2;
}

const resultat = addition(5, 5);
console.log(resultat);
//affiche le résultat de la fonction addition, en l'occurence 10.
```

**Arrow Functions**

```js
const maSuperFonction = (monArgument, monAutreArgument) => {
    console.log(monArgument);
    console.log(monAutreArgument);
};

maSuperFonction('hello', 'world');

const addition = (n1, n2) => {
    return n1 + n2;
};

const resultat = addition(5, 5);
console.log(resultat);
//affiche le résultat de la fonction addition, en l'occurence 10.
```

## Exporter des fonctions

L'exportation est très important quand on travaille avec le framework alt:V. Cependant, l'exportation n'est pas disponible avec le code JavaScript de base. On utilise souvent la syntaxe ES6 pour importer et exporter. Cette syntaxe est légèrement différente que la syntaxe du JavaScript de base pour exporter des modules.

Imaginons que ces fichiers soit dans le même dossier.

**Fichier 1 - fichier1.js**

```js
export function maFonction(arg1, arg2) {
    console.log(arg1, arg2);
}
```

**Fichier 2 - fichier2.js**

```js
import { maFonction } from './fichier1.js';

maFonction('hello', 'world');
```

**Fichier 2 (alternative) - fichier2.js**

```js
import * as mesFonctions = from './fichier1.js'

mesFonctions.maFonction('hello', 'world');
```

C'est au final assez simple ! On utilise très régulièrement l'importation et l'exportation quand il s'agit de créer une infrastructure de fichiers solide pour notre serveur.

## Boucles For

Les boucles sont utilisées pour plein de choses différentes en JavaScript et peuvent vous servir a réduire la taille de votre code. Une boucle `for` permet d'executer un bloc de code plusieurs fois de suite, et cela nous permet de faire différentes choses avec les tableaux de donnée (`array`)

Gardez à l'esprit que les arrays commencent toujours à 0.

```js
const data = ['test0', 'test1', 'test2'];

function envoyerMessage(msg) {
    console.log(msg);
}

// is a number in this for loop
// i++ increments the number by 1
for (let i = 0; i < data.length; i++) {
    envoyerMessage(data[i]);
}
```

Le code ci-dessus va afficher 3 fois l'array `data`. Il va afficher en premier ‘test0’, puis ‘test1’ et enfin ‘test2’.
La boucle s'effectue sur l'array `data`, en lisant les données suivant l'ordre défini par la variable `i`.
