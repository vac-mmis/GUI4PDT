# Interface: WorldContent

Interface of content handle by World module.

## Extends

-   `Group`

## Properties

### getClickables

> **getClickables**: () => `undefined` \| `Object3D`\< `Event` \>[]

#### Returns

`undefined` \| `Object3D`\< `Event` \>[]

#### Defined In

World/interface/index.ts:12

---

### getHoverables

> **getHoverables**: () => `undefined` \| `Object3D`\< `Event` \>[]

#### Returns

`undefined` \| `Object3D`\< `Event` \>[]

#### Defined In

World/interface/index.ts:13

---

### onClick

> **onClick**: (`intersect`) => `undefined` \| `Object3D`\< `Event` \>

#### Parameters

| Parameter   | Type                                        |
| :---------- | :------------------------------------------ |
| `intersect` | `Intersection`\< `Object3D`\< `Event` \> \> |

#### Returns

`undefined` \| `Object3D`\< `Event` \>

#### Defined In

World/interface/index.ts:14

---

### onHover

> **onHover**: (`intersect`) => `undefined` \| `Object3D`\< `Event` \>

#### Parameters

| Parameter   | Type                                        |
| :---------- | :------------------------------------------ |
| `intersect` | `Intersection`\< `Object3D`\< `Event` \> \> |

#### Returns

`undefined` \| `Object3D`\< `Event` \>

#### Defined In

World/interface/index.ts:15

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
