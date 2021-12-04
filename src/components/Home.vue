<template>
  <div>
    <div class="container grid">
      <div class="question q1">Numero de viatges</div>
      <input
        class="number-of-trips a1"
        placeholder="5"
        v-model="numberOftrips"
        type="number"
        @focus="$event.target.select()"
      />

      <div class="question q2">Periodicitat</div>
      <button class="toggle-btn a2" @click="nextPeriodicity()">
        {{ timeUnit }}
      </button>
      <div class="question q3">Recurrent o puntual?</div>
      <button
        class="toggle-btn a3"
        @click="this.isRecurrent = !this.isRecurrent"
      >
        {{ isRecurrent ? "Recurrent" : "Puntual" }}
      </button>
    </div>
    <div class="grid-answers">
      <div v-for="item in priceList" :key="item" class="container">
        <div class="question">
          {{ item }}
        </div>
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
$small: 450px;

.grid {
  margin-top: 40px;
  display: grid;
  width: 90vw;
  grid-template-columns: 60% 35%;
  grid-template-rows: 33% 33% 33%;
  justify-content: start;
  align-items: center;
  grid-gap: 10px;
}

.grid-answers {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: start;
  align-items: center;
  gap: 30px;
}

@media screen and (max-width: $small) {
  .grid {
    margin-top: 40px;
    padding: 0px;
    margin: 0px;
    display: grid;
    width: 100vw;
    grid-template-columns: 100%;
    grid-template-rows: repeat(6, 1fr);
    place-items: center;
    gap: 10px;
    font-size: $font-size - 5px;
  }

  .grid-answers {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr 1fr;
    place-items: center;
    text-align: center;
    padding: 10px;
    gap: 15px;
    font-size: $font-size - 5px;
  }
  .toggle-btn {
    border: 1px solid black;
    background: transparent;
    border-radius: 50px;
    margin: 0px;
    padding: 10px;
    width: 200px;
    height: 60px;
    min-height: 30px;
    font-size: $font-size;
    outline: none;
  }

  .number-of-trips {
    width: 80px;
    height: 50px;
    margin: 0px;
    padding: 0px;
    text-align: center;
    outline: none;
    box-sizing: border-box;
    border: 1px solid black;
    background: transparent;
    border-radius: 50px;
    font-size: $font-size;
  }
}

//Desktop
@media screen and (min-width: $small) {
  .question {
    margin-left: 30px;
  }

  .container {
    border-left: 5px solid black;
  }

  .toggle-btn {
    border: 3px solid black;
    background: transparent;
    border-radius: 50px;
    margin: 0px;
    padding: 10px;
    width: 200px;
    height: 60px;
    min-height: 30px;
    font-size: $font-size;
    outline: none;
  }

  .number-of-trips {
    width: 80px;
    height: 50px;
    margin: 0px;
    padding: 0px;
    text-align: center;
    outline: none;
    box-sizing: border-box;
    border: 3px solid black;
    background: transparent;
    border-radius: 50px;
    font-size: $font-size;
  }
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
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: $font-size;
  color: black;
}
</style>
