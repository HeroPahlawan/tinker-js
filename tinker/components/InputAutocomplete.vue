<template>
    <div class="relative mb-1 text-left">
    <small>{{ label }}</small>
    <div class="autocomplete relative mb-2 z-[1]" data-te-input-wrapper-init>
        <input
            class="autocmp peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            v-model="search"
            :name="name"
            @input="onChange()"/>
        <div v-show="isOpen" class="list-none m-0 p-0">
            <div v-if="isLoading" class="bg-white flex flex-row items-center justify-between w-full px-4 truncate text-gray-700 bg-transparent select-none cursor-pointer data-[te-input-multiple-active]:bg-neutral-100 hover:[&:not([data-te-select-option-disabled])]:bg-neutral-100 data-[te-input-state-active]:bg-neutral-100 data-[te-select-option-selected]:data-[te-input-state-active]:bg-neutral-100 data-[te-select-selected]:data-[te-select-option-disabled]:cursor-default data-[te-select-selected]:data-[te-select-option-disabled]:text-gray-400 data-[te-select-selected]:data-[te-select-option-disabled]:bg-transparent data-[te-select-option-selected]:bg-black/[0.02] data-[te-select-option-disabled]:text-gray-400 data-[te-select-option-disabled]:cursor-default group-data-[te-select-option-group-ref]/opt:pl-7 dark:text-gray-200 dark:hover:[&:not([data-te-select-option-disabled])]:bg-white/30 dark:data-[te-input-state-active]:bg-white/30 dark:data-[te-select-option-selected]:data-[te-input-state-active]:bg-white/30 dark:data-[te-select-option-disabled]:text-gray-400 dark:data-[te-input-multiple-active]:bg-white/30" role="option" aria-selected="false" aria-disabled="false" style="height: 38px;">
                <span data-te-select-option-text-ref="" class="group">Loading . . .</span>
            </div>
            <div v-else v-for="(result, i) in results" :key="i" @click="setResult(result)" class="bg-white flex flex-row items-center justify-between w-full px-4 truncate text-gray-700 bg-transparent select-none cursor-pointer data-[te-input-multiple-active]:bg-neutral-100 hover:[&:not([data-te-select-option-disabled])]:bg-neutral-100 data-[te-input-state-active]:bg-neutral-100 data-[te-select-option-selected]:data-[te-input-state-active]:bg-neutral-100 data-[te-select-selected]:data-[te-select-option-disabled]:cursor-default data-[te-select-selected]:data-[te-select-option-disabled]:text-gray-400 data-[te-select-selected]:data-[te-select-option-disabled]:bg-transparent data-[te-select-option-selected]:bg-black/[0.02] data-[te-select-option-disabled]:text-gray-400 data-[te-select-option-disabled]:cursor-default group-data-[te-select-option-group-ref]/opt:pl-7 dark:text-gray-200 dark:hover:[&:not([data-te-select-option-disabled])]:bg-white/30 dark:data-[te-input-state-active]:bg-white/30 dark:data-[te-select-option-selected]:data-[te-input-state-active]:bg-white/30 dark:data-[te-select-option-disabled]:text-gray-400 dark:data-[te-input-multiple-active]:bg-white/30" role="option" aria-selected="false" aria-disabled="false" style="height: 38px;">
                <span data-te-select-option-text-ref="" class="group">{{ result.subcategory }}</span>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'InputAutocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    is_int: {
      type: Boolean,
      required: false,
      default: false,
    },
    urix: {
      type: String,
      required: false,
      default: "",
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
    readonly: {
      type: Boolean,
      required: false,
      default: "",
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    items: function (value, oldValue) {
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isLoading = false;
      }
    },
    value: function (newVal) {
      // Update internal search state when value prop changes
      if (newVal !== this.search) {
        this.search = newVal;
      }
    }
  },
  data() {
    return {
      search: this.value || '',
      results: [],
      isOpen: false,
      isLoading: false,
    };
  },
  async mounted() {
    const { Input, initTE } = await import("tw-elements");
    initTE({ Input }, { allowReinits: true });
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    async getData() {
        const response = await call.get(`${ this.urix }`+`*${this.search}*`);
        const resdata = await response.data.docs;
        if (typeof resdata !== "undefined"){
            let rdata=[];
            resdata.map(function(value, key) {
                rdata.push({
                    'category':value.category,
                    'subcategory':value.subcategory
                });
            });
            this.results=rdata;
        }   
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    setResult(result) {
      this.search = result.subcategory;
      //hardcoded
      document.querySelector('[name="category"]').value=result.category;
      document.querySelector('[name="subcategory"]').value=result.subcategory;
      //hardcoded
      this.isOpen = false;
    },
    onChange() {
      this.$emit('input', this.search);
      if (this.isAsync) {
          this.isLoading = true;
      } else {
          this.getData();
          this.isOpen = true;
      }
    }
  },
//   async created() {
//     await this.getData();
//   },
};
</script>