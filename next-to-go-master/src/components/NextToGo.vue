<template>
  <div id="next-to-go">
    <div id="container">
      <h1>Next To Go Races</h1>
      <div id="filter">
        <VCheckbox
          v-model="visibleCategories"
          label="Greyhound"
          :value="CATEGORY_ID_GREYHOUND"
        />
        <VCheckbox
          v-model="visibleCategories"
          label="Harness"
          :value="CATEGORY_ID_HARNESS"
        />
        <VCheckbox
          v-model="visibleCategories"
          label="Thoroughbred"
          :value="CATEGORY_ID_THOROUGHBRED"
        />
      </div>
      <VCard
        class="race-summary"
        v-for="race in filteredRaces"
        :key="race.id"
      >
        <h3>{{ race.meeting_name }} ({{ CATEGORY_MAP[race.category_id] }})</h3>
        <p>Race {{ race.race_number }}</p>
        <p>{{ countdown(race.advertised_start.seconds) }}</p>
      </VCard>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

const CATEGORY_ID_GREYHOUND = '9daef0d7-bf3c-4f50-921d-8e818c60fe61';
const CATEGORY_ID_HARNESS = '161d9be2-e909-4326-8c2c-35ed71fb460b';
const CATEGORY_ID_THOROUGHBRED = '4a2788f8-e825-4d36-9894-efd4baf1cfae';
const CATEGORY_MAP = {
  [CATEGORY_ID_GREYHOUND]: 'Greyhound',
  [CATEGORY_ID_HARNESS]: 'Harness',
  [CATEGORY_ID_THOROUGHBRED]: 'Thoroughbred',
};

export default {
  name: 'NextToGo',
  data() {
    return {
      CATEGORY_ID_GREYHOUND,
      CATEGORY_ID_HARNESS,
      CATEGORY_ID_THOROUGHBRED,
      CATEGORY_MAP,
      visibleCategories: [
        CATEGORY_ID_GREYHOUND,
        CATEGORY_ID_HARNESS,
        CATEGORY_ID_THOROUGHBRED,
      ],
      races: [],
      now: Date.now(),
    };
  },
  computed: {
    filteredRaces() {
      return this.races
        // Filter out deselcted categories.
        .filter(r => this.visibleCategories.includes(r.category_id))
        // Filter out races after 1 minute past the start time.
        .filter(r => r.advertised_start.seconds * 1000 > this.now - 60000)
        // Sort in ascending order by start time.
        .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
        // Only show the first five races.
        .slice(0, 5);
    },
  },
  mounted() {
    this.fetchNextRaces();
    this.startCountdownTimers();
    this.startRefetchTimer();
  },
  methods: {
    fetchNextRaces() {
      fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=30')
        .then(response => response.json())
        .then(({ data }) => {
          const { race_summaries: raceSummaries } = data;
          this.races = Object.values(raceSummaries);
        })
        // eslint-disable-next-line
        .catch(console.error);
    },
    startCountdownTimers() {
      // Update countdown timers every second.
      this.now = Date.now();
      setTimeout(this.startCountdownTimers, 1000);
    },
    startRefetchTimer() {
      // Refetch next races every minute.
      setTimeout(() => {
        this.fetchNextRaces();
        this.startRefetchTimer();
      }, 60000);
    },
    countdown(seconds = 0) {
      const millis = seconds * 1000;
      if (this.now > millis) {
        // Display negative.
        return format(this.now - millis, "'-'m'm' s's'");
      }
      return format(millis - this.now, "m'm' s's'");
    },
  },
};
</script>

<style scoped>
#next-to-go {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

h1 {
  margin-bottom: 1em;
}

#filter {
  display: flex;
}

#filter .v-input {
  margin: 0 0.5em;
}

.race-summary {
  text-align: left;
  margin: 1em;
  padding: 1em;
}

#container {
  min-width: 600px;
}
</style>
