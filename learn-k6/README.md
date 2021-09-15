# React Design Patterns

</br>

## List of Contents:
### 1. [K6 Getting Started](#content-1)
### 2. [Using k6 - HTTP Requests](#content-2)


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

### Results output
- k6 run has two different ways of showing the results of a load test. By default, we show an aggregated summary report at the end of the test. This report is customizable, but by default features a general overview of all groups, checks and thresholds in the load test, as well as aggregated values for all built-in and custom metrics used in the test run.
- When k6 displays the results to stdout, it will show the k6 logo and the following test information:
  - Test details: general test information and load options.
  - Progress bar: test status and how much time has passed.
  - Test summary: the test results (after test completion). Since k6 v0.30.0, it is possible to completely customize the output and redirect it to a file. It is also possible to save arbitrary files with machine-readable versions of the summary, like JSON, XML (e.g. JUnit, XUnit, etc.), or even nicely-formatted HTML reports meant for humans! For more details, see the handleSummary() docs.
- Test details
  - execution: local shows the k6 execution mode (local or cloud).
  - output: - is the output of the granular test results. By default, no output is used, only the aggregated end-of-test summary is shown.
  - script: path/to/script.js shows the name of the script file that is being executed
  - scenarios: ... is a summary of the scenarios that will be executed this test run and some overview information:
    - (100.00%) is the used execution segment
    - 50 max VUs tells us up to how many VUs (virtual users) will be used across all scenarios.
    - 5m30s max duration is the maximum time the script will take to run, including any graceful stop times.
  - * default: ... describes the only scenario for this test run. In this case it's a scenario with a ramping VUs executor, specified via the stages shortcut option instead of using the scenarios long-form option.

### End-of-test summary report
- The test summary provides a general overview of your test results. By default, the summary prints to stdout the status of all:
  - Aggregated values for the built-in metrics and custom metrics.
  - Checks and thresholds.
  - Groups and tags.
- As of k6 v0.30.0, it's possible to completely customize the summary shown to stdout, redirect it to a file or stderr, or build and export your own completely custom report (e.g. HTML, JSON, JUnit/XUnit XML, etc.) via the new handleSummary() callback.
- Output example:
  ```text
  data_received..............: 148 MB 2.5 MB/s
  data_sent..................: 1.0 MB 17 kB/s
  http_req_blocked...........: avg=1.92ms   min=1µs      med=5µs      max=288.73ms p(90)=11µs     p(95)=17µs
  http_req_connecting........: avg=1.01ms   min=0s       med=0s       max=166.44ms p(90)=0s       p(95)=0s
  http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
  http_req_receiving.........: avg=5.53ms   min=49µs     med=2.11ms   max=1.01s    p(90)=9.25ms   p(95)=11.8ms
  http_req_sending...........: avg=30.01µs  min=7µs      med=24µs     max=1.89ms   p(90)=48µs     p(95)=63µs
  http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
  http_req_waiting...........: avg=137.57ms min=111.44ms med=132.59ms max=589.4ms  p(90)=159.95ms p(95)=169.41ms
  http_reqs..................: 13491  224.848869/s
  iteration_duration.........: avg=445.48ms min=413.05ms med=436.36ms max=1.48s    p(90)=464.94ms p(95)=479.66ms
  iterations.................: 13410  223.498876/s
  vus........................: 100    min=100 max=100
  vus_max....................: 100    min=100 max=100
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---

## [Using k6 - HTTP Requests](https://k6.io/docs/using-k6/http-requests/) <span id="content-2"><span>

### Making HTTP Requests
- Get example:
  ```javascript
  import http from 'k6/http';

  export default function () {
    http.get('http://test.k6.io');
  }
  ```
- Post example:
  ```javascript
  import http from 'k6/http';

  export default function () {
    var url = 'http://test.k6.io/login';
    var payload = JSON.stringify({
      email: 'aaa',
      password: 'bbb',
    });

    var params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    http.post(url, payload, params);
  }
  ```

### Available methods
![Image 1](./images/image1.png)


### HTTP Request Tags
- k6 will automatically apply tags to your HTTP requests. These tags allow you to filter your results during analysis.
- List:
  ![Request tags](./images/image2.png)
- Result example:
  ```json
  {
    "type": "Point",
    "metric": "http_req_duration",
    "data": {
      "time": "2017-06-02T23:10:29.52444541+02:00",
      "value": 586.831127,
      "tags": {
        "expected_response": "true",
        "group": "",
        "method": "GET",
        "name": "http://test.k6.io",
        "scenario": "default",
        "status": "200",
        "url": "http://test.k6.io"
      }
    }
  }
  ```

### URL Grouping
- Example:
  ```javascript
  for (var id = 1; id <= 100; id++) {
    http.get(`http://example.com/posts/${id}`, {
      tags: { name: 'PostsItemURL' },
    });
  }

  // tags.name=\"PostsItemURL\",
  // tags.name=\"PostsItemURL\",
  ```
- JSON result:
  ```json
  {
      "type":"Point",
      "metric":"http_req_duration",
      "data": {
          "time":"2017-06-02T23:10:29.52444541+02:00",
          "value":586.831127,
          "tags": {
              "method":"GET",
              "name":"PostsItemURL",
              "status":"200",
              "url":"http://example.com/1"
          }
      }
  }

  // and

  {
      "type":"Point",
      "metric":"http_req_duration",
      "data": {
          "time":"2017-06-02T23:10:29.58582529+02:00",
          "value":580.839273,
          "tags": {
              "method":"GET",
              "name":"PostsItemURL",
              "status":"200",
              "url":"http://example.com/2"
          }
      }
  }

  ```
- Note how the name is the same for the two data samples related to two different URLs. Filtering the results on tag name: PostsItemURL will give you a result set including all the data points from all the 100 different URLs.


## References:
- https://k6.io/docs/getting-started/
- https://k6.io/docs/using-k6/http-requests/