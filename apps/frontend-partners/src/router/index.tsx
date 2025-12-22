import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Spinner from '../components/atomic/Loader';
import { ErrorBoundary } from '../components/atomic/Loader/ErrorBoundary';
import Login from '../pages/offlines/Login';
import { FormUpdateOuvriers } from '../pages/onlines/Ouvriers/FormUpdateOuvriers';

const Dashboard = React.lazy(() =>
  import('../pages/onlines/Dashboard').then((module) => ({
    default: module.Dashboard,
  }))
);
const Tickets = React.lazy(() =>
  import('../pages/onlines/Tickets/index').then((module) => ({
    default: module.Tickets,
  }))
);
const Demandes = React.lazy(() =>
  import('../pages/onlines/Demandes').then((module) => ({
    default: module.Demandes,
  }))
);
const DetailOuvriers = React.lazy(() =>
  import('../pages/onlines/Ouvriers/DetailOuvriers').then((module) => ({
    default: module.DetailOuvriers,
  }))
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Login pageName='login' path={[{ name: 'login', path: '/' }]} />
        }
      />
      <Route
        path='/password-reset'
        element={<p>Page de réinitialisation du mot de passe</p>}
      />
      <Route
        path='/dashboard'
        element={
          <React.Suspense fallback={<Spinner />}>
            <ErrorBoundary>
              <Dashboard
                pageName='Dashboard'
                path={[{ name: 'Dashboard', path: '/dashboard' }]}
              />
            </ErrorBoundary>
          </React.Suspense>
        }
      />
      <Route path='/profil'>
        <Route
          index
          element={
            <React.Suspense fallback={<Spinner />}>
              <DetailOuvriers
                pageName='Profil'
                path={[{ name: 'Détail', path: '/profil' }]}
              />
            </React.Suspense>
          }
        />
        <Route
          path='/profil/:id/edit'
          element={
            <React.Suspense fallback={<Spinner />}>
              <FormUpdateOuvriers
                pageName='profil'
                path={[
                  { name: 'Détail', path: '/profil' },
                  { name: 'Modifier', path: '' },
                ]}
              />
            </React.Suspense>
          }
        />
      </Route>
      <Route path='/tickets'>
        <Route
          index
          element={
            <React.Suspense fallback={<Spinner />}>
              <Tickets
                pageName='Tickets'
                path={[
                  { name: 'Liste des Tickets', path: '/tickets' },
                  // { name: 'Tickets', path: '/tickets/:id' },
                ]}
              />
            </React.Suspense>
          }
        />
        <Route
          path='/tickets/:id'
          element={<p>Page de modification de demande</p>}
        />
      </Route>
      <Route path='/demandes'>
        <Route
          index
          element={
            <React.Suspense fallback={<Spinner />}>
              <Demandes
                pageName='Demandes'
                path={[{ name: 'Demandes', path: '/demandes' }]}
              />
            </React.Suspense>
          }
        />
        <Route
          path='/demandes/:id'
          element={<p>Page de modification de demande</p>}
        />
        <Route path='*' element={<p>Page introuvable</p>} />
      </Route>
    </Routes>
  );
};
