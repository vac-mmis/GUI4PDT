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

src/models/pdt.model.ts:76

## Properties

### name

• **name**: `string`

PDT name. Used for identifying PDT

#### Defined in

src/models/pdt.model.ts:65

---

### PDTDir

• `Private` **PDTDir**: `string`

PDT directory. Only used for PDT loading

#### Defined in

src/models/pdt.model.ts:67

---

### objects

• **objects**: [`ObjectJSON`](../modules/Types.Objects.md#objectjson)[]

PDT objects ready for providing

#### Defined in

src/models/pdt.model.ts:69

## Methods

### init

▸ **init**(): `Promise`<`void`\>

Initiate PDT with loading all JSON timestamps

#### Returns

`Promise`<`void`\>

#### Defined in

src/models/pdt.model.ts:83

---

### getPublicPDT

▸ **getPublicPDT**(): `Object`

Give PDT but with only puglic data (without PDTDir)

#### Returns

`Object`

PDT without private attributes

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `name`    | `string`                                                 |
| `objects` | [`ObjectJSON`](../modules/Types.Objects.md#objectjson)[] |

#### Defined in

src/models/pdt.model.ts:98

---

### getName

▸ **getName**(): `string`

Give PDT name

#### Returns

`string`

PDT name

#### Defined in

src/models/pdt.model.ts:107
