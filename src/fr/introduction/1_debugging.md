# Activer le Debugging sur le client

A cette étape votre client alt:V doit être installé.

Allez à l'emplacement ou vous avez installé altv.exe et trouvez le fichier altv.cfg

![](../../img/edit_cfg.png)

## altv.cfg

Verifiez que le paramètre `debug` est configuré avec `true`.

Si il n'existe, vous pouvez le créer avec l'option suivante.

```sh
debug: 'true'
```

## Se reconnecter

Suite à un redémarrage de serveur, vous serez déconnecté. Vous pouvez vous reconnecter uniquement si le serveur a le paramètre `debug` configuré sur `true`, et également sur votre client.

Appuyez simplement sur `F8`

**Avec mot de passe**

```
reconnect mot_de_passe
```

**Sans mot de passse**

```
reconnect
```
