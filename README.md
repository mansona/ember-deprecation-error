# ember-deprecation-error

This addon is very simple. It just has a single initializer that uses [registerDeprecationHandler](https://api.emberjs.com/ember/release/functions/@ember%2Fdebug/registerDeprecationHandler) to setup a handler that always throws an error.

You could think of this addon as a simplified [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) with none of the bells and whistles.

## Why does this addon even exist?

This addon was created to serve a very specific purpose. I wanted to have a way to configure an [ember-try](https://github.com/ember-cli/ember-try) run to fail on all deprecations rather than use `ember-cli-deprecation-workflow` on my main test run. Since I know you can manage dependencies in ember-try but I couldn't find any way to create a specific config for an ember-try run this seemed like the simplest way to achieve my goal.

## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


## Installation

You could install this as a dependency using the following command:

```
ember install ember-deprecation-error
```

But that will start throwing errors whenever you hit any deprecation in your app or any of your dependencies 🙈 I would highly recommend installing and using [ember-cli-deprecation-workflow](https://github.com/mixonic/ember-cli-deprecation-workflow) if you're looking to do something like this to save your sanity. Instead see Usage below to figure out how to create an ember-try run that always throws deprecations.

## Usage

I would recommend that you create a new ember-try scenario in your `config/ember-try.js` file that does nothing but installs this addon:

```js
scenarios: [
  {
    name: 'no-deprecations',
    npm: {
      devDependencies: {
        'ember-deprecation-error': '*',
      },
    },
  },
]
```

This will make sure that your addon has no deprecations for **the current version of Ember in your addon's package.json**.

This scenario is good to have but it's not all that useful to make sure that your addon isn't causing any deprecations in the latest version of Ember. Thankfully we can use ember-try to check this too 🎉 You can just create a scenario that is similar to the `ember-release` scenario likely already in your ember-try config with this addon as an additional dependency:

```js
scenarios: [
  {
    name: 'ember-release-no-deprecations',
    npm: {
      devDependencies: {
        'ember-source': await getChannelURL('release'),
        'ember-deprecation-error': '*',
      },
    },
  },
]
```

I would recommend setting your CI environment to "allow failures" for this scenario as it will likely randomly start failing at some point in the future as new deprecations are added.

And if you're extra adventurous you could add another scenario for either ember-beta or ember-canary 😉


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
