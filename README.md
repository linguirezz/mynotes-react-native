version alpha 0.1.0 :
- read , edit ,write , and delete notes
- authentication 
todo :

- fitur pin (next update)
- forgot password (done)
- make the a loading screen and loading element 
- make the add button do not collide with keyboard
- make the content can be write
- add more information in your code to make it more readable (refactoring)
- rilis versi alpha 0.1.0


Langkah-langkah yang Dapat Dilakukan
Instal Paket yang Diperlukan: Pastikan semua dependensi yang diperlukan telah diinstal dengan benar. Jalankan perintah berikut untuk menginstal paket yang hilang:

bash
npm install @react-native-firebase/app
npm install @react-native-firebase/firestore
Perbarui File build.gradle: Pastikan compileSdkVersion telah ditetapkan dengan benar di build.gradle proyek Anda. Periksa file android/build.gradle atau android/app/build.gradle dan tambahkan compileSdkVersion jika belum ada.

Hapus Cache dan Build Ulang: Terkadang masalah build bisa disebabkan oleh cache yang rusak. Anda bisa mencoba membersihkan cache dan membangun ulang proyek:

bash
cd android
./gradlew clean
cd ..
npm run android
Periksa Versi Gradle dan Plugin: Pastikan versi Gradle dan plugin yang Anda gunakan kompatibel dengan proyek Anda. Perbarui gradle-wrapper.properties dan build.gradle jika perlu.

Run Gradle dengan Debugging: Jika masalah masih berlanjut, Anda bisa menjalankan Gradle dengan opsi --stacktrace, --info, atau --debug untuk mendapatkan informasi lebih detail tentang error:

bash
./gradlew :app:bundleRelease --stacktrace