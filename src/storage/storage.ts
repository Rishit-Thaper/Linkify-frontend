const saveDataLocal = (key: string, data: any) => {
  const localData = localStorage.setItem(key, JSON.stringify(data));
  console.log(localData);
};
const getLocalData = (key: string) => {
  const localData = localStorage.getItem(key);
  console.log(localData);
  return localData;
};

export {
    saveDataLocal,
    getLocalData
}
