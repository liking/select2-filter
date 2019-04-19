import vSelect from 'vue-select'

Nova.booting((Vue, router, store) => {
    Vue.component('select2-filter', require('./components/Select2Filter'));
    Vue.component('v-select', vSelect)
})
