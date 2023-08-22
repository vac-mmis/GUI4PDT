# Class: World`<T>`

## Constructors

### new World

> **new World**<`T`>(
> `content`,
> `container`,
> `selectionCallback`?,
> `hoverCallback`?,
> `timerCallback`?): [`World`](class.World.md)\< `T` \>

Creates a new Three.JS world in adding selected set in [WorldContent](../interfaces/interface.WorldContent.md).

#### Type parameters

| Parameter                                                               |
| :---------------------------------------------------------------------- |
| `T` _extends_ [`WorldContent`](../interfaces/interface.WorldContent.md) |

#### Parameters

| Parameter            | Type               | Description                                             |
| :------------------- | :----------------- | :------------------------------------------------------ |
| `content`            | `T`                | World content.                                          |
| `container`          | `HTMLDivElement`   | HTML div container which contains Three.JS world.       |
| `selectionCallback`? | (`obj`?) => `void` | Callback used when there is a click on a world element. |
| `hoverCallback`?     | (`obj`?) => `void` | Callback used when mouse hover on an world element.     |
| `timerCallback`?     | (`t`) => `number`  | Callback used when time changes.                        |

#### Returns

[`World`](class.World.md)\< `T` \>

#### Defined In

World/index.ts:45

## Properties

### camera

> `private` **camera**: `PerspectiveCamera`

#### Defined In

World/index.ts:26

---

### scene

> `private` **scene**: `Scene`

#### Defined In

World/index.ts:27

---

### renderer

> `private` **renderer**: `WebGLRenderer`

#### Defined In

World/index.ts:28

---

### timer

> `private` **timer**: [`Timer`](class.Timer.md)

#### Defined In

World/index.ts:29

---

### resizer

> `private` **resizer**: [`Resizer`](class.Resizer.md)

#### Defined In

World/index.ts:30

---

### controls

> `private` **controls**: `OrbitControls`

#### Defined In

World/index.ts:31

---

### pointer

> `private` **pointer**: [`Pointer`](class.Pointer.md)\< `T` \>

#### Defined In

World/index.ts:32

---

### content

> `private` **content**: `T`

#### Defined In

World/index.ts:34

## Methods

### update

> **update**(
> `content`,
> `container`,
> `selectionCallback`?,
> `hoverCallback`?): `void`

Update world. Used when selected set in [WorldContent](../interfaces/interface.WorldContent.md) is changed.

#### Parameters

| Parameter            | Type               | Description                                             |
| :------------------- | :----------------- | :------------------------------------------------------ |
| `content`            | `T`                | World content.                                          |
| `container`          | `HTMLDivElement`   | HTML div container which contains Three.JS world.       |
| `selectionCallback`? | (`obj`?) => `void` | Callback used when there is a click on a world element. |
| `hoverCallback`?     | (`obj`?) => `void` | Callback used when mouse hover on an world element.     |

#### Returns

`void`

#### Defined In

World/index.ts:100

---

### getTimer

> **getTimer**(): [`Timer`](class.Timer.md)

Get world timer to control it.

#### Returns

[`Timer`](class.Timer.md)

World timer

#### Defined In

World/index.ts:126

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
