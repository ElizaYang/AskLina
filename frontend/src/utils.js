// Placeholder for local storage helpers
export function saveChildInfo(name, age) {
  localStorage.setItem('childName', name);
  localStorage.setItem('childAge', age);
}

export function getChildInfo() {
  return {
    name: localStorage.getItem('childName') || '',
    age: localStorage.getItem('childAge') || ''
  };
} 