<template>
  <div>
    <h1>Car Parts</h1>
    <select v-model="parentId">
      <option value="">(Корневая деталь)</option>
      <option v-for="p in flatParts" :key="p.id" :value="p.id">{{ p.name }}</option>
    </select>
    <input v-model="name" placeholder="Name" />
    <input v-model="price" placeholder="Price" type="number" />
    <input v-model="quantity" placeholder="Quantity" type="number" />
    <button type="button" @click="addPart">Добавить</button>
    <button type="button" @click="removeAll" style="margin-top:10px; background:#ff0000; color:white;">
      ❌ Удалить все
    </button>
    <div style="margin-top: 15px;">
      <a :href="`${API_URL}/export?format=xlsx`" target="_blank">⬇️ Скачать Excel</a>
      |
      <a :href="`${API_URL}/export?format=pdf`" target="_blank">⬇️ Скачать PDF</a>
    </div>
    <PartsTree :parts="parts" @delete-part="removePart" />
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PartsTree from './components/PartsTree.vue';
import {getParts, createPart, deletePart, clearAll} from './api/partsApi';
import {API_URL} from './api/partsApi';
const parts = ref<any[]>([]);
const name = ref('');
const price = ref('');
const quantity = ref('');
const parentId = ref('');
const flatParts = ref<{ id: string; name: string }[]>([]);


const removeAll = async() =>{
  await clearAll();
  await loadParts();
}
const addPart = async () => {
  console.log('Добавляем деталь:', name.value, price.value, quantity.value);
  if (!name.value || price.value === '' || !quantity.value) return;

  try {
    await createPart({
      name: name.value,
      price: +price.value,
      quantity: +quantity.value,
      basePrice: +price.value,
      parentId: parentId.value || null
    });
    name.value = '';
    price.value = '';
    quantity.value = '';
    parentId.value = '';
    await loadParts();
  } catch (err) {
    console.error('Ошибка добавления:', err);
  }
};

const flatten = (nodes: any[], acc: { id: string; name: string }[] = []): { id: string; name: string }[] => {
  for (const n of nodes) {
    acc.push({ id: n.id, name: n.name });
    if (n.children && n.children.length) flatten(n.children, acc);
  }
  return acc;
};

const loadParts = async () => {
  const res = await getParts();
  parts.value = res.data;
  flatParts.value = flatten(res.data, []);
};

const removePart = async (id: string) => {
  await deletePart(id);
  await loadParts();
};


onMounted(loadParts);
</script>
