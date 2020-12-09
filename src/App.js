import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
      console.log(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post(('repositories'), {
      title: "correios",
      url: "www.correios.com.br",
      techs: ["Java", "Javascript"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const indexOfDeletedRepository = repositories
      .findIndex(repository => repository.id === id)

    if (indexOfDeletedRepository > -1) {
      repositories.splice(indexOfDeletedRepository, 1)
      setRepositories([...repositories])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
