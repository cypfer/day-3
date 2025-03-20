import React from 'react';
import { IonButton, IonInput, IonLabel, IonContent, IonPage } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Virtuoso } from 'react-virtuoso';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

// LargeList Component
const LargeList = () => {
  const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

  return (
    <Virtuoso
      style={{ height: '400px', width: '300px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '10px' }}
      totalCount={items.length}
      itemContent={(index) => <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{items[index]}</div>}
    />
  );
};

// Geolocation Function
const getCurrentPosition = async () => {
  const position = await Geolocation.getCurrentPosition();
  console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
};

// Camera Function
const takePicture = async () => {
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    console.log('Photo URI:', photo.webPath); // Log the URI of the captured image
    alert(`Photo captured! URI: ${photo.webPath}`); // Optional: Show an alert with the photo URI
  } catch (error) {
    console.error('Error taking picture:', error);
    alert('Failed to capture photo. Please try again.'); // Handle errors
  }
};

// Zod Schema
const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
});

// Form Component
const ZodFormExample = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <IonPage>
      <IonContent
        style={{
          background: 'linear-gradient(135deg, #d1f2eb 0%, #a3e4d7 100%)', // Subtle green gradient
          minHeight: '100vh',
          padding: '20px',
          color: '#333',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center items horizontally
          justifyContent: 'center', // Center items vertically
        }}
      >
        {/* Form and Camera Button Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px', // Adds space between form and camera button
            marginBottom: '20px', // Adds space below the form and camera button
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <IonLabel style={{ color: '#333', fontWeight: 'bold' }}>Username</IonLabel>
              <IonInput
                {...register('username', { required: 'Your username is required' })}
                style={{ background: '#fff', borderRadius: '5px', padding: '10px', marginTop: '5px' }}
              />
              {errors.username && <p style={{ color: '#ff4d4d', marginTop: '5px' }}>{errors.username.message}</p>}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <IonLabel style={{ color: '#333', fontWeight: 'bold' }}>Email</IonLabel>
              <IonInput
                {...register('email', { required: 'Your email is required' })}
                style={{ background: '#fff', borderRadius: '5px', padding: '10px', marginTop: '5px' }}
              />
              {errors.email && <p style={{ color: '#ff4d4d', marginTop: '5px' }}>{errors.email.message}</p>}
            </div>
            <IonButton
              type="submit"
              style={{
                background: '#48c774', // Green color for the button
                borderRadius: '5px',
                padding: '10px 20px',
                fontWeight: 'bold',
                width: '100%',
              }}
            >
              Submit
            </IonButton>
          </form>

          {/* Camera Button */}
          <IonButton
            onClick={takePicture}
            style={{
              background: '#3ab67d', // Slightly darker green for the camera button
              borderRadius: '5px',
              padding: '10px 20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Open Camera
          </IonButton>
        </div>

        {/* LargeList Component */}
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <LargeList />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ZodFormExample;
// tough to commit 