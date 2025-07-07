import { Link } from "react-router-dom"


const Header = () => {
    return (
        <header className='sticky top-0 w-full h-14 bg-black flex items-center px-5 gap-x-10'>
            <Link to={`/`} className='text-white'>All Quizzes</Link>
            <Link to={`/create`} className='text-white'>Create</Link>
        </header>
    )
}

export default Header