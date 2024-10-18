import http from 'k6/http';
import { check, sleep } from 'k6';

const API_URL = "http://localhost:8080";

export const options = {
  scenarios: {
    convertTemperature: {  //Test Case 1
      executor: 'constant-vus',
      exec: 'convertTemperature',
      vus: 30,
      duration: '30s',
    }
  }
}

export function convertTemperature() {
  const value = 20;
  const unit = "CELSIUS";

  const data = { value: value, unit: unit };

  const response = http.post(`${API_URL}/v1/temperature/convert/FAHRENHEIT`, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(
    response, {"POST convert status code is 200": (r) => r.status == 200}
  );

  sleep(0.5);
}

