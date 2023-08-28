<template>
    <div v-html="content"></div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";

const props = defineProps<{
    /**
     * Content to display in Markdown
     */
    content: string;
}>();

/**
 * Load KaTeX plugin for marked
 * 
 @see {@link https://katex.org/docs/options.html | Option from KaTeX}
 */
marked.use(
    markedKatex({
        throwOnError: false,
        errorColor: " #cc0000",
        output: "mathml",
    })
);

const content = ref(marked.parse(props.content));

watch(
    () => props.content,
    (newContent) => (content.value = marked.parse(newContent))
);
</script>
