# Namespace: Distribution

Index of distributions implementations

## Remark

For each new distribution :

1. Add a new submodule file in this folder.
2. Create in this file a new class that implements [Distribution](classes/class.Distribution.md) interface (see [Distribution](classes/class.Distribution.md))
3. Import it at the top of this index.
4. Add it to [distClassList](variables/variable.distClassList.md) array.
5. Export it at the bottom of this index, as existing distributions.

## Index

### Classes

-   [Categorical](classes/class.Categorical.md)
-   [MultivariateNormal](classes/class.MultivariateNormal.md)
-   [MultivariateVonMises](classes/class.MultivariateVonMises.md)
-   [UniformContinuous](classes/class.UniformContinuous.md)
-   [Distribution](classes/class.Distribution.md)

### Variables

-   [distClassList](variables/variable.distClassList.md)

### Functions

-   [makeDistribution](functions/function.makeDistribution.md)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
