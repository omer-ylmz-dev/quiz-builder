import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
