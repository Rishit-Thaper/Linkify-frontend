const saveDataLocal = <T>(key: string, data: T) => {
  const localData = localStorage.setItem(key, JSON.stringify(data));
  console.log(localData);
};
const getLocalData = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  return null;
};
export {
    saveDataLocal,
    getLocalData
}
