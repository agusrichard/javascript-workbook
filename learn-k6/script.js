import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  duration: '5s',
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
  console.log(response.body)
  sleep(1)
}