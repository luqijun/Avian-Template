<script setup lang="ts">
import type { Ref } from "vue";

import { twMerge } from "tailwind-merge";
import { computed, ref } from "vue";
import { emit } from "process";

const emits = defineEmits(["sendMessage", "update:modelValue"]);

const props = defineProps<{
  class: any;
  variant?: string;
  value?: string;
  autoResize?: boolean;
}>();

const textareaRef: Ref<HTMLTextAreaElement | null> = ref(null);

const baseClasses = `max-w-full w-full px-5 py-4 rounded-sm content-center outline-none text-sm
        placeholder:text-black placeholder:opacity-40 text-opacity-70 dark:placeholder:text-white
        dark:placeholder:opacity-70 focus:outline-none transition duration-200
        ease-out`;

const variantClasses = computed(() => {
  if (props.variant === "bordered") {
    return `border border-gray-200 text-black bg-gray-50 dark:bg-gray-700
            dark:text-white dark:bg-opacity-70 dark:focus:bg-opacity-0 focus:bg-opacity-0
            focus:border-indigo-300 dark:border-gray-600`;
  } else {
    return `text-black bg-gray-50 dark:text-white border-opacity-0
            dark:bg-gray-700 dark:bg-opacity-70 dark:border-opacity-70 dark:border-gray-700`;
  }
});

const classes = twMerge(baseClasses, variantClasses.value, props.class);

const handleAutoResize = () => {
  if (props.autoResize && textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
};

const handleShiftEnter = (event: KeyboardEvent) => {
  // 阻止默认的 Shift+Enter 行为
  event.preventDefault();
  // 在 textarea 中插入一个换行符
  const textarea = textareaRef.value;
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    textarea.value = value.substring(0, start) + '\n' + value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
};

const handleEnter = (event: KeyboardEvent) => {
  // 阻止默认的 Enter 行为
  event.preventDefault();
  const textarea = textareaRef.value;
  if (!event.shiftKey && textarea && textarea.value){
    emits("sendMessage", textarea.value);
    textarea.value = ""
    handleAutoResize()
  }
};

</script>

<template>
  <textarea :class="classes" ref="textareaRef" :value="props.value"
  @keydown.enter.shift="handleShiftEnter"
  @keydown.enter="handleEnter"
  @input="$event => { handleAutoResize(); $emit('update:modelValue', ($event.target as HTMLInputElement).value) }"></textarea>
</template>
