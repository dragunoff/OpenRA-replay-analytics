import store from './store';

export default function storageManager() {
  let storedReplays = [];

  if (localStorage.getItem('storedReplays')) {
    try {
      storedReplays = JSON.parse(localStorage.getItem('storedReplays'));
    } catch (e) {
      localStorage.removeItem('storedReplays');
    }
  }

  function storeReplay(replayJSON) {
    if (!replayJSON) {
      return;
    }

    storedReplays.unshift({
      versus: store.getters['replayData/versus'],
      modName: store.getters['modData/modName'](replayJSON.mod),
      timestamp: Date.now(),
      data: replayJSON
    });

    storeAllReplays();
  }

  function deleteReplay(id) {
    storedReplays.splice(id, 1);
    storeAllReplays();
  }

  function storeAllReplays() {
    localStorage.setItem('storedReplays', JSON.stringify(storedReplays));
  }

  return {
    storedReplays: storedReplays,
    storeReplay: storeReplay,
    deleteReplay: deleteReplay,
  }
}
