import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';
const initialState = {
  notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state,action) => {
        // add a check -> paste already exists with same id or not
        const paste= action.payload;
        state.notes.push(paste);
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success("Note Created successfully")
     },
    updateToNotes: (state,action) => {
        const paste= action.payload;
        const index= state.notes.findIndex((item)=>item._id === paste._id);
        if(index>=0){
            state.notes[index]=paste;
            localStorage.setItem('notes', JSON.stringify(state.notes));
            toast.success("Note Updated successfully")
        }
     },
    resetAllPastes: (state, action) => {
        state.notes=[];
        localStorage.removeItem('notes');
     },
     removeFromNotes: (state, action) => {

      const pasteId= action.payload;

        const index=state.notes.findIndex((item)=>item._id===pasteId);
        if(index>=0){
            state.notes.splice(index,1);
            localStorage.setItem('notes', JSON.stringify(state.notes));
            toast.success("Note Deleted successfully")
        }
     }
  },
})

 export const { addToNotes, updateToNotes, resetAllPastes ,removeFromNotes} = notesSlice.actions

export default notesSlice.reducer