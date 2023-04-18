const eventSource = new EventSource(`http://localhost:${window.RELOAD_PORT}/events`);
eventSource.onmessage = (e) => {
  const response = JSON.parse(e.data);
  if (response.status === "refresh") {;
    eventSource.close();
    window.location.reload();
  }
};

window.addEventListener('beforeunload', () => {
  eventSource.close();
});