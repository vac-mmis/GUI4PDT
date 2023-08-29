# Class: Controller`<T>`

Implementation of generic controller for user interface.

## Constructors

### new Controller

> **new Controller**<`T`>(
> `name`,
> `values`,
> `tooltip`,
> `getter`,
> `setter`): [`Controller`](class.Controller.md)\< `T` \>

Create a controller object for button management

#### Type parameters

| Parameter                                                      |
| :------------------------------------------------------------- |
| `T` _extends_ `"visible"` \| `"alpha"` \| `"plot"` \| `"move"` |

#### Parameters

| Parameter | Type                                                        | Description         |
| :-------- | :---------------------------------------------------------- | :------------------ |
| `name`    | `"loc"` \| `"rot"` \| `"class"` \| `"surface"` \| `"z-var"` | Controller name.    |
| `values`  | _readonly_ `T`[]                                            | -                   |
| `tooltip` | `string`                                                    | Controller tooltip. |
| `getter`  | () => `T`[]                                                 | Controller getter.  |
| `setter`  | (`newValue`) => `void`                                      | Controller setter   |

#### Returns

[`Controller`](class.Controller.md)\< `T` \>

#### Defined In

models/Controls/Controller.ts:66

## Properties

### name

> **name**: `"loc"` \| `"rot"` \| `"class"` \| `"surface"` \| `"z-var"`

Controller name

#### Defined In

models/Controls/Controller.ts:42

---

### values

> **values**: _readonly_ `T`[]

Controller values

#### Defined In

models/Controls/Controller.ts:44

---

### icon

> **icon**: `string`

Controller icon

#### Defined In

models/Controls/Controller.ts:47

---

### tooltip

> **tooltip**: `string`

Controller tooltip

#### Defined In

models/Controls/Controller.ts:49

---

### state

> **state**: `T`[] = `[]`

Controller reactive state, used to watch controller state

#### Defined In

models/Controls/Controller.ts:51

---

### getter

> `private` **getter**: () => `T`[]

Controller internal getter

#### Returns

`T`[]

#### Defined In

models/Controls/Controller.ts:54

---

### setter

> `private` **setter**: (`newValue`) => `void`

Controller internal setter

#### Parameters

| Parameter  | Type  |
| :--------- | :---- |
| `newValue` | `T`[] |

#### Returns

`void`

#### Defined In

models/Controls/Controller.ts:56

## Methods

### buildGlobalBooleanController

> `static` **buildGlobalBooleanController**<`T`>(`controllerList`): [`Controller`](class.Controller.md)\< `T` \>[]

Merge boolean controller list into one global controller.

#### Type parameters

| Parameter                                                      |
| :------------------------------------------------------------- |
| `T` _extends_ `"visible"` \| `"alpha"` \| `"plot"` \| `"move"` |

#### Parameters

| Parameter        | Type                                             | Description               |
| :--------------- | :----------------------------------------------- | :------------------------ |
| `controllerList` | [`Controller`](class.Controller.md)\< `T` \>[][] | Controller list to merge. |

#### Returns

[`Controller`](class.Controller.md)\< `T` \>[]

#### Remark

Getter would be a AND operation between all getters and setter would apply global new value to all setters.

#### Defined In

models/Controls/Controller.ts:89

---

### getValueIcon

> `static` **getValueIcon**(`value`): `string`

Get value icon.

#### Parameters

| Parameter | Type                                             | Description                 |
| :-------- | :----------------------------------------------- | :-------------------------- |
| `value`   | `"visible"` \| `"alpha"` \| `"plot"` \| `"move"` | Controller available value. |

#### Returns

`string`

Value icon

#### Defined In

models/Controls/Controller.ts:131

---

### getValueTip

> `static` **getValueTip**(`value`): `string`

Get value tip.

#### Parameters

| Parameter | Type                                             | Description                 |
| :-------- | :----------------------------------------------- | :-------------------------- |
| `value`   | `"visible"` \| `"alpha"` \| `"plot"` \| `"move"` | Controller available value. |

#### Returns

`string`

Value tip.

#### Defined In

models/Controls/Controller.ts:140

---

### get

> **get**(): `T`[]

Get controller reactive state.

#### Returns

`T`[]

Controller state.

#### Defined In

models/Controls/Controller.ts:147

---

### set

> **set**(`newValue`): `void`

Change controller state.

#### Parameters

| Parameter  | Type  | Description           |
| :--------- | :---- | :-------------------- |
| `newValue` | `T`[] | New controller value. |

#### Returns

`void`

#### Defined In

models/Controls/Controller.ts:156

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
