// HomeScreen
import Header from '../components/dashboard/HomeScreen/Header';
import NotesGroup from '../components/dashboard/HomeScreen/NotesGroup';
import SearchBar from '../components/dashboard/HomeScreen/SearchBar'
import AddButton from '../components/dashboard/HomeScreen/elements/AddButton'
import LowerToolBar from '../components/dashboard/HomeScreen/elements/LowerToolBar'
import UpperToolBar from '../components/dashboard/HomeScreen/elements/UpperToolBar'
// NotesScreen
import NoteInput from '../components/dashboard/NotesScreen/NoteInput';
import ContentInput from '../components/dashboard/NotesScreen/elements/ContentInput';
import BackButton from '../components/dashboard/NotesScreen/elements/BackButton';
import TitleInput from '../components/dashboard/NotesScreen/elements/TitleInput';
import ToolBar from '../components/dashboard/NotesScreen/NoteToolBar';

const HomeScreenComponents = {
    Header,NotesGroup,SearchBar,AddButton,LowerToolBar,UpperToolBar
}
const NoteScreenComponents = {
    NoteInput,ContentInput,BackButton,TitleInput,ToolBar
}

export {
    HomeScreenComponents   ,
    NoteScreenComponents
}