import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const useGoogleSignIn = () => {
    // TODO : pindahkan ke file env
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '339796359819-gdbn6ps61u31qcfokmib2pfkrvc9mdk6.apps.googleusercontent.com',
    iosClientId: '339796359819-qo55t1lo8tbi6996h7ses2a5bm88fj8t.apps.googleusercontent.com',
    webClientId: '339796359819-b8i40e8djvlabku9kn41t7sje36mqv9a.apps.googleusercontent.com',
  });

  const signInWithGoogle = async () => {
    try {
      // Memulai proses sign-in dengan Google
      const result = await promptAsync();
      if (result?.type === 'success') {
        const { authentication } = result;

        // Simpan token ke AsyncStorage (opsional)
        await AsyncStorage.setItem('google-auth-token', authentication.accessToken);

        // Ambil informasi pengguna dari Google API
        const userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${authentication.accessToken}` },
        }).then((res) => res.json());

        return userInfo; // Mengembalikan informasi pengguna
      } else {
        throw new Error('Google Sign-In was canceled or failed.');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error; // Melempar error agar bisa ditangani di komponen pemanggil
    }
  };

  return { signInWithGoogle, isReady: !!request };
};

export default useGoogleSignIn;