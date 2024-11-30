import { useState } from 'react'
import './App.css'
import {Box, Input, Button, Card, Typography} from '@mui/joy/';
import axios from "axios";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchTerm}`
      );
      setResults(response.data.items || []);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <>
      
      <Box sx={{ width: '100%', height: '100vh', padding: 4, textAlign: "center" }}>
        {/* Поле ввода и кнопка поиска */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 4 }}>
          <Input
            placeholder="Введите запрос пж"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "300px" }}
          />
          <Button onClick={handleSearch} variant="solid">
            Поиск
          </Button>
        </Box>

        {/* Отображение результатов */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", padding: '2rem 0'}}>
          {results.map((repo) => (
            <Card
              key={repo.id}
              variant="soft"
              size='sm'
              sx={{ width: 300, cursor: "pointer", backgroundColor: "" }}
              onClick={() => window.open(repo.html_url, "_blank")}
            >
              <Typography level="h3">{repo.name}</Typography>
              <Typography level="body">Автор: {repo.owner.login}</Typography>
              <Typography level="body">Описание: {repo.description}</Typography>
              <Typography level="body">Звезды: {repo.stargazers_count}</Typography>
              <Typography level="body">Просмотры: {repo.watchers_count}</Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default App
