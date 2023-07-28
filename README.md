# CarCar

Important Note: the Service microservice lives on port :8070. Please update your insomonia links to port 8070, or change the dockercompose.yml to put it back on port :8080. I had issues with port :8080 while developing.

Also, please update the example.env with your own pexels key and rename the file to .env.

Team:

- Person 1 - Paul
- Person 2 - Paul

## Design

## Service microservice

The Service Microservice integrated with the Inventory Microservice through a poller that runs every one second to pull the newest inventory information form Automobiles. It lives in the AutomobileVO model and gets the VIN and sold status of the automobiles.

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

Explain your models and integration with the inventory
microservice, here.
