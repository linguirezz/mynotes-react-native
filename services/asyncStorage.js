import AsyncStorage from '@react-native-async-storage/async-storage';
async function storeData(key,value){
    try {
        const valueInString = JSON.stringify(value)
        const response = await AsyncStorage.setItem(key,valueInString);
        return response
    } catch (error) {
        console.error("terdapat error pada fungsi async storage pada fungsi storeData");
        console.error(error);

    }
}
async function getData(key){
    try {
        console.log("key")
       const response = await AsyncStorage.getItem(key);
        return response
    } catch (error) {
        console.error("terdapat error pada fungsi async storage pada fungsi getData");
        console.error(error);
    }
}
async function removeData(key){
    try {
        
        const response = await AsyncStorage.removeItem(key,()=>{
            console.log("data dengan key ",key," sudah berhasil terhapus");
        });
         return response
     } catch (error) {
         console.error("terdapat error pada fungsi async storage pada fungsi removeData");
         console.error(error);
     }
}
export {getData,storeData,removeData}