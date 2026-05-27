import { Camera } from 'expo-camera';

class UserPermissions {
    getCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            alert('We need permission to use your camera!');
        }
    };
}

export default new UserPermissions();
