# Class: Resizer

Implementation of resizer tool for world responsiveness.

## Constructors

### new Resizer

> **new Resizer**(
> `container`,
> `camera`,
> `renderer`): [`Resizer`](class.Resizer.md)

Creates new resizers for worlds.

#### Parameters

| Parameter   | Type                | Description      |
| :---------- | :------------------ | :--------------- |
| `container` | `HTMLDivElement`    | World container. |
| `camera`    | `PerspectiveCamera` | World camera.    |
| `renderer`  | `WebGLRenderer`     | World resizer.   |

#### Returns

[`Resizer`](class.Resizer.md)

#### Defined In

World/systems/Resizer.ts:47

## Properties

### container

> `private` **container**: `HTMLDivElement`

World container to control dimensions.

#### Defined In

World/systems/Resizer.ts:29

---

### camera

> `private` **camera**: `PerspectiveCamera`

World camera

#### Defined In

World/systems/Resizer.ts:31

---

### renderer

> `private` **renderer**: `WebGLRenderer`

World renderer

#### Defined In

World/systems/Resizer.ts:33

## Methods

### resize

> `private` **resize**(): `void`

Method to apply resizing.

#### Returns

`void`

#### Defined In

World/systems/Resizer.ts:38

---

### updateContainer

> **updateContainer**(`container`): `void`

Update resizer container. Used when PDT changes to keep the right container.

#### Parameters

| Parameter   | Type             | Description                |
| :---------- | :--------------- | :------------------------- |
| `container` | `HTMLDivElement` | New container for resizer. |

#### Returns

`void`

#### Defined In

World/systems/Resizer.ts:63

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
