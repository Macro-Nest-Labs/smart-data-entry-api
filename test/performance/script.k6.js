import http from 'k6/http';

const K6_TARGET_ENDPOINT = __ENV.K6_TARGET_ENDPOINT || 'http://localhost:4000/graphql';

const headers = {
  'Content-Type': 'application/json',
};

// Include queries that are fired on the FE
import GET_RECEIPTS from './queries/get-receipts.js';

export const options = {
  discardResponseBodies: true,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  },
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 5,
      stages: [
        { duration: '3m', target: 20 },
        { duration: '10m', target: 20 },
        { duration: '1m', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
  },
  ext: {
    loadimpact: {
      projectID: __ENV.K6_CLOUD_PROJECT_ID || '3683605',
    },
  },
};

const batchPostFromJsonBodies = (url, headers, bodies) =>
  bodies.map((body) => ['POST', `${url}?q=${body.operationName}`, JSON.stringify(body), { headers }]);

export default function () {
  http.batch(batchPostFromJsonBodies(K6_TARGET_ENDPOINT, headers, [GET_RECEIPTS]));
}
