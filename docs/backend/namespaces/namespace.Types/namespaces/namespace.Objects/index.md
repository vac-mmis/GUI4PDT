[API](../../../../API.md) > [Types](../../index.md) > Objects

# Namespace: Objects

This file contains types used to define objects and their attributes
PDTs JSON files must follows these representations to be loaded

New object attributes must be added here. If it's a distributed property, it should have a `dist` sub-attribute which should contains one of the types available in [Distributions](../namespace.Distributions/index.md) like this :

```ts
export type NewPropertyJSON =
     | Type1
     | { dist : Dist1 | Dist2 ... }
     | ...
```

## Index

### Type Aliases

-   [ClassJSON](type-aliases/type-alias.ClassJSON.md)
-   [LocationJSON](type-aliases/type-alias.LocationJSON.md)
-   [RotationJSON](type-aliases/type-alias.RotationJSON.md)
-   [MaterialJSON](type-aliases/type-alias.MaterialJSON.md)
-   [ObjectTimestamp](type-aliases/type-alias.ObjectTimestamp.md)
-   [ObjectJSON](type-aliases/type-alias.ObjectJSON.md)
