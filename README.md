# is-published

Used for checking if a specific version of a package is already published or
not. You can use this, for example, in a CI pipeline to check if currently
committed version in `package.json` is published or not, and publish if it is
not.

## Usage

`is-published` will exit with code 0 if package@version is published and with
code 1 if it is not. When you run it without any arguments, it will look into
`package.json` that exists in the `process.cwd()`.

```
$ npx is-published || npm publish
```

You can also give package name and version as arguments.

```
$ npx is-published webpack 5.0.0 && echo "Finally!" || echo "Still waiting..."
```

You can also import the function to use it directly from javascript

```js
import { isPublished } from 'is-published';

isPublished({
    name: 'webpack',
    version: '5.0.0'
}).then(published =>
    if (published) console.log("Finally!");
    else console.log("Still waiting...");
).catch(err =>
    // error connecting to registry or authentication or something like that
);
```
