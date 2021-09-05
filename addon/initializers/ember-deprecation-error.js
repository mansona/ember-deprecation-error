import { registerDeprecationHandler } from '@ember/debug';

export function initialize() {
  registerDeprecationHandler((message) => {
    throw new Error(message);
  });
}

export default {
  initialize,
};
