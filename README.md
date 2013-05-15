# npm-publish-notify

**Desktop notifications on npm publish events**

*Because what you really need is more distractions in your workday!*

Currently **only works on Linux**, perhaps some clever OS X user might contribute code to make it work there too.

## Usage

```sh
$ sudo npm install npm-publish-notify
$ npm-publish-notify &
```

And off it goes. Bandwidth-usage is fairly low, see [npm-publish-stream](https://github.com/rvagg/node-npm-publish-stream) for details on how it fetches the data.

![Example Screenshot](https://raw.github.com/rvagg/npm-publish-notify/master/example_screenshot.png)

## Filtering

But wait! There's more! You may not want to see all the cruft that gets published to npm, there are a lot of packages after all.

So, implement your own filtering function and pass it as an argument to `npm-publish-notify`. Your filter function should be an `export` in a standard Node file. Your function should return a **truthy** value that will determine whether the package will be let through as a notification. You get the full npm doc to play with.

You'll find a *noisy_filter.js* example in this repository, it's simply a filter that lets all packages through but it pretty-prints the doc to stdout so you can see what kind of data you can play with. But beware, it is **noisy**, the whole *README* of each package is bundled, along with historical version information.

**noisy_filter.js**

```js
module.exports = function (doc) {
  console.log(JSON.stringify(doc, null, 2))
  return true
}
```

Perhaps you want to filter on packages that depend on a particular package you care about?

**dependency_filter.js**

```js
module.exports = function (doc) {
  return Object.keys(pkg.versions[v].dependencies || {}).indexOf('my-special-package') != -1
}
```

Or perhaps you care more about keywords?

**keyword_filter.js**

```js
module.exports = function (doc) {
  return (pkg.versions[v].keywords || []).indexOf('awesome') != -1
}
```


## Licence

npm-publish-notify is Copyright (c) 2013 Rod Vagg [@rvagg](https://twitter.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.