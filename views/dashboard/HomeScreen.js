import React from 'react'
import { View} from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
import { useToolBar } from '../../contexts/toolBarContext';
import Style from '../../styles/dashboard/home/style'
import { HomeScreenComponents } from '../../utils/importUtils';
import NotesFolder from '../../components/dashboard/HomeScreen/notesFolderComponents/NotesFolder';
import CreateFolderMenu from '../../components/dashboard/HomeScreen/notesFolderComponents/CreateFolderMenu';
const {Header,NotesGroup,SearchBar,AddButton,LowerToolBar,UpperToolBar} = HomeScreenComponents
function HomeScreen() {
  const {toolBar}=useToolBar();
  return (
<>

  <CreateFolderMenu></CreateFolderMenu>
<View  style={Style.container}>      
          <ScrollView style={Style.scrollView}  >
           {/* HEAD */}
          {
           !toolBar.isVisible ?
           // header (not in select mode)
           <Header />
         :
         // menu in select mode (edit menu header)
          <UpperToolBar/>
          } 
          {/* BODY */}
           <View style={[{paddingHorizontal:30}]}>
           {/* search bar */}
            <SearchBar/> 
            {/* notes folder */}
            <NotesFolder/>
           {/* notes group section */}
            <NotesGroup/>
           </View>
       </ScrollView>
       {/* TAIL */}
       {
         toolBar.isVisible ?
         // edit menu
         <LowerToolBar/> 
         // add button 
          :
       <AddButton/>
       }
           </View>
           </>

  )
}

export default HomeScreen
 