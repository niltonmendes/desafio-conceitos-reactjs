import React, { useEffect, useState } from "react";

import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Nilton Mendes',
      url: 'https://github.com/niltonmendes',
      techs: [
        'VueJs',
        'ReactJS',
        'NodeJS'
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204) {
      setRepositories(repositories.filter(repository => (repository.id !== id)));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <a href={repository.url} target="_blank" rel="noopener noreferrer">{repository.title}</a>
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
