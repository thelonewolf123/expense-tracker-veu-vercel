<template>
  <ul class="list-group">
    <li
      v-for="tx in account"
      v-bind:key="tx._id"
      class="list-group-item p-0">
      <div v-if="tx.type === 'expense'" class="p-2">
        <div class="d-flex justify-content-end">-{{ tx.amount }}</div>
        <div>Comment: {{ tx.comment }}</div>
        <div v-if="tx.category">Category: {{ tx.category }}</div>
        <button class="btn btn-danger mt-1" @click="deleteRecord(tx._id)">
          Delete
        </button>
      </div>
      <div v-else class="bg-primary p-2" style="color: white">
        <div class="d-flex justify-content-end">
          {{ tx.amount }}
        </div>
        <div>Comment: {{ tx.comment }}</div>
        <button class="btn btn-danger mt-1" @click="deleteRecord(tx._id)">
          Delete
        </button>
      </div>
    </li>
  </ul>
  <div class="mb-5"></div>
</template>

<script>
export default {
  props: ["account"],
  methods: {
    deleteRecord(id){
      this.$emit('deteleRecord', id);
      console.log("Delete record is clicked");
    }
  }
};
</script>
