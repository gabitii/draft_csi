<template>
  <ul>
    <li v-for="part in parts" :key="part.id">
      <b>{{ part.name }}</b> — {{ part.price }}₸ x {{ part.quantity }}
      <button @click="$emit('delete-part', part.id)">❌</button>
      <PartsTree
          v-if="part.children && part.children.length"
          :parts="part.children"
          @delete-part="$emit('delete-part', $event)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import PartsTree from './PartsTree.vue';

interface CarPart {
  id: string;
  name: string;
  price: number;
  quantity: number;
  children?: CarPart[];
}

defineProps<{ parts: CarPart[] }>();
</script>

