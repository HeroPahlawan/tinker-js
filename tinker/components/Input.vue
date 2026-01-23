<template>
  <div class="relative mb-1 text-left">
  <small>{{ label }}</small>
  <div class="relative mb-2" data-te-input-wrapper-init>
    <input
      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      autocomplete="off"
      :type="type"
      :id="name"
      :name="name"
      :value="value" 
      :readonly="readonly" data-te-input-state-active/>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['type','label','name','value', 'readonly'],
    async mounted(){
      const { Input, initTE } = await import("tw-elements");
      initTE({ Input }, { allowReinits: true });
    }
  }
</script>