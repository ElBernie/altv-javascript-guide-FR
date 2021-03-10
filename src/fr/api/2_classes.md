# Les classes

La plupart des classes en JavaScript nécessite d'utiliser le mot `new` avant son utilisation.

Ci-dessous, le constructeur pour la classe `alt.Vehicle`.

```ts
new Vehicle(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number): Vehicle
```

Comme vous pouvez le voir, cette classe accepte plusieur paramètres.

Avec ces informations, on peut très simplement faire apparaitre un véhicule !

```js
// Create the vehicle.
// The 'vehicle' variable is an instance of our Vehicle.
const vehicle = new alt.Vehicle('infernus', 0, 0, 0, 0, 0, 0);

// Set the vehicle's engine on.
vehicle.engineOn = true;

// Adjust the primary color of the vehicle to red.
vehicle.customPrimaryColor = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
};
```
