<template>
    <input v-model="amount" type="text" placeholder="Rs. " class="form-control m-2">
    <input v-model="comment" type="text" placeholder="Comment" class="form-control m-2">
    <select v-model="category" class="form-control m-2">
        <option>Food</option>
        <option>Rent</option>
        <option>Shoping</option>
        <option>Grocery</option>
    </select>
    <button @click="expense" class="btn btn-danger m-2">Expense</button>
    <button @click="income" class="btn btn-success m-2">Income</button>
</template>


<script>
export default {
    data() {
        return {
            amount: null,
            comment: null,
            category: null
        }
    },
    methods: {
        expense() {
            let value = {
                amount : this.amount,
                comment: this.comment,
                category: this.category,
                type: 'expense'
            }
            this.amount     = ''
            this.comment    = ''
            this.category   = ''

            this.$emit('expense', value)
        },
        income() {
            let value = {
                amount : this.amount,
                comment: this.comment,
                type: 'income'
            }

            this.amount     = ''
            this.comment    = ''
            this.category   = ''

            this.$emit('income', value)
        }
    }
}
</script>