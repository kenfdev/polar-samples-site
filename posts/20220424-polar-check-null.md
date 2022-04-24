---
title: Check if null in Polar
date: 2022-04-24
code_iframe: https://stackblitz.com/github/kenfdev/polar-samples/tree/master?embed=1&file=tests%2Fcheck-null%2Fcheck-null.test.ts&showSidebar=1&view=editor
---

When you want to evaluate a JavaScript `null` inside Polar, you use `nil` instead of `null`. This is mentioned in the docs [here](https://docs.osohq.com/node/reference/polar/classes.html#null).

Suppose you had a `User` class and `Item` class in JavaScript as follows:

```js
class User {}

class Item {
  locked: boolean | null;
  constructor(props: { locked: boolean | null }) {
    this.locked = props.locked;
  }
}
```

It's pretty unrealistic to allow `null` for the `locked` property but this is for demonstration. From here, if you'd like to allow a `read` action when the `locked` property is `null`, you can write the polar policy as follows:

```polar
actor User {}

allow(actor, action, resource) if
  has_permission(actor, action, resource);

resource Item {
  permissions = ["read"];
}

has_permission(_actor: User, "read", item: Item) if
  item.locked = nil; # use `nil` to check `null`
```

See how `nil` is used to check if `item.locked` is `null` in the JavaScript side.

You can verify that this works as expected with the code bellow.

```js
// Arrange
const user = new User();
const item = new Item({ locked: null });

// Act & Assert
await expect(oso.authorize(user, 'read', item)).resolves.toBeUndefined();
```
