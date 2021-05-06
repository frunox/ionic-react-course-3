import { IonApp, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppTabs from './AppTabs';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();

  console.log(`rendering App with auth: `, auth);
  if (loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          {/* <IonRouterOutlet> */}
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/entries" />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
          {/* </IonRouterOutlet> */}
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;

// return (
//   <IonApp>
//     <Router>
//       <Route exact path="/home">
//         <HomePage />
//       </Route>
//       <Route exact path="/settings">
//         <SettingsPage />
//       </Route>
//       <Redirect exact path="/" to="/home" />
//     </Router>
//   </IonApp>
// );
