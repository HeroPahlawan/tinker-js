<template>
  <div class="relative mb-1 text-left">
    <small>{{ label }}</small><br>
    <small>{{ desc }}</small>
    <div class="tag-input">
      <input
        v-model="newTag"
        type="text"
        autocomplete="off"
        @keydown.enter="addTag(newTag)"
        @keydown.prevent.tab="addTag(newTag)"
        @keydown.delete="newTag.length || removeTag(tags.length - 1)"
        class="w-full border-2 rounded-sm h-10"
      />
      <ul class="tags list-none flex items-center gap-2 m-0 p-0">
        <li
          v-for="(tag, index) in tags"
          :key="tag"
          class="tag bg-primary p-1 rounded-lg text-white whitespace-nowrap transition duration-100 ease-linear my-5"
          :class="{ duplicate: tag === duplicate }">
          {{ tag }}
          <span class="delete cursor-pointer" @click="removeTag(index)">x</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: { type: String, default: "" },
    label: { type: String, default: "" },
    desc: { type: String, default: "" },
    modelValue: { type: Array, default: () => [] },
  },
  setup(props , {emit}) {
    // Tags
    const tags = ref(props.modelValue);
    const newTag = ref("");
    const id = Math.random().toString(36).substring(7);
    const addTag = (tag) => {
      // return early if duplicate
      if (tags.value.includes(tag)) {
        handleDuplicate(tag);
        return;
      }
      tags.value.push(tag);
      newTag.value = ""; // reset newTag
    };
    const onTagsChange = () => {
      emit("update:modelValue", tags.value)
    };
    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };
    // handling duplicates
    const duplicate = ref(null);
    const handleDuplicate = (tag) => {
      duplicate.value = tag;
      setTimeout(() => (duplicate.value = null), 1000);
      newTag.value = "";
    };

    return {
      tags,
      newTag,
      addTag,
      removeTag,
      duplicate,
    };
  },
};
</script>
<style scoped>
.tag.duplicate {
  background: rgb(235, 27, 27);
  animation: shake 1s;
}
</style>