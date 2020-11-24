import VisualConfigurationActionTypes from './visual-configuration.types';

const INITIAL_STATE = {
    hidden: true,
    currentConfiguration: {font:'avenir', font_size:'f4'}
    
}

const visualConfigurationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case VisualConfigurationActionTypes.TOGGLE_VISUAL_CONFIGURATION_PANEL_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };

        case VisualConfigurationActionTypes.SET_VISUAL_CONFIGURATION_PANEL_HIDDEN:
            return {
                ...state,
                hidden: true
            };

        case VisualConfigurationActionTypes.SET_VISUAL_CONFIGURATION_PANEL_VISIBLE:
            return {
                ...state,
                hidden: false
            };

        case VisualConfigurationActionTypes.SET_VISUAL_CONFIGURATION:
            return {
                ...state,
                currentConfiguration: action.payload
                    
            };            

    
        default:
            return state;
    }


}

export default visualConfigurationReducer;