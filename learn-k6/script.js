import http from 'k6/http'
import { sleep, check } from 'k6'
import { Counter, Rate, Trend } from 'k6/metrics'

const myTrend = new Trend('response_duration')
const myCounter = new Counter('response_counter')
const errorRate = new Rate('error_rate')


export const options = {
  duration: '5s',
  thresholds: {
    'error_rate': ['rate<0.1']
  }
}

export default function(){
  const url = 'http://192.168.100.17:8000/accounts/register/'
  const payload = JSON.stringify({
    'email': 'user1@example.com',
    'password': 'user1'
  })

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  const response = http.post(url, payload, params)
  const result = check(response, {
    'is status 200': r => {
      return r.status === 200
    },
    'is include correct body': r => {
      return r.body.includes('Hello')
    },
    'is exceed 5': r => {
      return r.timings.duration > 5
    }
  })
  console.log('response.timings.duration', response.timings.duration)
  myTrend.add(response.timings.duration)
  myCounter.add(1)
  errorRate.add(!result)
  sleep(1)
}