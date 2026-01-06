import express from 'express';
import { useStore } from '../lib/store';

const router = express.Router();

// Server-side API endpoint to fetch admin dashboard data
router.get('/dashboard-data', (req, res) => {
  try {
    // Get data from the centralized store
    const { visits, messages, frozenIps, showcaseItems, resources } = useStore.getState();
    
    res.json({
      visits,
      messages,
      frozenIps,
      showcaseItems,
      resources,
      totalVisits: visits.length,
      uniqueIPs: [...new Set(visits.map(v => v.ip))].length,
      neuralSyncs: messages.length,
      frozenNodes: frozenIps.length
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Server-side API endpoint to update visit status
router.patch('/visit/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Update visit status in the centralized store
    const { toggleVisitStatus } = useStore.getState();
    toggleVisitStatus(id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating visit status:', error);
    res.status(500).json({ error: 'Failed to update visit status' });
  }
});

// Server-side API endpoint to add showcase frame
router.post('/showcase', (req, res) => {
  try {
    const { title } = req.body;
    
    // Add new showcase frame to the centralized store
    const { addShowcaseFrame } = useStore.getState();
    const newItem = addShowcaseFrame('', title);
    
    res.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error adding showcase frame:', error);
    res.status(500).json({ error: 'Failed to add showcase frame' });
  }
});

// Server-side API endpoint to remove showcase frame
router.delete('/showcase/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Remove showcase frame from the centralized store
    const { removeShowcaseFrame } = useStore.getState();
    removeShowcaseFrame(id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing showcase frame:', error);
    res.status(500).json({ error: 'Failed to remove showcase frame' });
  }
});

// Server-side API endpoint to manage resources
router.post('/resources', (req, res) => {
  try {
    const { name, url, type, size } = req.body;
    
    // Add new resource to the centralized store
    const { addResource } = useStore.getState();
    const newResource = addResource({
      name,
      url,
      type,
      size
    });
    
    res.json({ success: true, resource: newResource });
  } catch (error) {
    console.error('Error adding resource:', error);
    res.status(500).json({ error: 'Failed to add resource' });
  }
});

router.delete('/resources/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Remove resource from the centralized store
    const { removeResource } = useStore.getState();
    removeResource(id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing resource:', error);
    res.status(500).json({ error: 'Failed to remove resource' });
  }
});

export default router;