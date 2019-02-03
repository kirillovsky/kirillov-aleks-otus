const towns = [
  { id: 1, country: "GB", name: "London" },
  { id: 2, country: "RU", name: "Moscow" },
  { id: 3, country: "DE", name: "Berlin" },
  { id: 4, country: "FR", name: "Paris" },
  { id: 5, country: "US", name: "San Francisco" },
  { id: 6, country: "US", name: "New York" },
  { id: 7, country: "US", name: "Moscow" },
  { id: 8, country: "EE", name: "Tallinn" },
  { id: 9, country: "PL", name: "Wroclaw" },
  { id: 10, country: "IT", name: "Rome" },
];

function findTownByName(name) {
  return Promise.resolve(
    towns.filter(t => t.name.includes(name))
  );
}

function getTown(id) {
  const result = towns.filter(t => t.id === id);
  return (result.length !== 0) ?
    Promise.resolve(result[0]) :
    Promise.reject(`Not found town with id - ${id}`)
}

function getTowns(ids) {
  return Promise.all(
    ids.map(id => getTown(id))
  );
}

export {
  findTownByName,
  getTown,
  getTowns
};