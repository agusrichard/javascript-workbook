# React Design Patterns

</br>

## List of Contents:
### 1. [K6 Getting Started](#content-1)


</br>

---

## Contents

## [K6 Getting Started](https://k6.io/docs/getting-started/) <span id="content-1"><span>

### Installation
- Using docker:
  ```shell
  docker pull loadimpact/k6
  ```

### Running k6
- First example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export default function () {
    http.get('https://test.k6.io');
    sleep(1);
  }
  ```
- Run:
  ```shell
  # CLI
  k6 run script.js

  # Docker
  docker run -i loadimpact/k6 run - <script.js
  ```
- Run with more than 1 virtual users and longer duration:
  ```shell
  # CLI
  k6 run --vus 10 --duration 30s script.js

  # Docker
  docker run -i loadimpact/k6 run --vus 10 --duration 30s - <script.js
  ```
- k6 works with the concept of virtual users (VUs), which run scripts - they're essentially glorified, parallel while(true) loops.
- Scripts must contain, at the very least, a default function - this defines the entry point for your VUs,
- Code inside default is called "VU code", and is run over and over for as long as the test is running.
- Code outside of it is called "init code", and is run only once per VU.
  ```javascript
  // init code

  export default function() {
    // vu code
  }
  ```
- VU code can make HTTP requests, emit metrics, and generally do everything you'd expect a load test to do - with a few important exceptions: you can't load anything from your local filesystem, or import any other modules. This all has to be done from init-code.
- If you want to avoid having to type --vus 10 and --duration 30s all the time, you can include those settings inside your JavaScript file also:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';
  export let options = {
    vus: 10,
    duration: '30s',
  };
  export default function () {
    http.get('http://test.k6.io');
    sleep(1);
  }
  ```
- You can also have the VU level ramp up and down during the test. The options.stages property allows you to configure ramping behaviour.
  ```javascript
  import http from 'k6/http';
  import { check, sleep } from 'k6';

  export let options = {
    stages: [
      { duration: '30s', target: 20 },
      { duration: '1m30s', target: 10 },
      { duration: '20s', target: 0 },
    ],
  };

  export default function () {
    let res = http.get('https://httpbin.org/');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
  }
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---

## References:
- https://k6.io/docs/getting-started/