import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../auth';

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useAuth();
  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin}>
          Log In
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
