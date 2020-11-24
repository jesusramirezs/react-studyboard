import CategoryDirectoryActionTypes from './category-directory.types';
import { firestore } from '../../firebase/firebase.utils';


export const setCurrentCategoryName = categoryName => ({
    type: CategoryDirectoryActionTypes.SET_CURRENT_CATEGORY_NAME,
    payload: categoryName
  
  });


