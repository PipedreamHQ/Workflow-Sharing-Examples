import { parseISO, isAfter, isBefore } from 'date-fns'


export default defineComponent({
  async run({ steps, $ }) {
    // Return data to use it in future steps
    return steps.list_events.$return_value.items
      .filter(event => event.status === 'confirmed')
      .filter(event => isAfter(parseISO(event.start.dateTime), parseISO(steps.trigger.event.timezone_utc.iso8601.timestamp)))
      .filter(event => isBefore(parseISO(event.start.dateTime), parseISO(steps.calculate_end_of_day.$return_value)))
      .filter(event => {
        return event.attendees.some(attendee => attendee.email === steps.list_events.$return_value.summary && attendee.responseStatus === 'accepted')
      })
  },
})