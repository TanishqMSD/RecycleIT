const VERCEL_API = 'https://api.vercel.com/v6';
const VERCEL_TOKEN = import.meta.env.VITE_VERCEL_ANALYTICS_TOKEN;
const PROJECT_ID = 'recycleit7';

export async function fetchAnalyticsData() {
  try {
    const response = await fetch(`${VERCEL_API}/deployments?project=${PROJECT_ID}`, {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`);
    }

    const data = await response.json();
    
    const deployments = data.deployments || [];
    const latestDeployment = deployments[0] || {};
    
    return {
      pageViews: latestDeployment.analytics?.totalViews || 0,
      uniqueVisitors: latestDeployment.analytics?.uniques || 0,
      avgSessionDuration: formatDuration(latestDeployment.analytics?.averageTime) || '0min',
      trafficData: processTrafficData(deployments) || [],
      demographics: latestDeployment.analytics?.geoStats || [],
      popularPages: processPopularPages(latestDeployment.analytics?.pages) || []
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      pageViews: 0,
      uniqueVisitors: 0,
      avgSessionDuration: '0min',
      trafficData: [],
      demographics: [],
      popularPages: []
    };
  }
}

function formatDuration(ms) {
  if (!ms) return '0min';
  const minutes = Math.floor(ms / 60000);
  return `${minutes}min`;
}

function processTrafficData(traffic) {
  if (!traffic) return [];
  return traffic.map(item => ({
    timestamp: new Date(item.timestamp).toISOString(),
    visits: item.visits
  }));
}

function processPopularPages(pages) {
  if (!pages) return [];
  return pages.map(page => ({
    name: page.path,
    percentage: Math.round((page.views / page.totalViews) * 100)
  }));
}