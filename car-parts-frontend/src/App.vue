<template>
  <div>
    <h1>Car Parts</h1>

    <input v-model="name" placeholder="Name" />
    <input v-model="price" placeholder="Price" type="number" />
    <input v-model="quantity" placeholder="Quantity" type="number" />
    <button type="button" @click="addPart">Добавить</button>

    <PartsTree :parts="parts" @delete-part="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PartsTree from './components/PartsTree.vue';
import { getParts, createPart, deletePart } from './api/partsApi';

const parts = ref<any[]>([]);
const name = ref('');
const price = ref('');
const quantity = ref('');

const loadParts = async () => {
  const res = await getParts();
  parts.value = res.data;
};

const addPart = async () => {
  console.log('Добавляем деталь:', name.value, price.value, quantity.value);
  if (!name.value || !price.value || !quantity.value) return;

  try {
    await createPart({
      name: name.value,
      price: +price.value,
      quantity: +quantity.value
    });
    name.value = '';
    price.value = '';
    quantity.value = '';
    await loadParts();
  } catch (err) {
    console.error('Ошибка добавления:', err);
  }
};


const removePart = async (id: string) => {
  await deletePart(id);
  await loadParts();
};


onMounted(loadParts);
</script>
