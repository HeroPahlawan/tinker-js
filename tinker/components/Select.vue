<template>
  <div class="relative mb-1 text-left">
  <small>{{ label }}</small>
  <div class="mb-2">
    <select :v-model="vmod" data-te-select-init :id="name" :name="name">
      <option value="">-</option>
      <option v-for="v in list" :value="v.value" :selected="value==v.value">{{ v.label }}</option>
    </select>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['label','name','list','value','vmod'],
    async mounted(){
      const { Select, initTE } = await import("tw-elements");
      initTE({ Select }, { allowReinits: true });
    }
  }
</script>