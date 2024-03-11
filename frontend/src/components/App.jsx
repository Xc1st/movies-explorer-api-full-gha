/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom'
import MainPage from './MainPage'
import Registration from './Registration'
import Login from './Login'
import NFEPage from './NFEPage'
import Profile from './Profile'
import SearchFilms from './SearchFilms'
import ProtectedRoute from './ProtectedRoute'
import mainApi from '../utils/MainApi'
import CurrentUserContext from '../contexts/CurrentUserContext';
import SendContext from '../contexts/SendContext';
import ErrorContext from '../contexts/ErrorContext';

function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(true)
  const [isSend, setIsSend] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, [])

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserData(localStorage.jwt), mainApi.getMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((e) => {
          console.error(`Ошибка при загрузке начальных данных ${e}`)
          setIsCheckToken(false)
          localStorage.clear()
        })
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
      localStorage.clear()
    }
  }, [loggedIn])

  function handleLogin(email, password) {
    setIsSend(true)
    mainApi.authorization(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
        window.scrollTo(0, 0)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsSend(true))
  }

  function handleRegister(username, email, password) {
    setIsSend(true)
    mainApi.registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          mainApi.authorization(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
              window.scrollTo(0, 0)
            })
            .catch((err) => {
              setIsError(true)
              console.error(`Ошибка при авторизации после регистрации ${err}`)
            })
            .finally(() => setIsSend(false))
        }
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function logOut() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  function editUserData(username, email) {
    setIsSend(true)
    mainApi.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((e) => {
        setIsError(true)
        console.error(`Ошибка при редактировании данных пользователя ${e}`)
      })
      .finally(() => setIsSend(false))
  }
  function handleDeleteMovie(deletemovieId) {
    mainApi.deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((e) => console.error(`Ошибка при удалении фильма ${e}`))
  }

  function handleToggleMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteMovie(seachClickMovie[0]._id)
    } else {
      mainApi.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((e) => console.error(`Ошибка при установке лайка ${e}`))
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <SendContext.Provider value={isSend}>
          <ErrorContext.Provider value={isError}>
            <Routes>
              <Route
                path='/'
                element={<MainPage
                  loggedIn={loggedIn} />} />
              <Route
                path='/signup'
                element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Registration
                      name={'signup'} onSignUp={handleRegister} setIsError={setIsError} />} />
              <Route
                path='/signin'
                element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Login name={'signin'} setIsError={setIsError} onSignIn={handleLogin} />} />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute
                    element={Profile}
                    loggedIn={loggedIn}
                    exit={logOut}
                    editUserData={editUserData}
                    isSuccess={isSuccess}
                    setIsError={setIsError}
                    setIsSuccess={setSuccess}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit} />
                } />
              <Route
                path='/movies'
                element={
                  <ProtectedRoute
                    element={SearchFilms}
                    savedMovies={savedMovies}
                    onDelete={handleDeleteMovie}
                    addMovie={handleToggleMovie}
                    loggedIn={loggedIn}
                    setIsError={setIsError} />} />
              <Route
                path='/saved-movies'
                element={
                  <ProtectedRoute
                    element={SearchFilms}
                    savedMovies={savedMovies}
                    onDelete={handleDeleteMovie}
                    addMovie={handleToggleMovie}
                    loggedIn={loggedIn}
                    setIsError={setIsError}
                  />} />

              <Route path="*" element={<NFEPage />} />
            </Routes>
          </ErrorContext.Provider>
        </SendContext.Provider>
      </CurrentUserContext.Provider>
    </div >
  )
}
export default App