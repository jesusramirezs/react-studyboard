import { createSelector } from 'reselect';

const selectVisualConfiguration = state => state.visualConfigurationStorage; 



export const selectVisualConfigurationPanelHidden = createSelector(
    [selectVisualConfiguration],
    visualConfiguration => visualConfiguration.hidden

);



export const selectVisualConfigurationData = createSelector(
    [selectVisualConfiguration],
    visualConfiguration => visualConfiguration.currentConfiguration

);


