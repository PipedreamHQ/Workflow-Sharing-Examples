import { parseISO, endOfDay } from 'date-fns'

export default defineComponent({
  props: {
    timestamp: {
      type: 'string',
      label: 'Timestamp',
      description: "The timestamp to calculate the end of day from."
    }
  },
  async run({ steps, $ }) {
    // Return data to use it in future steps
    return endOfDay(parseISO(this.timestamp)).toISOString();
  },
})