import VisualConfigurationActionTypes from './visual-configuration.types';

export const toggleVisualConfigurationPanelHidden = () => ({
    type: VisualConfigurationActionTypes.TOGGLE_VISUAL_CONFIGURATION_PANEL_HIDDEN,
    payload: null

});

export const setVisualConfigurationPanelHidden = () => ({
    type: VisualConfigurationActionTypes.SET_VISUAL_CONFIGURATION_PANEL_HIDDEN,
    payload: null

});

export const setVisualConfigurationPanelVisible = () => ({
    type: VisualConfigurationActionTypes.SET_VISUAL_CONFIGURATION_PANEL_VISIBLE,
    payload: null

});

export const setVisualConfiguration = (data) => ({
    type: VisualConfigurationActionTypes.SET_VISUAL_CONFIGURATION,
    payload: data

});







