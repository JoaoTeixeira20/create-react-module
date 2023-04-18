const eventData = { name: 'Event Name', data: 'Event Data' };
fetch('/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(eventData)
})
.then(response => {
  // Handle response from server
})
.catch(error => {
  // Handle error
});