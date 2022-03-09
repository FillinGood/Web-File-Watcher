/* eslint-disable no-undef */
(() => {
  function onLoad() {
    const ws = new WebSocket('ws://' + window.location.host);
    ws.onerror = (e) => {
      console.error(e);
    };
    ws.onopen = () => {
      console.log('connected');
      ws.onmessage = (e)=>{
        const url = e.data;
        document.getElementById("img").src = url;
      }
      ws.send(window.location.pathname);
    };
  }
  document.onreadystatechange = () => {
    if (document.readyState != 'interactive') {
      return;
    }
    onLoad();
  };
})();
