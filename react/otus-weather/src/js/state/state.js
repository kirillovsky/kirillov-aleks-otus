const state = ({
  observableTownsIds: [1, 2]
});

function getObservableTownsIds() {
  return state.observableTownsIds;
}

function setObservableTownsIds(observableTownsIds) {
  state.observableTownsIds = observableTownsIds;
}

export {
  getObservableTownsIds,
  setObservableTownsIds
};