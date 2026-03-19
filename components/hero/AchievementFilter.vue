<script setup lang="ts">
const props = defineProps<{
  status: "all" | "earned" | "locked";
  rarity: string;
}>();

const emit = defineEmits<{
  (e: 'update:status', value: 'all' | 'earned' | 'locked'): void;
  (e: 'update:rarity', value: string): void;
}>();

const statuses = [
  { id: "all", label: "Tất cả", icon: "fluent:grid-24-filled" },
  { id: "earned", label: "Đã đạt", icon: "fluent:medal-24-filled" },
  { id: "locked", label: "Đang khóa", icon: "fluent:lock-closed-24-filled" }
];

const rarities = [
  { id: "all", label: "Mọi cấp độ" },
  { id: "common", label: "Cơ bản" },
  { id: "rare", label: "Hiếm" },
  { id: "epic", label: "Sử thi" },
  { id: "legendary", label: "Huyền thoại" }
];
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
    <!-- Status Filter -->
    <div class="flex p-2 bg-white/50 backdrop-blur-md rounded-[24px] border-2 border-primary/5 shadow-inner w-full md:w-auto overflow-x-auto no-scrollbar">
      <button
        v-for="statusItem in statuses"
        :key="statusItem.id"
        @click="emit('update:status', statusItem.id as any)"
        class="flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black transition-all whitespace-nowrap"
        :class="status === statusItem.id 
          ? 'bg-primary text-white shadow-lg' 
          : 'text-text/40 hover:text-text hover:bg-white/50'"
      >
        <Icon :name="statusItem.icon" />
        {{ statusItem.label }}
      </button>
    </div>

    <!-- Rarity Filter -->
    <div class="relative w-full md:w-64">
      <select
        :value="rarity"
        @change="(e: any) => emit('update:rarity', e.target.value)"
        class="w-full pl-6 pr-12 py-3 bg-white/50 backdrop-blur-md rounded-2xl font-black text-text border-2 border-primary/5 outline-none appearance-none focus:border-primary/30 transition-all cursor-pointer"
      >
        <option v-for="r in rarities" :key="r.id" :value="r.id">{{ r.label }}</option>
      </select>
      <Icon name="fluent:chevron-down-24-filled" class="absolute right-6 top-1/2 -translate-y-1/2 text-text/30 pointer-events-none" />
    </div>
  </div>
</template>
