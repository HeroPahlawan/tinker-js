<template>
    <div class="relative mb-1 text-left">
    <small>{{ label }}</small>
    <div class="relative mb-2" data-te-input-wrapper-init>
      <!--Message textarea-->
      <textarea
        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
        :type="type"
        :id="name"
        :name="name"
        :value="value"
        :readonly="readonly" ></textarea>
    </div>
    </div>
</template>
  
  <script>
    export default {
      props: ['type','label','name','value','readonly'],
      async mounted(){
        const { Input, initTE } = await import("tw-elements");
        initTE({ Input }, { allowReinits: true });
      }
    }
  </script>