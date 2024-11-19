import React from 'react'

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <div>App</div>
    </UserContext.Provider>
  );
}

export default App