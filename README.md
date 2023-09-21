## Description

An open-source version of Slipstream's code for interpreting TU XML credit data.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage Instructions

To set the credentials that are used in the search, the `TU_USERNAME` and `TU_PASSWORD` variables should be set.

In the case of the `TU_USERNAME`, if both a `company` and a `username` was supplied with the account, the variable should be set to `<company>\<username>`.

To use the service, a `POST` request should be made to the `/search` route.

Authentication is through the `x-api-key` header, which must be the same value as the `API_AUTH_KEY` environment variable.

The route accepts a JSON body in the following format:

```json
{
	"purpose": "quotation",
	"title": "Mr",
	"firstname": "John",
	"lastname": "Smith",
	"dob": "1970-01-01T00:00:00.000Z",
	"address": {
		"buildingNumber": 1,
		"line1": "Currency Street",
		"town": "London",
		"postcode": "X9 9WF"
	}
}
```