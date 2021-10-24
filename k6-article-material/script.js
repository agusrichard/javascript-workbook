import http from 'k6/http'
import { sleep, check } from 'k6'
import { Rate, Trend } from 'k6/metrics'

const lowerThan2sRate = new Rate('lower_than_2s')
const durationInSeconds = new Trend('duration_in_seconds')

// This BASE_URL won't work if you' using Docker.
// You'll need to know the IP address of the host.
// Then replace the localhost with the IP address.
const BASE_URL = 'http://localhost:3000'

export const options = {
    vus: 1000,
    duration: '1m',
    thresholds: {
        lower_than_2s: [{
            threshold: 'rate>0.75',
            abortOnFail: true,
        }],
    }
}

export function setup() {
    const authParams = {
        headers: { 'Content-Type': 'application/json' },
    }

    const authPayload = {
        email: 'user1@example.com',
        password: 'user1',
        fullname: 'user1'
    }

    http.post(`${BASE_URL}/users/register`, JSON.stringify(authPayload), authParams)
    const loginResponse = http.post(`${BASE_URL}/users/login`, JSON.stringify(authPayload), authParams)

    // Catch the login response to get id, token and email
    const result = loginResponse.json().data

    // This params will be used to create income/expense types
    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${result.token}`
        }
    }

    // Just two kinds of income and expense
    const types = ['Investment', 'Taxes']
    types.forEach(t => {
        // Create income/expense type, e.g Investment, Pay taxes, Shopping, etc.
        http.post(
            `${BASE_URL}/income-expense-type/create`,
            JSON.stringify({
                description: t
            }),
            params
        )
    })

    // We get the newly created income/expense types
    // To be used to test create incomes and expenses
    const response = http.get(`${BASE_URL}/income-expense-type/find-by-user`, params)

    // The returned values will be used later inside the default
    // and teardown function
    return {
        id: result.id,
        email: result.email,
        token: result.token,
        incomeExpenseTypes: response.json().data
    }
}

export default function(data) {
    // We need this to pass the authorization and authentication middleware
    const params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`
        }
    }


    data.incomeExpenseTypes.forEach(t => {
        const payload = {
            value: 10000,
            description: 'Test',
            income_expense_type_id: t.id,
            is_income: false
        }
        const res = http.post(`${BASE_URL}/income-expense`, JSON.stringify(payload), params)
        check(res, {
            'is success': (r) => r.json().success,
            'duration below 2s': r => r.timings.duration < 2000
        })

        lowerThan2sRate.add(res.timings.duration < 2000)
        durationInSeconds.add(res.timings.duration / 1000)
    })
    sleep(1)
}

export function teardown(data) {
    const params = {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    }

    // To clear/truncate the injected table we need token
    http.get(`${BASE_URL}/users/clear`, params)
}