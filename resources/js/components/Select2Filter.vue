<template>
    <div>
        <v-select
            :filterable="false"
            :options="options"
            :loading="loading"
            :value="value"
            :placeholder="'Search'"
            @search="onSearch"
            @input="handleChange">
            <template slot="no-options">
                {{__('No result found')}}
            </template>
        </v-select>
    </div>
</template>
<style lang="scss">
    @import '~vue-select/src/scss/vue-select';
</style>

<script>
    export default {
        props: {
            resourceName: {
                type: String,
                required: true,
            },
            filterKey: {
                type: String,
                required: true,
            },
        },
        data: function () {
            return {
                loading: false,
                options: []
            }
        },
        methods: {
            handleChange(selected) {
                this.$emit('change', selected == null ? '' : selected)
            },
            onSearch(search, loading) {
                this.loading = true
                this.search(loading, search, this);
            },
            search: _.debounce((loading, search, vm) => {
                let options = []

                Nova.request().get('/nova-api/' + vm.resourceName, {
                    params: {search},
                }).then(({data}) => {
                    let resources = data.resources
                    if (resources.length > 0) {
                        resources.forEach(function (item) {
                            let option = vm.prepareResourceOption(item, vm.title, vm.id)
                            if (option) {
                                options.push(option)
                            }
                        })
                    }
                    vm.options = options
                    vm.loading = false
                })
            }, 350),
            prepareResourceOption(resource, labelField, valueField) {
                let fields = resource.fields
                let option = {}
                if (fields.length > 0) {
                    fields.forEach(function (item) {
                        if (item.attribute == labelField) {
                            option['label'] = item.value
                        } else if (item.attribute == valueField) {
                            option['value'] = item.value
                        }
                    })
                }
                return option
            }
        },

        computed: {
            filter() {
                return this.$store.getters[`${this.resourceName}/getFilter`](this.filterKey)
            },
            value() {
                if (this.filter.currentValue == '') {
                    return null
                }
                return this.filter.currentValue
            },
            title() {
                return this.filter.filterTitle
            },
            id() {
                return this.filter.filterId
            }
        },
    }
</script>
