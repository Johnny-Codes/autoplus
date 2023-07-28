# CarCar

Important Note: the Service microservice lives on port :8070. Please update your insomonia links to port 8070, or change the dockercompose.yml to put it back on port :8080. I had issues with port :8080 while developing.

Also, please update the example.env with your own pexels key and rename the file to .env.

Team:

- Person 1 - Paul
- Person 2 - Paul

## Design

## Service microservice

The Service Microservice integrated with the Inventory Microservice through a poller that runs every one second to pull the newest inventory information from Automobiles. It lives in the AutomobileVO model and gets the VIN and sold status of the automobiles.

### AutomboileVO

The Automobile VO endpoint is

> `:8070/api/automobiles/`

and it only accepts GET requests.

Example JSON response:

```
{
	"autos": [
		{
			"id": 19,
			"vin": "MDI93HD",
			"sold": true
		},
		{
			"id": 21,
			"vin": "FD3rf",
			"sold": false
		},
		{
			"id": 23,
			"vin": "ND893DN",
			"sold": false
		}
	]
}
```

### Technicians

> `:8070/api/technicians/`

@GET requests return a list of technicians in the system.

Example JSON response:

```
{
	"technicians": [
		{
			"id": 23,
			"first_name": "Paul",
			"last_name": "Johns",
			"employee_id": "pjohns"
		},
		{
			"id": 25,
			"first_name": "Jason",
			"last_name": "Fry",
			"employee_id": "jfry"
		}
    ]
}
```

To create a technician, you can @POST. You need a "first_name", "last_name", and "employee_id" all of which are strings.

Example POST request to create a technician:

```
{
	"first_name": "Andreas",
	"last_name": "Mavromatis",
	"employee_id": "amavromatis"
}
```

> `:8070/api/technicians/<int:id>/`

To delete a technician, send a @DELETE request containing the id of the technician.

Example JSON response:

```
{
	"id": null,
	"first_name": "Jason",
	"last_name": "Fry",
	"employee_id": "jfry"
}
```

### Service Appointments

Along with the technicians, we can list, create, update, and delete vehicle service appointments.

To list or create new Appointments:

@GET

> `http://localhost:8070/api/appointments/`

Example JSON response:

```
{
	"appointments": [
		{
			"id": 20,
			"vin": "B7830DN",
			"date_time": "2023-07-26T07:33:00+00:00",
			"reason": "Oil Change",
			"status": "Finished",
			"customer": "Customer 1",
			"technician": {
				"id": 23,
				"first_name": "Paul",
				"last_name": "Johns",
				"employee_id": "pjohns"
			}
        },
        {
			"id": 60,
			"vin": "hkfsd90",
			"date_time": "2023-07-26T12:15:00+00:00",
			"reason": "Oil Change",
			"status": "Created",
			"customer": "Ray Finkle",
			"technician": {
				"id": 23,
				"first_name": "Paul",
				"last_name": "Johns",
				"employee_id": "pjohns"
			}
		}
    ]
}
```

@POST

Example JSON post request to create an appointment. Need the technician id (not to be confused with the technician employee_id)

```
{
	"vin": "dsa11ds0",
	"date_time": "2024-07-27T13:15",
	"reason": "oil change",
	"customer": "new customer",
	"technician": 27
}
```

To cancel an appointment send a @PUT request to:

> `http://localhost:8070/api/appointments/<int:id>/cancel/`

Example:

```
{
	"id": 20,
	"status": "Canceled"
}
```

Example JSON response:

```
{
	"id": 20,
	"vin": "B7830DN",
	"date_time": "2023-07-26T07:33:00+00:00",
	"reason": "Oil Change",
	"status": "Canceled",
	"customer": "Customer 1",
	"technician": {
		"id": 23,
		"first_name": "Paul",
		"last_name": "Johns",
		"employee_id": "pjohns"
	}
}
```

To finish an appointment send a @PUT request to :

> `http://localhost:8070/api/appointments/20/finish/`

Example:

```
{
	"id": 20,
	"status": "Finished"
}
```

Example JSON response:

```
{
	"id": 20,
	"vin": "B7830DN",
	"date_time": "2023-07-26T07:33:00+00:00",
	"reason": "Oil Change",
	"status": "Finished",
	"customer": "Customer 1",
	"technician": {
		"id": 23,
		"first_name": "Paul",
		"last_name": "Johns",
		"employee_id": "pjohns"
	}
}
```

And finally, to delete an appointment, send a @DELETE request to:

> `http://localhost:8070/api/appointments/<int:id>/`

and receive this JSON response like this:

```
{
	"id": null,
	"vin": "hkfsd90",
	"date_time": "2023-07-26T12:15:00+00:00",
	"reason": "dsfa",
	"status": "Created",
	"customer": "fnkljvsda0",
	"technician": {
		"id": 23,
		"first_name": "Paul",
		"last_name": "Johns",
		"employee_id": "pjohns"
	}
}
```

## Sales microservice

The Sales Microservice integrated with the Inventory Microservice through a poller that runs every one second to pull the newest inventory information from Automobiles. It lives in the AutomobileVO model and gets the VIN and sold status of the automobiles.

### AutomboileVO

The Automobile VO endpoint is

> `:8090/api/automobiles/`

and it only accepts GET requests.

Example JSON response:

```
{
	"autos": [
		{
			"id": 19,
			"vin": "MDI93HD",
			"sold": true
		},
		{
			"id": 21,
			"vin": "FD3rf",
			"sold": false
		},
		{
			"id": 23,
			"vin": "ND893DN",
			"sold": false
		}
	]
}
```

### Salespeople

@GET and @POST to list and create salespeople, respectively.

> `http://localhost:8090/api/salespeople/`

@GET example JSON response:

```
{
	"salespeople": [
		{
			"id": 5,
			"first_name": "Mitch",
			"last_name": "Hedberg",
			"employee_id": "mhedberg"
		},
		{
			"id": 6,
			"first_name": "John",
			"last_name": "Rangel",
			"employee_id": "jrangel"
		},
		{
			"id": 7,
			"first_name": "from",
			"last_name": "insomnia",
			"employee_id": "finsomnia"
		}
	]
}
```

@POST example:

To create send:

```
{
	"first_name": "from",
	"last_name": "insomnia",
	"employee_id": "finsomnia"
}
```

Response:

```
{
	"id": 7,
	"first_name": "from",
	"last_name": "insomnia",
	"employee_id": "finsomnia"
}
```

To delete, send a @DELETE request to:

> `http://localhost:8090/api/salespeople/<int:id>/`

And receive this JSON Response:

```
"they were fired"
```

### Salespeople

You can list, create, and delete customers.

@GET and @POST

> `http://localhost:8090/api/customers/`

To list salespeople send a @GET request and receive this example JSON response:

```
{
	"customers": [
		{
			"id": 13,
			"first_name": "Customer",
			"last_name": "1",
			"address": "111 Main St Houston, TX 77380",
			"phone_number": "0123456789"
		},
		{
			"id": 14,
			"first_name": "Customer",
			"last_name": "2",
			"address": "fdsa",
			"phone_number": "89213"
		}
	]
}
```

To create a customer, send a @POST request.

Post request needs this data:

```
{
	"first_name": "great",
	"last_name": "customer",
	"address": "I'm not sure why I made this a text field.",
	"phone_number": "0123456789"
}
```

and receive this JSON Response:

```
{
	"id": 15,
	"first_name": "great",
	"last_name": "customer",
	"address": "I'm not sure why I made this a text field.",
	"phone_number": "0123456789"
}
```

Send a @DELETE request to:

> `http://localhost:8090/api/customers/<int:id>/`

And receive a success JSON message.

### Sales

You can list, create, and delete vehicle sales.

@GET and @POST

> `http://localhost:8090/api/sales/`

To list sales, send a @GET request and receive this example JSON response:

```
{
	"sales": [
		{
			"id": 20,
			"price": 10100,
			"automobile": {
				"id": 11,
				"vin": "B7830DN",
				"sold": true
			},
			"salesperson": {
				"id": 5,
				"first_name": "Mitch",
				"last_name": "Hedberg",
				"employee_id": "mhedberg"
			},
			"customer": {
				"id": 13,
				"first_name": "Customer",
				"last_name": "1",
				"address": "111 Main St Houston, TX 77380",
				"phone_number": "0123456789"
			}
		}
    ]
}
```

To create a sale send a @POST request with this data:

```
{
	"price": "10002",
	"automobile": 39,
	"salesperson": 5,
	"customer": 13
}
```

where the automobile, salesperson, and customer are the respective id's.

Receive this JSON resposne:

```
{
	"id": 50,
	"price": "10002",
	"automobile": {
		"id": 39,
		"vin": "MDI93HD",
		"sold": true
	},
	"salesperson": {
		"id": 5,
		"first_name": "Mitch",
		"last_name": "Hedberg",
		"employee_id": "mhedberg"
	},
	"customer": {
		"id": 13,
		"first_name": "Customer",
		"last_name": "1",
		"address": "111 Main St Houston, TX 77380",
		"phone_number": "0123456789"
	}
}
```

To delete a sale, send a @DELETE request to:

> `http://localhost:8090/api/sales/<int:id>/`

and receive a success message.
