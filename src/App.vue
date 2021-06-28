<template>
  <div class="col-6 offset-3 mt-2">
    <Total v-bind:total="total" />
    <Forms @expense="expense" @income="income" />
    <History v-bind:account="account" @deteleRecord="deteleRecord" />
  </div>
</template>

<script>
import Total from "./components/Total.vue";
import Forms from "./components/Forms.vue";
import History from "./components/History.vue";

export default {
  name: "App",
  data() {
    return {
      account: [],
    };
  },

  computed: {
    total() {
      if (this.account != null) {
        let sum = 0;
        this.account.forEach((val) => {
          if (val.type === "expense") {
            sum -= val.amount;
          } else {
            sum += val.amount;
          }
        });
        return sum;
      }

      return 0;
    },
  },

  methods: {
    expense(val) {
      this.addData(val);
    },
    income(val) {
      this.addData(val);
    },
    deteleRecord(id) {
      fetch("/api/expense", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      })
        .then((res) => res.json())
        .then(() => {
          const key = id;
          const index = this.account.findIndex((v) => v._id === key);
          console.log("Index -> ", index)
          if (index != -1) {
            this.account.splice(index, 1);
          }
        })
        .catch((err) => {
          console.log("Error -> ", err);
        });
        console.log("Delete event fired");
    },
    addData(val) {
      fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      })
        .then((res) => res.json())
        .then((json) => this.account.push(json))
        .catch((err) => {
          console.log("Error -> ", err);
        });
    },
    getData() {
      fetch("/api/expense")
        .then((res) => res.json())
        .then((json) => (this.account = json))
        .catch((err) => {
          console.log("Error -> ", err);
        });
    },
  },
  mounted() {
    this.getData();
  },
  components: {
    Total,
    Forms,
    History,
  },
};
</script>
