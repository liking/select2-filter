<?php

namespace Liking\Select2Filter;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Laravel\Nova\Filters\Filter;

class Select2Filter extends Filter
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

    /**
     * Name of Nova Resource to search
     * If not config, user current Resource
     *
     * @var string
     */
    public $filterResource = '';


    public function meta()
    {
        return array_merge([
            'filterId' => $this->filterId,
            'filterTitle' => $this->filterTitle,
            'filterResource' => $this->filterResource
        ], $this->meta);
    }

    /**
     * The filter's component.
     *
     * @var string
     */
    public $component = 'select2-filter';

    /**
     * Apply the filter to the given query.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param mixed $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(Request $request, $query, $value)
    {
        $valueSearch = Arr::get($value, 'value', '');
        if (!empty($valueSearch)) {
            $query->where($this->filterId, '=', $valueSearch);
        }
        return $query;
    }

    /**
     * Get the filter's available options.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function options(Request $request)
    {
        return [];
    }
}
