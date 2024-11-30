import { useState } from 'react'
import './App.css'
import { Box, Input, Button, Card, Typography } from '@mui/joy/';
import Pagination from '@mui/material/Pagination';
import axios from "axios";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0); 
  const [itemsPerPage, setItemsPerPage] = useState(15); 
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearch, setHasSearch] = useState(false); // Что то нашлось?

  const handleSearch = async (page) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchTerm}&page=${page}&per_page=${itemsPerPage}`
      );
      console.log(response);
      if(response.data.totalCount !== 0) setHasSearch(true);
      setResults(response.data.items || []);
      setTotalCount(response.data.total_count);

    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    handleSearch(page);
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
          <Button onClick={() => handleSearch(1)} variant="solid">
            Поиск
          </Button>
          <Input
            placeholder="Кол-во элемов"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            sx={{ width: "150px" }}
          />
        </Box>

        {/* Отображение результатов */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", padding: '2rem 0'}}>
          {!hasSearch && <Typography className='notFound' sx={{ color: 'white' }}>Ничего не найдено</Typography>}
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
        {hasSearch && 
          <Pagination
          count={Math.ceil(totalCount / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
          sx={{justifySelf: 'center', paddingBottom: '20px'}}
          
        />
        }
        
      </Box>
    </>
  )
}

export default App
