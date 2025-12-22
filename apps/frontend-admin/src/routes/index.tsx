import { Route, Routes } from 'react-router-dom';
import { ForgetPassword } from '../pages/offlines/ForgetPassword';
import Login from '../pages/offlines/Login';
import { Customers } from '../pages/onlines/Customers';
import { Dashboard } from '../pages/onlines/Dashboard';
import { Ouvriers } from '../pages/onlines/Ouvriers';
import { DetailOuvriers } from '../pages/onlines/Ouvriers/DetailOuvriers';
import { FormAddOuvriers } from '../pages/onlines/Ouvriers/FormAddOuvriers';
import { FormUpdateOuvriers } from '../pages/onlines/Ouvriers/FormUpdateOuvriers';
import { Partners } from '../pages/onlines/Partners';
import { Users } from '../pages/onlines/Users';
import { DetailUser } from '../pages/onlines/Users/DetailUser';
import { FormAddUser } from '../pages/onlines/Users/FormAddUser';
import { RequestCustomer } from '../pages/onlines/requestCustomer';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Login pageName='login' path={[{ name: 'login', path: '/login' }]} />
        }
      />
      <Route path='/password-forget' element={<ForgetPassword />} />
      <Route path='/send-verification' element={<h1>Send Verification</h1>} />
      <Route path='/verify-account' element={<h1>Verify Account</h1>} />
      <Route path='/reset-password' element={<h1>Reset Password</h1>} />
      <Route
        path='/dashboard'
        element={
          <Dashboard
            pageName='Tableau de bord'
            path={[
              { name: 'Tableau de bord administrateur', path: '/dashboard' },
            ]}
          />
        }
      />
      <Route path='/tickets'>
        <Route
          index
          element={
            <RequestCustomer
              pageName='Tickets'
              path={[{ name: 'Tickets', path: '/tickets' }]}
            />
          }
        />
        <Route
          path='new'
          element={
            <p>Tickets</p>
            // <FormAddCustomer
            //   pageName='Ajouter une demande'
            //   path={[
            //     {
            //       name: 'Retour à la liste des demandes',
            //       path: '/demandes',
            //     },
            //     {
            //       name: 'Ajouter une demande',
            //       path: '/demandes/new',
            //     },
            //   ]}
            // />
          }
        />
        <Route
          path='/tickets/:id'
          element={
            <p>Tickets</p>
            // <DetailCustomer
            //   pageName='Détail demande'
            //   path={[
            //     {
            //       name: 'Retour à la liste des demandes',
            //       path: '/demandes',
            //     },
            //     {
            //       name: 'Détail demande',
            //       path: '/demandes/:id',
            //     },
            //   ]}
            // />
          }
        />
        <Route
          path='/tickets/:id/edit'
          element={
            <p>Tickets</p>
            // <EditCustomer
            //   pageName='Editer une demande'
            //   path={[
            //     {
            //       name: 'Retour à la liste des demandes',
            //       path: '/demandes',
            //     },
            //     {
            //       name: 'Editer une demande',
            //       path: '/demandes/:id/edit',
            //     },
            //   ]}
            // />
          }
        />
      </Route>
      <Route
        path='/customers'
        element={
          <Customers
            pageName='Clients'
            path={[{ name: 'Clients', path: '/customers' }]}
          />
        }
      />
      <Route
        path='/partners'
        element={
          <Partners
            pageName='Partenaires'
            path={[{ name: 'Partenaires', path: '/partners' }]}
          />
        }
      >
        <Route path='/partners/new' element={<h1>New Partner</h1>} />
        <Route path='/partners/:id' element={<h1>Partner</h1>} />
        <Route path='/partners/:id/edit' element={<h1>Edit Partner</h1>} />
        <Route path='/partners/:id/delete' element={<h1>Delete Partner</h1>} />
      </Route>
      <Route path='/ouvriers'>
        <Route
          index
          element={
            <Ouvriers
              pageName='Ouvriers'
              path={[{ name: 'Liste des ouvriers', path: '/ouvriers' }]}
            />
          }
        />
        <Route
          path='new'
          element={
            <FormAddOuvriers
              pageName='Ajouter un ouvrier'
              path={[
                { name: 'Retour à la liste des ouvriers', path: '/ouvriers' },
                { name: 'Ajouter un ouvrier', path: '/ouvriers/new' },
              ]}
            />
          }
        />
        <Route
          path=':id/edit'
          element={
            <FormUpdateOuvriers
              pageName='Modifier un ouvrier'
              path={[{ name: 'Modifier un ouvrier', path: '/ouvriers/edit' }]}
            />
          }
        />
        <Route
          path=':id'
          element={
            <DetailOuvriers
              pageName='Détail ouvrier'
              path={[
                { name: 'Retour à la liste des ouvriers', path: '/ouvriers' },
                { name: 'Détail ouvrierr', path: '/ouvriers/:id' },
              ]}
            />
          }
        />
      </Route>
      <Route path='/users'>
        <Route
          index
          element={
            <Users
              pageName='Utilisateurs'
              path={[{ name: 'Utilisateurs', path: '/users' }]}
            />
          }
        />
        <Route
          path='new'
          element={
            <FormAddUser
              pageName='Ajouter un utilisateur'
              path={[
                {
                  name: 'Retour à la liste des utilisateurs',
                  path: '/users',
                },
                {
                  name: 'Ajouter un utilisateur',
                  path: '/users/new',
                },
              ]}
            />
          }
        />
        <Route
          path='/users/:id'
          element={
            <DetailUser
              pageName='Détail utilisateur'
              path={[
                {
                  name: 'Retour à la liste des utilisateurs',
                  path: '/users',
                },
                {
                  name: 'Détail utilisateur',
                  path: '/users/:id',
                },
              ]}
            />
          }
        />
        <Route path='/users/:id/edit' element={<h1>Edit User</h1>} />
        <Route path='/users/:id/delete' element={<h1>Delete User</h1>} />
      </Route>
    </Routes>
  );
}
