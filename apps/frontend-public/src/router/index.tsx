import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from '../components/feature/Auth/Login'
import Register from '../components/feature/Auth/Register'
import Contact from '../components/feature/Contact'
import DemandeOuvriers from '../components/feature/DemandeOuvriers'
// import Home from '../components/feature/Home'
import QuiNousSomme from '../components/feature/Abouts/QuiNousSomme'
import RetrouverUnOuvrier from '../components/feature/RetrouverOuvrier'
import DetailOuvrier from '../components/feature/RetrouverOuvrier/DetailOuvrier'
import { Footer } from '../components/layouts/Footer'
import Nav from '../components/layouts/Nav'
import Spinner from '../components/shared/Loader'
import { ErrorBoundary } from '../components/shared/Loader/ErrorBoundary'
import { ErrorNotFound } from '../components/shared/Loader/ErrorNotFound'

const Home = React.lazy(() => import('../components/feature/Home'))

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<Spinner />}>
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            </React.Suspense>
          }
        />
        <Route path="/apropos">
          <Route path="qui-nous-sommes" element={<QuiNousSomme />} />
        </Route>
        <Route path="/retrouver-un-ouvrier">
          <Route index element={<RetrouverUnOuvrier />} />
          <Route path=":id/detail" element={<DetailOuvrier />} />
        </Route>
        <Route path="/besoin-ouvrier">
          <Route index element={<DemandeOuvriers />} />
        </Route>
        <Route path="/contact">
          <Route index element={<Contact />} />
        </Route>
        <Route path="/auth">
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}
