# Class: Pointer`<T>`

Implements pointer object which give controls to visible objects

## Constructors

### new Pointer

> **new Pointer**<`T`>(
> `content`,
> `rendererDomElement`,
> `camera`,
> `selectionCallback`?,
> `hoverCallback`?): [`Pointer`](class.Pointer.md)\< `T` \>

Creates a new Pointer object.

#### Type parameters

| Parameter                                                               |
| :---------------------------------------------------------------------- |
| `T` _extends_ [`WorldContent`](../interfaces/interface.WorldContent.md) |

#### Parameters

| Parameter            | Type                | Description                                                           |
| :------------------- | :------------------ | :-------------------------------------------------------------------- |
| `content`            | `T`                 | World content.                                                        |
| `rendererDomElement` | `HTMLCanvasElement` | HTML world container. Used to add hover and click listeners on world. |
| `camera`             | `PerspectiveCamera` | World camera.                                                         |
| `selectionCallback`? | (`obj`?) => `void`  | Callback used on mouse click.                                         |
| `hoverCallback`?     | (`obj`?) => `void`  | Callback used on mouse hover.                                         |

#### Returns

[`Pointer`](class.Pointer.md)\< `T` \>

#### Defined In

World/components/Pointer.ts:39

## Properties

### mouseCoord

> `private` **mouseCoord**: `Vector2`

Current mouse coordinates in windows.

#### Defined In

World/components/Pointer.ts:15

---

### raycaster

> `private` **raycaster**: `Raycaster`

Raycaster Three.JS object which intersects objects pointed by mouse.

#### Defined In

World/components/Pointer.ts:17

---

### rendererDomElement

> `private` **rendererDomElement**: `HTMLCanvasElement`

HTML Div element with contains pointer's world.

#### Defined In

World/components/Pointer.ts:19

---

### camera

> `private` **camera**: `PerspectiveCamera`

Pointer's world camera.

#### Defined In

World/components/Pointer.ts:21

---

### content

> `private` **content**: `T`

Pointer's world content

#### Defined In

World/components/Pointer.ts:23

---

### selectionCallback

> `private` `optional` **selectionCallback**: (`obj`?) => `void`

Callback calls on mouse click

#### Parameters

| Parameter | Type                              |
| :-------- | :-------------------------------- |
| `obj`?    | `null` \| `Object3D`\< `Event` \> |

#### Returns

`void`

#### Defined In

World/components/Pointer.ts:26

---

### hoverCallback

> `private` `optional` **hoverCallback**: (`obj`?) => `void`

Callback calls on mouse hover

#### Parameters

| Parameter | Type                              |
| :-------- | :-------------------------------- |
| `obj`?    | `null` \| `Object3D`\< `Event` \> |

#### Returns

`void`

#### Defined In

World/components/Pointer.ts:28

## Methods

### getIntersect

> `private` **getIntersect**(`event`, `getToIntersect`): `undefined` \| `Intersection`\< `Object3D`\< `Event` \> \>

Gets first element intersected by raycaster from mouse event.

#### Parameters

| Parameter        | Type                                           | Description                                |
| :--------------- | :--------------------------------------------- | :----------------------------------------- |
| `event`          | `MouseEvent`                                   | Mouse event to handle.                     |
| `getToIntersect` | () => `undefined` \| `Object3D`\< `Event` \>[] | Function which gives objects to intersect. |

#### Returns

`undefined` \| `Intersection`\< `Object3D`\< `Event` \> \>

Intersected element.

#### Defined In

World/components/Pointer.ts:66

---

### updateSet

> **updateSet**(
> `content`,
> `selectionCallback`?,
> `hoverCallback`?): `void`

Updates pointer if needed, generally when selected PDT changes.

#### Parameters

| Parameter            | Type               | Description             |
| :------------------- | :----------------- | :---------------------- |
| `content`            | `T`                | New world set.          |
| `selectionCallback`? | (`obj`?) => `void` | New selection callback. |
| `hoverCallback`?     | (`obj`?) => `void` | New hover callback.     |

#### Returns

`void`

#### Defined In

World/components/Pointer.ts:90

---

### onClick

> `private` **onClick**(`event`): `void`

Actions to do on mouse click.

#### Parameters

| Parameter | Type         | Description                  |
| :-------- | :----------- | :--------------------------- |
| `event`   | `MouseEvent` | Mouse click event to handle. |

#### Returns

`void`

#### Defined In

World/components/Pointer.ts:105

---

### onHover

> `private` **onHover**(`event`): `void`

Actions to do on mouse mover.

#### Parameters

| Parameter | Type         | Description                  |
| :-------- | :----------- | :--------------------------- |
| `event`   | `MouseEvent` | Mouse hover event to handle. |

#### Returns

`void`

#### Defined In

World/components/Pointer.ts:124

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
