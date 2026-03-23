<script setup lang="ts">
const props = defineProps<{
  type: "BreadcrumbList" | "LearningResource" | "Course" | "WebSite";
  data: any;
}>();

const jsonLd = computed(() => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": props.type,
    ...props.data,
  });
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: jsonLd.value,
    },
  ],
});
</script>

<template>
  <!-- This component does not render any visible HTML -->
  <div v-if="false"></div>
</template>
