# React Design Patterns

</br>

## List of Contents:
### 1. [K6 Getting Started](#content-1)
### 2. [Using k6 - HTTP Requests](#content-2)
### 3. [Using k6 - Metrics](#content-3)
### 4. [Using k6 - Checks](#content-4)
### 5. [Using k6 - Thresholds](#content-5)
### 6. [Using k6 - Options](#content-6)
### 7. [Using k6 - Test life cycle](#content-7)
### 8. [Using k6 - Modules](#content-8)
### 9. [Using k6 - Tags and Groups](#content-9)
### 10. [Using k6 - Environment variables](#content-10)
### 11. [Using k6 - Execution context variables](#content-11)


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


**[⬆ back to top](#list-of-contents)**

</br>

---


## [Using k6 - Metrics](https://k6.io/docs/using-k6/metrics/) <span id="content-3"><span>


### Built-in metrics
- The following built-in metrics will always be collected by k6:
  ![Built in metrics](./images/image3.png)


### HTTP-specific built-in metrics
- built-in metrics will only be generated when/if HTTP requests are made:
  ![Http](./images/image4.png)
- Accessing HTTP timings from a script:
  ```javascript
  import http from 'k6/http';
  export default function () {
    var res = http.get('http://httpbin.org');
    console.log('Response time was ' + String(res.timings.duration) + ' ms');
  }
  ```
- Response object:
  ![response object](./images/image5.png)


### Custom metrics
- Example:
  ```javascript
  import http from 'k6/http';
  import { Trend } from 'k6/metrics';

  let myTrend = new Trend('waiting_time');

  export default function () {
    let r = http.get('https://httpbin.org');
    myTrend.add(r.timings.waiting);
    console.log(myTrend.name);  // waiting_time
  }
  ```

### Metric types
- All metrics (both the built-in ones and the custom ones) have a type. The four different metric types in k6 are:
  ![Metrics types](./images/image6.png)
- Counter (cumulative metric)
  ```javascript
  import { Counter } from 'k6/metrics';

  let myCounter = new Counter('my_counter');

  export default function () {
    myCounter.add(1);
    myCounter.add(2);
  }
  ```

### Gauge (keep the latest value only)
- Example:
  ```javascript
  import { Gauge } from 'k6/metrics';

  let myGauge = new Gauge('my_gauge');

  export default function () {
    myGauge.add(3);
    myGauge.add(1);
    myGauge.add(2);
  }
  ```
- The value of my_gauge will be 2 at the end of the test. As with the Counter metric above, a Gauge with value zero (0) will NOT be printed to the stdout summary at the end of the test.

### Trend (collect trend statistics (min/max/avg/percentiles) for a series of values)
- Example:
  ```javascript
  import { Trend } from 'k6/metrics';

  let myTrend = new Trend('my_trend');

  export default function () {
    myTrend.add(1);
    myTrend.add(2);
  }
  ```
- A trend metric is a container that holds a set of sample values, and which we can ask to output statistics (min, max, average, median or percentiles) about those samples. By default, k6 will print average, min, max, median, 90th percentile, and 95th percentile.


### Rate (keeps track of the percentage of values in a series that are non-zero)
- Example:
  ```javascript
  import { Rate } from 'k6/metrics';

  let myRate = new Rate('my_rate');

  export default function () {
    myRate.add(true);
    myRate.add(false);
    myRate.add(1);
    myRate.add(0);
  }
  ```
- The value of my_rate at the end of the test will be 50%, indicating that half of the values added to the metric were non-zero.


**[⬆ back to top](#list-of-contents)**

</br>

---

## [Using k6 - Checks](https://k6.io/docs/using-k6/checks/) <span id="content-4"><span>

### What is a check?
- Checks are like asserts but differ in that they don't halt the execution, instead, they just store the result of the check, pass or fail, and let the script execution continue.
- Checks are great for codifying assertions relating to HTTP requests/responses, making sure the response code is 2xx for example:
  ```javascript
  import { check } from 'k6';
  import http from 'k6/http';

  export default function () {
    let res = http.get('http://test.k6.io/');
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  }
  ```
- In the above example, one check was specified but you can add as many as you need in a call to check().
- Multiple checks:
  ```javascript
  import { check } from 'k6';
  import http from 'k6/http';

  export default function () {
    let res = http.get('http://test.k6.io/');
    check(res, {
      'is status 200': (r) => r.status === 200,
      'body size is 1176 bytes': (r) => r.body.length == 1176,
    });
  }
  ```

### Using checks in a CI setting
- One important thing to understand regarding checks is that a failed check will not fail the whole load test.
- Checks help to keep your code organized and easy to read, but when you're running a load test in a CI test suite you may want to check for error conditions that fail the whole load test. In this case you may want to combine checks with thresholds to get what you want:
  ```javascript
  import http from 'k6/http';
  import { check } from 'k6';
  import { Rate } from 'k6/metrics';

  export let errorRate = new Rate('errors');
  export let options = {
    thresholds: {
      errors: ['rate<0.1'], // <10% errors
    },
  };

  export default function () {
    const res = http.get('http://httpbin.org');
    const result = check(res, {
      'status is 200': (r) => r.status == 200,
    });

    errorRate.add(!result);
  }
  ```
- The above script declares a custom Rate metric (called "errors") to hold information about the errors we have seen during the test, then it uses a threshold on that custom metric to fail the test when it encounters too many errors.


**[⬆ back to top](#list-of-contents)**

</br>

---


## [Using k6 - Thresholds](https://k6.io/docs/using-k6/thresholds/) <span id="content-5"><span>

### What are thresholds?
- Thresholds are a pass/fail criteria used to specify the performance expectations of the system under test.
- Thresholds analyze the performance metrics and determine the final test result (pass/fail). Thresholds are a essential for load-testing automation.
- Here is a sample script that specifies two thresholds, one evaluating the rate of http errors (http_req_failed metric) and one using the 95 percentile of all the response durations (the http_req_duration metric)
  ```javascript
  import http from 'k6/http';

  export let options = {
    thresholds: {
      http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 
      http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
  };

  export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
  }
  ```
- In other words, you specify the pass criteria when defining your threshold, and if that expression evaluates to false at the end of the test, the whole test will be considered a fail.
- In the above case, the criteria for both thresholds were met. The whole load test is considered to be a pass, which means that k6 will exit with exit code zero.
- If any of the thresholds had failed, the little green checkmark ✓ next to the threshold name (http_req_failed, http_req_duration) would have been a red cross ✗ instead, and k6 would have generated a non-zero exit code.

### Copy-paste Threshold examples
- Example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export let options = {
    thresholds: {
      // 90% of requests must finish within 400ms.
      http_req_duration: ['p(90) < 400'],
    },
  };

  export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
    sleep(1);
  }
  ```
- - Example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export let options = {
    thresholds: {
      // During the whole test execution, the error rate must be lower than 1%.
      // `http_req_failed` metric is available since v0.31.0
      http_req_failed: ['rate<0.01'],
    },
  };

  export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
    sleep(1);
  }
  ```
- Multiple threshold example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export let options = {
    thresholds: {
      // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
      http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
    },
  };

  export default function () {
    let res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
    sleep(1);
  }
  ```
- Threshold on group durations:
  ```javascript
  import http from 'k6/http';
  import { group, sleep } from 'k6';

  export let options = {
    thresholds: {
      'group_duration{group:::individualRequests}': ['avg < 200'],
      'group_duration{group:::batchRequests}': ['avg < 200'],
    },
    vus: 1,
    duration: '10s',
  };

  export default function () {
    group('individualRequests', function () {
      http.get('https://test-api.k6.io/public/crocodiles/1/');
      http.get('https://test-api.k6.io/public/crocodiles/2/');
      http.get('https://test-api.k6.io/public/crocodiles/3/');
    });

    group('batchRequests', function () {
      http.batch([
        ['GET', `https://test-api.k6.io/public/crocodiles/1/`],
        ['GET', `https://test-api.k6.io/public/crocodiles/2/`],
        ['GET', `https://test-api.k6.io/public/crocodiles/3/`],
      ]);
    });

    sleep(1);
  }
  ```

### Threshold Syntax
- Format:
  ```javascript
  export let options = {
    thresholds: {
      metric_name1: [ 'threshold_expression', ... ], // short format
      metric_name1: [ { threshold: 'threshold_expression', abortOnFail: boolean, delayAbortEval: string }, ], // full format
    }
  };
  ```
- The above declaration inside a k6 script means that there will be a threshold configured for the metric metric_name1. To determine if the threshold has failed or passed, the string 'threshold_expression' will be evaluated. The 'threshold_expression' must follow the following format: aggregation_method operator value
- Examples:
  - avg < 200 // average duration can't be larger than 200ms
  - count >= 500 // count must be larger or equal to 500
  - p(90) < 300 // 90% of samples must be below 300
- Threshold expression:
  ![Threshold expression](./images/image7.png)
- sample script:
  ```javascript
  import http from 'k6/http';
  import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
  import { sleep } from 'k6';

  export let TrendRTT = new Trend('RTT');
  export let RateContentOK = new Rate('Content OK');
  export let GaugeContentSize = new Gauge('ContentSize');
  export let CounterErrors = new Counter('Errors');
  export let options = {
    thresholds: {
      RTT: ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
      'Content OK': ['rate>0.95'],
      ContentSize: ['value<4000'],
      Errors: ['count<100'],
    },
  };

  export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    let contentOK = res.json('name') === 'Bert';

    TrendRTT.add(res.timings.duration);
    RateContentOK.add(contentOK);
    GaugeContentSize.add(res.body.length);
    CounterErrors.add(!contentOK);

    sleep(1);
  }
  ```

### Thresholds on tags
- It's often useful to specify thresholds only on a single URL or a specific tag. In k6, tagged requests create sub-metrics that can be used in thresholds as shown below.
- Example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';
  import { Rate } from 'k6/metrics';

  export let options = {
    thresholds: {
      'http_req_duration{type:API}': ['p(95)<500'], // threshold on API requests only
      'http_req_duration{type:staticContent}': ['p(95)<200'], // threshold on static content only
    },
  };

  export default function () {
    let res1 = http.get('https://test-api.k6.io/public/crocodiles/1/', {
      tags: { type: 'API' },
    });
    let res2 = http.get('https://test-api.k6.io/public/crocodiles/2/', {
      tags: { type: 'API' },
    });

    let responses = http.batch([
      [
        'GET',
        'https://test-api.k6.io/static/favicon.ico',
        null,
        { tags: { type: 'staticContent' } },
      ],
      [
        'GET',
        'https://test-api.k6.io/static/css/site.css',
        null,
        { tags: { type: 'staticContent' } },
      ],
    ]);

    sleep(1);
  }
  ```

### Aborting a test when a threshold is crossed
- If you want to abort a test as soon as a threshold is crossed, before the test has completed, there's an extended threshold specification format that looks like this:
- Example:
  ```javascript
  import http from 'k6/http';

  export let options = {
    vus: 30,
    duration: '2m',
    thresholds: {
      http_req_duration: [{threshold: 'p(99) < 10', abortOnFail: true}]
    },
  };

  export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
  }
  ```
- Fields for threshold:
  ![Threhold's fields](./images/image8.png)

### Failing a load test using checks
- Checks are nice for codifying assertions, but unlike thresholds, checks will not affect the exit status of k6.
- If you only use checks to verify that things work as expected, you will not be able to fail the whole test run based on the results of those checks.
- It can often be useful to combine checks and thresholds, to get the best of both:
  ```javascript
  import http from 'k6/http';
  import { check, sleep } from 'k6';

  export let options = {
    vus: 50,
    duration: '10s',
    thresholds: {
      // the rate of successful checks should be higher than 90%
      checks: ['rate>0.9'],
    },
  };

  export default function () {
    const res = http.get('http://httpbin.org');

    check(res, {
      'status is 500': (r) => r.status == 500,
    });

    sleep(1);
  }
  ```
- Full example:
  ```javascript
  import http from 'k6/http';
  import { check, sleep } from 'k6';

  export let options = {
    vus: 50,
    duration: '10s',
    thresholds: {
      'checks{myTag:hola}': ['rate>0.9'],
    },
  };

  export default function () {
    let res;

    res = http.get('http://httpbin.org');
    check(res, {
      'status is 500': (r) => r.status == 500,
    });

    res = http.get('http://httpbin.org');
    check(
      res,
      {
        'status is 200': (r) => r.status == 200,
      },
      { myTag: 'hola' },
    );

    sleep(1);
  }
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---

## [Using k6 - Options](https://k6.io/docs/using-k6/options/) <span id="content-6"><span>

### List of options:
- There are a lot of options. You can refer to the main documentation

### Using Options
- Options can be a part of the script code so that they can be version controlled. They can also be specified with command-line flags, environment variables or via a config file. The order of precedence is as follows:
- Options from each level will overwrite the options from the next level, with the command-line flags having the highest precedence.
- Example:
  ```javascript
  import http from 'k6/http';

  export let options = {
    hosts: { 'test.k6.io': '1.2.3.4' },
    stages: [
      { duration: '1m', target: 10 },
      { duration: '1m', target: 20 },
      { duration: '1m', target: 0 },
    ],
    thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
    noConnectionReuse: true,
    userAgent: 'MyK6UserAgentString/1.0',
  };

  export default function () {
    http.get('http://test.k6.io/');
  }
  ```

You can access the rest on the documentation.


## [Using k6 - Test life cycle](https://k6.io/docs/using-k6/test-life-cycle/) <span id="content-7"><span>

### Intro
- The four distinct life cycle stages in a k6 test are "init", "setup", "VU" and "teardown" Throughout the documentation, you will also see us referring to it as "init code", "VU code" etc.
- Example:
  ```javascript
  // 1. init code

  export function setup() {
    // 2. setup code
  }

  export default function (data) {
    // 3. VU code
  }

  export function teardown(data) {
    // 4. teardown code
  }
  ```

### Init and VU stages
- Scripts must contain, at the very least, a default function - this defines the entry point for your VUs, similar to the main() function in many other languages:
  ```javascript
  export default function () {
    // do things here...
  }
  ```
- Code inside default is called "VU code", and is run over and over for as long as the test is running. Code outside of it is called "init code", and is run only once per VU.
- VU code can make HTTP requests, emit metrics, and generally do everything you'd expect a load test to do - with a few important exceptions: you can't load anything from your local filesystem, or import any other modules. This all has to be done from the init code.
- As an added bonus, you can use this to reuse data between iterations (but only for the same VU):
  ```javascript
  var counter = 0;

  export default function () {
    counter++;
  }
  ```

### The default function life-cycle
- A VU will execute the default function from start to end in sequence. Nothing out of the ordinary so far, but here's the important part; once the VU reaches the end of the default function it will loop back to the start and execute the code all over.
- As part of this "restart" process, the VU is reset. Cookies are cleared and TCP connections might be torn down, depending on your test configuration options.
- Make sure to use sleep() statements to pace your VUs properly. An appropriate amount of sleep/think time at the end of the default function is often needed to properly simulate a user reading content on a page. If you don't have a sleep() statement at the end of the default function your VU might be more "aggressive" than you've planned.

### Setup and teardown stages
- Beyond the required init and VU stages, which is code run for each VU, k6 also supports test-wide setup and teardown stages, like many other testing frameworks and tools.
- The setup and teardown functions, like the default function, needs to be exported functions
- But unlike the default function setup and teardown are only called once for a test. setup is called at the beginning of the test, after the init stage but before the VU stage (default function), and teardown is called at the end of a test, after the VU stage (default function).
- You might have noticed the function signature of the default function and teardown function takes an argument, which we here refer to as data.
- This data will be whatever is returned in the setup function, so a mechanism for passing data from the setup stage to the subsequent VU and teardown stages.
- To support all of those modes, only data (i.e. JSON) can be passed between setup() and the other stages, any passed functions will be stripped.
- Example:
  ```javascript
  export function setup() {
    return { v: 1 };
  }

  export default function (data) {
    console.log(JSON.stringify(data));
  }

  export function teardown(data) {
    if (data.v != 1) {
      throw new Error('incorrect data: ' + JSON.stringify(data));
    }
  }
  ```
- A big difference between the init stage and setup/teardown stages is that you have the full k6 API available in the latter, you can for example make HTTP requests in the setup and teardown stages:
  ```javascript
  export function setup() {
    let res = http.get('https://httpbin.org/get');
    return { data: res.json() };
  }

  export function teardown(data) {
    console.log(JSON.stringify(data));
  }

  export default function (data) {
    console.log(JSON.stringify(data));
  }
  ```
- Note that any requests made in the setup and teardown stages will be counted in the end-of-test summary. Those requests will be tagged appropriately with the ::setup and ::teardown values for the group metric tag, so that you can filter them in JSON output or InfluxDB.


**[⬆ back to top](#list-of-contents)**

</br>

---

## [Using k6 - Modules](https://k6.io/docs/using-k6/modules/) <span id="content-8"><span>

### Importing modules
- In k6, it is possible to import three different kinds of modules:
  - Built-in modules
  - Local filesystem modules
  - Remote HTTP(S) modules
- Built-in modules:
  ```javascript
  import http from 'k6/http';
  ```
- Local filesystem modules:
  - These modules are stored on the local filesystem, and accessed either through relative or absolute filesystem paths
  - Example:
    ```javascript
    //helpers.js
    export function someHelper() {
      ...
    }
    ```
    ```javascript
    //my-test.js
    import { someHelper } from './helpers.js';

    export default function () {
      someHelper();
    }
    ```
- Remote HTTP(S) modules
  - The imported modules will be downloaded and executed at runtime, making it extremely important to make sure the code is legit and trusted before including it in a test script.
  - Example:
    ```javascript
    import { randomItem } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

    export default function () {
      randomItem();
    }
    ```

### Bundling node modules
- k6 is not NodeJS, nor is it a browser. Packages that rely on APIs provided by NodeJS, for instance the os and fs modules, will not work in k6. The same goes for browser-specific APIs like the window object.
- In a javascript project running NodeJS, modules are imported using either import or require(), using the node module resolution algorithm. This means that the developer can import modules by name, without providing the full filesystem path to the module. For instance:
  ```javascript
  import { ClassInAModule } from 'cool-module';
  ```
- Due to its flexibility, ease of use, relatively low resource consumption, and known compatibility with k6, it is recommended to use webpack unless you have a specific reason to choose something else.
- In general, all external modules added to a test project have a negative impact on performance, as they further increase the memory footprint and CPU usage.
- Usually, this is not a big problem as each application only allocates these resources once. In k6, however, every VU has a separate javascript virtual machine, duplicating the resource usage once each.

### Setting up the bundler
- Initializing project
  ```shell
  mkdir ./example-project && \
      cd "$_" && \
      npm init -y
  ```
- Installing
  ```shell
  npm install --save-dev \
      webpack \
      webpack-cli \
      k6 \
      babel-loader \
      @babel/core \
      @babel/preset-env \
      core-js
  ```
- Configuring webpack:
  ```javascript
  const path = require('path');

  module.exports = {
    mode: 'production',
    entry: {
      login: './src/login.test.js',
      signup: './src/signup.test.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs',
      filename: '[name].bundle.js',
    },
    module: {
      rules: [{ test: /\.js$/, use: 'babel-loader' }],
    },
    target: 'web',
    externals: /k6(\/.*)?/,
  };
  ```
- Mode:
  - Tells Webpack to automatically use the optimizations associated with the mode.
- Entry
  - The files Webpack will use as its entry points while performing the bundling. From these points, Webpack will automatically traverse all imports recursively until every possible dependency path has been exhausted. For instance:
  - Example:
    ```javascript
    // login.test.js

    import { SomeService } from './some.service.js';

    const svc = new SomeService();
    ```
    ```javascript
    // some.service.js

    import * as lodash from 'lodash';

    export class SomeService {
      constructor() {
        this._ = lodash;
      }
    }
    ```
  - would result in Webpack bundling login.test.js, some.service.js and all upstream dependencies utilized by lodash
- Output
  - The path key takes an absolute path which is where the finished bundle will be placed. 
- Adding a bundle command inside package.json:
  ```json
  {
    "name": "bundling-example",
    "description": "",
    "version": "0.1.0",
    "private": true,
    "scripts": {
  +    "bundle": "webpack"
    }
    ...
  }
  ```
- Running the bunling:
  ```shell
  npm run bundle
  # ...
  tree dist

  dist
  ├── login.bundle.js
  └── signup.bundle.js

  0 directories, 2 files
  ```
- Running the test:
  ```shell
  npm run bundle
  # ...
  k6 run dist/login.bundle.js
  # ...
  ```
  ```shell
  npm run bundle
  # ...
  k6 run dist/signup.bundle.js \
      --vus 10 \
      --duration 10s
  # ...
  ```
  
### Using local modules with Docker
- When running k6 in a Docker container you must make sure to mount the necessary folders from the host into the container, using Docker volumes, so that k6 can see all the JS modules it needs to import.
- For example, say you have the following structure on your host machine:
  - `/home/k6/example/src/index.js`
  - `/home/k6/example/src/modules/module.js`
- Example:
  ```javascript
  import { hello_world } from './modules/module.js';

  export default function () {
    hello_world();
  }
  ```
  ```javascript
  export function hello_world() {
    console.log('Hello world');
  }
  ```

**[⬆ back to top](#list-of-contents)**

</br>

---

## [Using k6 - Tags and Groups](https://k6.io/docs/using-k6/tags-and-groups/) <span id="content-9"><span>

### Introduction
- The analysis of your load results is a required step to find performance issues; a load test usually targets a service involving different subsystems and resources, making it hard to find the issue/s degrading your performance.
- k6 provides two scripting APIs to help you during the analysis and easily visualize, sort and filter your test results.
  - Groups: organize your load script around common logic.
  - Tags: categorize your checks, thresholds, custom metrics and requests with tags for in-depth filtering.

### Groups
- Groups are optional, and it allows you to “group” a large load script to help you with the test result analysis. Groups can be nested, allowing you the BDD-style of testing.
- This makes all metrics emitted in a group to have the tag group with a value of all group names wrapping it separated by '::' (two colons).
- Example:
  ```javascript
  import { group } from 'k6';

  export default function () {

    group('visit product listing page', function () {
      // ...
    });
    group('add several products to the shopping cart', function () {
      // ...
    });
    group('visit login page', function () {
      // ...
    });
    group('authenticate', function () {
      // ...
    });
    group('checkout process', function () {
      // ...
    });

  }
  ```
- Groups do the following tasks internally:
  - For each group() function, k6 emits a group_duration metric that contains the total time to execute the group function.
  - When a taggable resource: checks, requests, or custom metrics runs within a group, k6 will set the tag group with the current group name. Read more about it in Tags.
- Both options, the group_duration metric and group tagging, could help you analyze and visualize better the results of more complex tests.
- Wrapping each individual request within a group might add boilerplate code and be unnecessary.
  ```javascript
  // reconsider this type of code
  group('get post', function () {
    http.get(`http://example.com/posts/${id}`);
  });
  group('list posts', function () {
    let res = http.get(`http://example.com/posts`);
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  });
  ```
- If your code looks like the example above, consider the following alternatives to write cleaner code:
  - For dynamic URLs, use the URL grouping feature.
  - To provide a meaningful name to your request, set the value of tags.name.
  - To reuse common logic or organize your code better, group logic in functions or create a local Javascript module and import it into the test script.
  - If you need to model advanced user patterns, check out Scenarios.


### Tags
- Tags are a simple and powerful way to categorize your k6 entities for later results filtering.
- k6 provides two types of tags:
  - User-defined tags: the ones you've added when writing your script.
  - System tags: tags automatically assigned by k6.

### User-defined tags: the ones you've added when writing your script.
- User-defined tags allow you to categorize k6 entities based on your logic. The following entities can be tagged:
  - checks
  - thresholds
  - custom metrics
  - requests
- Example:
  ```javascript
  import http from 'k6/http';
  import { Trend } from 'k6/metrics';
  import { check } from 'k6';

  let myTrend = new Trend('my_trend');

  export default function () {
    // Add tag to request metric data
    let res = http.get('http://httpbin.org/', {
      tags: {
        my_tag: "I'm a tag",
      },
    });

    // Add tag to check
    check(
      res,
      { 'status is 200': (r) => r.status === 200 },
      { my_tag: "I'm a tag" },
    );

    // Add tag to custom metric
    myTrend.add(res.timings.connecting, { my_tag: "I'm a tag" });
  }
  ```

### Test wide tags
- Besides attaching tags on requests, checks and custom metrics you can set test wide tags that will be set across all metrics. You can either set the tags on the CLI using one or more --tag NAME=VALUE flags or in the script:
- Example:
  ```javascript
  export let options = {
    tags: {
      name: 'value',
    },
  };
  ```
- Result:
  ```json
  {
    "type ": "Point ",
    "data ": {
      "time ": "2017-05-09T14:34:45.239531499+02:00 ",
      "value ": 459.865729,
      "tags ": {
        "group ": "::my group::json ",
        "method ": "GET ",
        "status ": "200 ",
        "url ": "https://httpbin.org/get "
      }
    },
    "metric ": "http_req_duration "
  }
  ```

## [Using k6 - Environment variables](https://k6.io/docs/using-k6/environment-variables/) <span id="content-10"><span>

### Intro
- You can use environment variables for two main purposes:
  - Passing environment variables to the k6 Script
  - Configure k6 Options with environment variables

### Passing environment variables to the k6 Script
- In k6, the environment variables are exposed through a global __ENV variable, a JS object
- Example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export default function () {
    const res = http.get(`http://${__ENV.MY_HOSTNAME}/`);
    sleep(1);
  }
  ```
- The recommended option of passing environment variables to your testing script is using one or more -e / --env CLI flags (this command works the same for all platforms):
  ```shell
  k6 run -e MY_HOSTNAME=test.k6.io script.js
  ```

### Configure k6 options with environment variables
- Example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export default function () {
    const res = http.get('https://test.k6.io');
    sleep(1);
  }
  ```
- By default, running the above script locally will execute a single iteration using one virtual user(VU). We can modify the default behavior by passing along k6 options as environment variables.
- For example, we can configure the script to run 10 virtual users for a duration of 10 seconds:
  ```shell
  K6_VUS=10 K6_DURATION=10s k6 run script.js
  ```
- As demonstrated above, you will need to prefix K6_ in the environment variable name in order for k6 to evaluate it as an option parameter.
- However, be aware not all options are supported as environment variables. You can confirm by checking the documentation for each option.


**[⬆ back to top](#list-of-contents)**

</br>

---

## [Using k6 - Execution context variables](https://k6.io/docs/using-k6/execution-context-variables/) <span id="content-11"><span>


### _VU and __ITER
- __VU and __ITER are both global variables with execution context information that k6 makes available to the test script.
- __ITER: A numeric counter with the current iteration number for a specific VU. Zero-based.
- __VU: Current VU number in use. The value is assigned incrementally for each new VU instance, starting from one. The variable will be 0 while executing the setup and teardown functions.


### k6 Test Coordinator
- k6 Virtual Users are concurrent, they will continuously execute through their script until the test is over or they hit their iteration limit (if you set one as described above).
- When you ramp up more Virtual Users, k6 will start new ones at that time. When you ramp down, k6 will stop them after the completion of the iteration.
- Example:
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export default function () {
    http.get('http://test.k6.io');
    console.log(`VU: ${__VU}  -  ITER: ${__ITER}`);
    sleep(1);
  }
  ```
  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export default function () {
    const email = `user+${__VU}@mail.com`;
    const payload = JSON.stringify({ email: email, password: 'test' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    http.post('http://test.k6.io/login', payload, params);
    console.log(email);
    // .. continue the user flow

    sleep(1);
  }
  ```


**[⬆ back to top](#list-of-contents)**

</br>

---

## References:
- https://k6.io/docs/getting-started/
- https://k6.io/docs/using-k6/http-requests/
- https://k6.io/docs/using-k6/metrics/
- https://k6.io/docs/using-k6/checks/
- https://k6.io/docs/using-k6/thresholds/
- https://k6.io/docs/using-k6/options/
- https://k6.io/docs/using-k6/test-life-cycle/
- https://k6.io/docs/using-k6/modules/
- https://k6.io/docs/using-k6/tags-and-groups/
- https://k6.io/docs/using-k6/environment-variables/
- https://k6.io/docs/using-k6/execution-context-variables/