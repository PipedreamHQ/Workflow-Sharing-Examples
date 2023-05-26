import { parseISO, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz'



export default defineComponent({
  async run({ steps, $ }) {
    // Return data to use it in future steps
    return steps.filter_only_confirmed_events.$return_value.reduce((sum, curr) => {
      const event = `${formatInTimeZone(parseISO(curr.start.dateTime), steps.trigger.event.timezone_configured.timezone, 'H:mm') } - ${curr.summary}`
      return `${sum} ${event} \n`
    }, 'Todays Schedule \n')
  },
})