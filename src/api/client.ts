const baseUrl = process.env.REACT_APP_BASE_URL;

function apiCall(method: string, url: string, data?: any, headers?: any) {
  const finalUrl = url.startsWith('http') ? url : baseUrl + url;
  return fetch(finalUrl, {
    body: JSON.stringify(data),
    method,
    headers,
  });
}

export async function post(url: string, data: any) {
  const response = await apiCall('POST', url, data, {
    'Content-Type': 'application/json',
  });
  return await response.json();
}

export async function get(url: string, data: any) {
  const query = [];
  for (const c of Object.keys(data)) {
    query.push(
      encodeURIComponent(c) + '=' +
      encodeURIComponent(JSON.stringify(data[c]))
    );
  }
  if (query.length) {
    url += '?' + query.join('&');
  }
  const response = await apiCall('GET', url);
  return await response.json();
}