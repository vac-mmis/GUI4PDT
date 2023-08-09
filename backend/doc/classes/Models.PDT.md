[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / [Models](../modules/Models.md) / PDT

# Class: PDT

[Models](../modules/Models.md).PDT

Represents PDT model provided by API

## Table of contents

### Constructors

-   [constructor](Models.PDT.md#constructor)

### Properties

-   [name](Models.PDT.md#name)
-   [PDTDir](Models.PDT.md#pdtdir)
-   [objects](Models.PDT.md#objects)
-   [elevationMap](Models.PDT.md#elevationmap)

### Methods

-   [init](Models.PDT.md#init)
-   [getPublicPDT](Models.PDT.md#getpublicpdt)
-   [getName](Models.PDT.md#getname)

## Constructors

### constructor

• **new PDT**(`PDTDir`)

Creates new empty PDT with only its directory path. Should be initialized with init() method

#### Parameters

| Name     | Type     | Description                |
| :------- | :------- | :------------------------- |
| `PDTDir` | `string` | : Directory to PDT dataset |

**`See`**

[PDT.init()](Models.PDT.md#init)

#### Defined in

src/models/pdt.model.ts:112

## Properties

### name

• **name**: `string`

PDT name. Used for identifying PDT

#### Defined in

src/models/pdt.model.ts:99

---

### PDTDir

• `Private` **PDTDir**: `string`

PDT directory. Only used for PDT loading

#### Defined in

src/models/pdt.model.ts:101

---

### objects

• **objects**: [`ObjectJSON`](../modules/Types.Objects.md#objectjson)[]

PDT objects ready for providing

#### Defined in

src/models/pdt.model.ts:103

---

### elevationMap

• `Optional` **elevationMap**: `number`[][]

PDT see elevation map

#### Defined in

src/models/pdt.model.ts:105

## Methods

### init

▸ **init**(): `Promise`<`void`\>

Initiate PDT with loading all JSON timestamps

#### Returns

`Promise`<`void`\>

#### Defined in

src/models/pdt.model.ts:119

---

### getPublicPDT

▸ **getPublicPDT**(): `Object`

Give PDT but with only public data (without PDTDir)

#### Returns

`Object`

PDT without private attributes

| Name            | Type                                                     |
| :-------------- | :------------------------------------------------------- |
| `name`          | `string`                                                 |
| `objects`       | [`ObjectJSON`](../modules/Types.Objects.md#objectjson)[] |
| `elevationMap?` | `number`[][]                                             |

#### Defined in

src/models/pdt.model.ts:139

---

### getName

▸ **getName**(): `string`

Give PDT name

#### Returns

`string`

PDT name

#### Defined in

src/models/pdt.model.ts:152
