import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  Capacitor,
  CameraResultType,
  CameraSource,
  Plugins,
} from '@capacitor/core';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from '../firebase';
const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('Storage picture URL', url);
  return url;
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(
    () => () => {
      if (pictureUrl.startsWith('blob')) {
        URL.revokeObjectURL(pictureUrl);
      }
      // return () => {

      // }
    },
    [pictureUrl]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
    }
  };

  const handlePictureClick = async () => {
    if (Capacitor.isNative) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600,
        });
        console.log('photo', photo.webPath);
        setPictureUrl(photo.webPath);
      } catch (error) {
        console.log('Camera error', error);
      }
    } else {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    const entryData = { date, title, pictureUrl, description };
    if (!pictureUrl.startsWith('/assets')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log('saved', entryRef.id);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={(event) => setDate(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img
              src={pictureUrl}
              alt="placeholder"
              style={{ cursor: 'pointer' }}
              // onClick={() => fileInputRef.current.click()}
              onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
