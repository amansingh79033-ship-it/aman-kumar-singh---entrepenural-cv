// Frontend API client for admin functionality
// This file provides functions to interact with the Zustand store
import { useStore } from '../../lib/store';

// API client functions to interact with the Zustand store

// Fetch admin dashboard data
export const fetchDashboardData = async () => {
  try {
    const state = useStore.getState();
    return {
      visits: state.visits,
      messages: state.messages,
      frozenIps: state.frozenIps,
      showcaseItems: state.showcaseItems,
      resources: state.resources,
      totalVisits: state.visits.length,
      uniqueIPs: new Set(state.visits.map(v => v.ip)).size,
      neuralSyncs: state.messages.length,
      frozenNodes: state.frozenIps.length
    };
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
};

// Update visit status
export const updateVisitStatus = async (visitId: string, status: 'active' | 'frozen') => {
  try {
    const state = useStore.getState();
    const visit = state.visits.find(v => v.id === visitId);
    
    if (!visit) {
      throw new Error('Visit not found');
    }
    
    // Toggle the visit status using the store function
    state.toggleVisitStatus(visitId);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating visit status:', error);
    throw new Error('Failed to update visit status');
  }
};

// Add showcase frame
export const addShowcaseFrame = async (title: string) => {
  try {
    const state = useStore.getState();
    
    // Add new showcase frame using the store function
    state.addShowcaseFrame('', title);
    
    // Find the newly added item to return it
    const newItem = state.showcaseItems[state.showcaseItems.length - 1];
    
    return { success: true, item: newItem };
  } catch (error) {
    console.error('Error adding showcase frame:', error);
    throw new Error('Failed to add showcase frame');
  }
};

// Remove showcase frame
export const removeShowcaseFrame = async (id: string) => {
  try {
    const state = useStore.getState();
    
    // Remove showcase frame using the store function
    state.removeShowcaseFrame(id);
    
    return { success: true };
  } catch (error) {
    console.error('Error removing showcase frame:', error);
    throw new Error('Failed to remove showcase frame');
  }
};

// Add resource
export const addResource = async (resourceData: { name: string, url: string, type: 'video' | 'image' | 'pdf' | 'archive' | 'other', size: number }) => {
  try {
    const state = useStore.getState();
    
    // Add new resource using the store function
    state.addResource(resourceData);
    
    // Find the newly added resource to return it
    const newResource = state.resources[0]; // Added at the beginning of the array
    
    return { success: true, resource: newResource };
  } catch (error) {
    console.error('Error adding resource:', error);
    throw new Error('Failed to add resource');
  }
};

// Remove resource
export const removeResource = async (id: string) => {
  try {
    const state = useStore.getState();
    
    // Remove resource using the store function
    state.removeResource(id);
    
    return { success: true };
  } catch (error) {
    console.error('Error removing resource:', error);
    throw new Error('Failed to remove resource');
  }
};
