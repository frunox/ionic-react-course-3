import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from './auth';
import LoginPage from './pages/LoginPage';
import AppTabs from './AppTabs';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rendering App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          {/* <IonRouterOutlet> */}
          <Switch>
            <Route exact path="/login">
              <LoginPage onLogin={() => setLoggedIn(true)} />
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
