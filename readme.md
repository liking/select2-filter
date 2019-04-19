## Nova Select2 Filter

[![Latest Version on Github](https://img.shields.io/github/release/liking/select2-filter.svg?style=flat-square)](https://packagist.org/packages/liking/select2-filter)
[![Total Downloads](https://img.shields.io/packagist/dt/liking/select2-filter.svg?style=flat-square)](https://packagist.org/packages/liking/select2-filter)

Nova package for rendering filter using select2 ajax.

### Installation

```bash
composer require liking/select2-filter
```

### Usage

##### Backend

```php
use Liking\Select2Filter\Select2Filter;

class CustomFilter extends Select2Filter
{
    /**
     * The field used to display as option's label.
     * If not config, use default value is `title`
     *
     * @var string
     */
    public $filterTitle = 'title';

    /**
     * The field used to represent option's value.
     * If not config, use default value is `id`
     * 
     * @var string
     */
    public $filterId = 'id';
    
    ....
```

##### Template
- HTML
```vue
<template>
    <div>
        <h3 class="text-sm uppercase tracking-wide text-80 bg-30 p-3">{{ filter.name }}</h3>

        <div class="p-2">
            <select2-filter
                :resource-name="resourceName"
                :filter-key="filter.class"
                @change="handleChange"
            >
            </select2-filter>
        </div>
    </div>
</template>
```
- Script handle event
```vue
methods: {
    handleChange(event) {
        this.$store.commit(`${this.resourceName}/updateFilterState`, {
            filterClass: this.filterKey,
            value: event,
        })
        this.$emit('change')
    },
},
```
Difference with original: *value: event* vs *value: event.target.value*

This difference because in default nova filter resource, options is a predefined array, so it don't need labels to display in the option.
When used Select2, we need boot id and label to show in option 

---

### Backend events

Note that *$value* not same as default Nova filter value, *$value* is an array contain *value* and *label*
```php
public function apply(Request $request, $query, $value)
    {
        $searchValue = Arr::get($value, 'value');

        if ($searchValue) {
            $query->where('id', $searchValue);
        }
        return $query;
    }
```
