[API](../../../API.md) > [Models](../index.md) > PDT

# Class: PDT

Represents PDT model provided by API

## Constructors

### constructor

> **new PDT**(`PDTDir`): [`PDT`](class.PDT.md)

Creates new empty PDT with only its directory path. Should be initialized with init() method

#### Parameters

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `PDTDir`  | `string` | : Directory to PDT dataset |

#### Returns

[`PDT`](class.PDT.md)

#### Source

src/models/pdt.model.ts:112

#### See

[PDT.init()](class.PDT.md#init)

## Properties

### name

> **name**: `string`

PDT name. Used for identifying PDT

#### Source

src/models/pdt.model.ts:99

---

### PDTDir

> **`private`** **PDTDir**: `string`

PDT directory. Only used for PDT loading

#### Source

src/models/pdt.model.ts:101

---

### objects

> **objects**: [`ObjectJSON`](../../namespace.Types/namespaces/namespace.Objects/type-aliases/type-alias.ObjectJSON.md)[]

PDT objects ready for providing

#### Source

src/models/pdt.model.ts:103

---

### elevationMap

> **elevationMap**?: `number`[][]

PDT see elevation map

#### Source

src/models/pdt.model.ts:105

## Methods

### init

> **init**(): `Promise`\< `void` \>

Initiate PDT with loading all JSON timestamps

#### Returns

`Promise`\< `void` \>

#### Source

src/models/pdt.model.ts:119

---

### getPublicPDT

> **getPublicPDT**(): `object`

Give PDT but with only public data (without PDTDir)

#### Returns

PDT without private attributes

##### `name`

**name**: `string`

##### `objects`

**objects**: [`ObjectJSON`](../../namespace.Types/namespaces/namespace.Objects/type-aliases/type-alias.ObjectJSON.md)[]

##### `elevationMap`

**elevationMap**?: `number`[][]

#### Source

src/models/pdt.model.ts:139

---

### getName

> **getName**(): `string`

Give PDT name

#### Returns

`string`

PDT name

#### Source

src/models/pdt.model.ts:152
