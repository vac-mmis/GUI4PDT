# Class: PDTObject

Implements representation of objects in PDT, including class, material, location, rotation etc.

## Extends

-   `Group`

## Constructors

### new PDTObject

> **new PDTObject**(`parent`, `objJSON`): [`PDTObject`](class.PDTObject.md)

Creates a PDT object from JSON data.

#### Parameters

| Parameter | Type                                                                                                   | Description                    |
| :-------- | :----------------------------------------------------------------------------------------------------- | :----------------------------- |
| `parent`  | [`PDT`](class.PDT.md)                                                                                  | -                              |
| `objJSON` | [`ObjectJSON`](../../namespace.Interfaces/namespaces/namespace.PDT/interfaces/interface.ObjectJSON.md) | Object data, from backend API. |

#### Returns

[`PDTObject`](class.PDTObject.md)

#### Overrides

Group.constructor

#### Defined In

models/object.model.ts:38

## Properties

### parent

> **parent**: [`PDT`](class.PDT.md)

Object which has this location.

#### Defined In

models/object.model.ts:18

#### Overrides

Group.parent

---

### objID

> `readonly` **objID**: `number`

Object ID

#### Defined In

models/object.model.ts:20

---

### time

> `private` **time**: `number` = `0`

Current time index to show.

#### Defined In

models/object.model.ts:22

---

### class

> `readonly` **class**: [`Class`](../namespaces/namespace.Properties/classes/class.Class.md)

Object class.

#### Remark

`this.class = this.children[0]`.

#### Defined In

models/object.model.ts:25

---

### material

> `readonly` **material**: [`Material`](../namespaces/namespace.Properties/classes/class.Material.md)

Object material. Used to create class representation.

#### Defined In

models/object.model.ts:27

---

### \_location

> `private` **\_location**: [`Location`](../namespaces/namespace.Properties/classes/class.Location.md)

Object location.

#### Remark

`this._location = this.children[1]`.

#### Defined In

models/object.model.ts:29

---

### \_rotation

> `private` **\_rotation**: [`Rotation`](../namespaces/namespace.Properties/classes/class.Rotation.md)

Object rotation.

#### Remark

`this._rotation = this.children[2]`.

#### Defined In

models/object.model.ts:31

## Methods

### getTimeIndex

> **getTimeIndex**(): `number`

Returns current object time index.

#### Returns

`number`

Object time index.

#### Defined In

models/object.model.ts:65

---

### getControllers

> **getControllers**(): [`Controller`](../namespaces/namespace.Controller/classes/class.Controller.md)\< `any` \>[]

#### Returns

[`Controller`](../namespaces/namespace.Controller/classes/class.Controller.md)\< `any` \>[]

#### Defined In

models/object.model.ts:67

---

### tick

> **tick**(`time`?): `void`

Update object to the given time.

#### Parameters

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `time`?   | `number` | Time when update object. |

#### Returns

`void`

#### Defined In

models/object.model.ts:77

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
