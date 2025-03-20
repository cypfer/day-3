import { 
  IonApp, IonContent, IonHeader, IonInput, IonLabel, IonPage, 
  IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, 
  IonRouterOutlet, IonButton, IonAlert, IonIcon
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useState } from 'react';
import { home, person } from 'ionicons/icons';

// ✅ Home Page Component (Fixed Text Visibility)
const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Day 3 Assignment</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding" style={{
      background: 'linear-gradient(to bottom, #8E44AD, #5E3370)', // Purple Gradient
      textAlign: 'center',
      color: '#fff' // Ensure text is visible
    }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '20px' }}>HOME PAGE</h2>
      <p style={{ fontSize: '18px' }}>
        Welcome to your Ionic Application! <br />
        This is a starter project. <br />
        <strong>GAI Academy Mobile Development Bootcamp</strong>
      </p>
    </IonContent>
  </IonPage>
);

// ✅ Form Page Component
const Form: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    if (!fullName || !email) {
      setError('All fields are required');
    } else {
      setError('');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Day 3 Assignment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ background: 'linear-gradient(to bottom,rgb(250, 245, 252),rgb(231, 224, 234))' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', color: '#fff' }}>FORM PAGE</h2>

        {/* ✅ Form Box with Dark Theme */}
        <div style={{ 
          background: '#000', padding: '20px', borderRadius: '10px', 
          color: '#fff', maxWidth: '400px', margin: '0 auto' 
        }}>
          <IonLabel>Full Name</IonLabel>
          <IonInput value={fullName} onIonChange={(e) => setFullName(e.detail.value!)} style={{ color: '#fff' }} />

          <IonLabel>Email Address</IonLabel>
          <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} style={{ color: '#fff' }} />
        </div>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <IonButton expand="full" onClick={handleSubmit} style={{ marginTop: '10px', background: '#4c82fb' }}>Submit</IonButton>
        
        {/* ✅ Success Alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Form Status"}
          message={"Form submitted successfully!"}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

// ✅ Main App Component with Routing
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact />
          <Route path="/form" component={Form} exact />
          <Redirect from="/" to="/home" exact />
        </IonRouterOutlet>

        {/* ✅ Tab Bar */}
        <IonTabBar slot="bottom" style={{ background: '#000', color: '#fff' }}>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="form" href="/form">
            <IonIcon icon={person} />
            <IonLabel>Form</IonLabel>
          </IonTabButton>
        </IonTabBar>

        {/* ✅ Footer */}
        <div style={{ textAlign: 'center', padding: '10px', background: '#000', color: '#fff' }}>
        
        </div>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;