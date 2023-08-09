[MMIS GUI Backend Documentation](../README.md) / [Exports](../modules.md) / Models

# Namespace: Models

This folder provides all necessary class for representing PDT data. For the moment, only PDT needs a class to be well represented. Models and materials could be directly implemented in [Stores](Stores.md).

## Table of contents

### Classes

-   [PDT](../classes/Models.PDT.md)

### Functions

-   [PDTTimestampsToPDTJSON](Models.md#pdttimestampstopdtjson)
-   [parseMap](Models.md#parsemap)

## Functions

### PDTTimestampsToPDTJSON

▸ **PDTTimestampsToPDTJSON**(`timestampsFiles`): `Promise`<{ `name`: `string` ; `objects`: [`ObjectJSON`](Types.Objects.md#objectjson)[] }\>

Transforms timestamps PDT files into object attributes.

#### Parameters

| Name              | Type       | Description                        |
| :---------------- | :--------- | :--------------------------------- |
| `timestampsFiles` | `string`[] | Array of all PDT timestamps files. |

#### Returns

`Promise`<{ `name`: `string` ; `objects`: [`ObjectJSON`](Types.Objects.md#objectjson)[] }\>

JSON PDT content with time representation inside object attributes.

**`Throws`**

`JSON Data undefined` if JSON files parsing failed.

#### Defined in

src/models/pdt.model.ts:25

---

### parseMap

▸ **parseMap**(`CSVFile`): `Promise`<`number`[][]\>

Parse depth map from CSV file to array of points.

#### Parameters

| Name      | Type     | Description    |
| :-------- | :------- | :------------- |
| `CSVFile` | `string` | File to parse. |

#### Returns

`Promise`<`number`[][]\>

Array of points representing the depth map.

#### Defined in

src/models/pdt.model.ts:72
