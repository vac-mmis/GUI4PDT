# Class: ObjectRepresentation

Implementation of object representation.

## Extends

-   `Group`

## Implements

-   [`Representation`](../interfaces/interface.Representation.md)

## Constructors

### new ObjectRepresentation

> **new ObjectRepresentation**(
> `model`,
> `material` = `...`,
> `scale` = `1`,
> `opacity` = `1`): [`ObjectRepresentation`](class.ObjectRepresentation.md)

Creates new object representation from model, material and object data

#### Parameters

| Parameter  | Type                   | Default value | Description                                                          |
| :--------- | :--------------------- | :------------ | :------------------------------------------------------------------- |
| `model`    | `Group`                | `undefined`   | Model from which create object.                                      |
| `material` | `MeshStandardMaterial` | `undefined`   | Object material (default : `new MeshStandardMaterial()`);            |
| `scale`    | `number`               | `1`           | Object scale (default : `1`).                                        |
| `opacity`  | `number`               | `1`           | Object opacity (default : `1`). Only used if `material` is undefined |

#### Returns

[`ObjectRepresentation`](class.ObjectRepresentation.md)

#### Overrides

Group.constructor

#### Defined In

models/Representations/Object.ts:29

## Properties

### repName

> `static` **repName**: `string` = `"object"`

Representation name

#### Defined In

models/Representations/Object.ts:16

---

### currentScale

> `private` **currentScale**: `number`

Current scale, used for updates

#### Defined In

models/Representations/Object.ts:18

## Methods

### update

> **update**(`opacity`?, `scale`? = `1`): `void`

Update object opacity and/or scale.

#### Parameters

| Parameter  | Type     | Default value | Description  |
| :--------- | :------- | :------------ | :----------- |
| `opacity`? | `number` | `undefined`   | New opacity. |
| `scale`?   | `number` | `1`           | New scale.   |

#### Returns

`void`

#### Implementation of

[`Representation`](../interfaces/interface.Representation.md).[`update`](../interfaces/interface.Representation.md#update)

#### Defined In

models/Representations/Object.ts:68

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
