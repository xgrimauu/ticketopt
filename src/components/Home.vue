<template>
  <div>
    <div class="container">
      <div class="flex-row q-container">
        <div class="question">Numero de viatges?</div>
        <input
          class="number-of-trips"
          placeholder="5"
          v-model="numberOftrips"
          type="text"
        />
      </div>
      <div class="flex-row q-container">
        <div class="question">Periodicitat</div>
        <button class="toggle-btn" @click="nextPeriodicity()">
          {{ timeUnit }}
        </button>
      </div>
      <div class="flex-row q-container">
        <div class="question">Recurrent o puntual?</div>
        <button
          class="toggle-btn"
          @click="this.isRecurrent = !this.isRecurrent"
        >
          {{ isRecurrent ? "Recurrent" : "Puntual" }}
        </button>
      </div>
    </div>
    <div class="container">
      <div class="question">{{ optimalCard }}</div>
    </div>
    <div v-for="item in priceList" :key="item" class="container">
      <div class="question">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import TicketCalculator from "@/service/TicketCalculator.js";

import periodicity from "@/service/Periodicity.js";

const ticketCalculator = new TicketCalculator();
export default {
  data() {
    return {
      numberOftrips: 2,
      timeUnit: periodicity.WEEKLY,
      isRecurrent: true,
    };
  },
  methods: {
    nextPeriodicity() {
      switch (this.timeUnit) {
        case periodicity.WEEKLY:
          this.timeUnit = periodicity.MONTHLY;
          break;
        case periodicity.MONTHLY:
          this.timeUnit = periodicity.WEEKLY;
          break;
      }
    },
  },
  computed: {
    priceList() {
      console.log("Calculating price List.. ");

      if (this.numberOftrips === null) {
        return null;
      }

      return ticketCalculator.getPriceList(
        this.numberOftrips,
        this.timeUnit,
        this.isRecurrent
      );
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

$font-size: 30px;

//Utility
.flex-col {
  display: flex;
  flex-flow: column;
}
.flex-row {
  display: flex;
  flex-flow: row;
  width: 80vw;
}

.container {
  margin-top: 40px;
  display: flex;
  flex-flow: column;
  border-left: 5px solid black;
  grid-template-areas:
    "question answer"
    "question answer"
    "question answer";
}

.question {
  grid-area: "question";
  margin-right: 30px;
  margin-left: 30px;
}

.q-container {
  margin: 10px;
  align-items: center;
}

.r-container {
  margin: 10px;
  align-items: center;
  margin-top: 40px;
  display: flex;
  flex-flow: column;
  border-left: 5px solid black;
}

html,
body {
  padding: 0;
  margin: 0;
  background-color: #f5cb5c;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: $font-size;
  color: black;
}

input {
  border: 3px solid black;
  background: transparent;
  border-radius: 50px;
  margin: 0px;
  padding: 5px;
  min-width: 30px;
  min-height: 30px;
  font-size: $font-size;
  outline: none;
}

.number-of-trips {
  width: 60px;
  margin: 10px;
  text-align: center;
  line-height: baseline;
}

.time-units {
  width: 180px;
  margin: 10px;
  text-align: center;
}

.result {
  text-align: center;
}

.toggle-btn {
  border: 3px solid black;
  background: transparent;
  border-radius: 50px;
  margin: 0px;
  padding: 10px;
  width: 200px;
  min-height: 30px;
  font-size: $font-size;
  outline: none;
}

.toggle-btn-lg {
  width: 300px;
  @extend .toggle-btn;
}

.sentence {
  display: flex;
  margin-top: 40px;
  flex-flow: row;
  width: 80vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
<style src="@vueform/toggle/themes/default.css"></style>
