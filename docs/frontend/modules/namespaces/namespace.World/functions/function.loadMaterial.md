# Function: loadMaterial

> **loadMaterial**(`materialBlob`): `Promise`\< `MeshStandardMaterial` \>

Loads material from file blobs provided by backend API

## Parameters

| Parameter      | Type                                                                                                          |
| :------------- | :------------------------------------------------------------------------------------------------------------ |
| `materialBlob` | [`MaterialFile`](../../namespace.Interfaces/namespaces/namespace.Assets/interfaces/interface.MaterialFile.md) |

## Returns

`Promise`\< `MeshStandardMaterial` \>

Loaded model as Three.JS `MeshStandardMaterial` object.

## Remark

For the moment, this loader only PNG and JPEG files as material components. See [materialStore](../../namespace.Stores/variables/variable.materialStore.md) and backend API to have details on material ressources format.

## Defined In

World/systems/loader.ts:64

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
