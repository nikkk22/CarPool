import pymongo
from pymongo import MongoClient


#Connecting to mongodb
client = MongoClient()
#Opening database
db = client.CarPool


userName1 = 'nikhil' # Logged in user
userName2 = 'rahul' # Logged in user
bDateTime = '2018-08-12::16:40' # yyyy-mm-dd
numSeats = 2 # Number of seats booked
bOName = 'Rahul' # Owner whose car is booked
pNum = '8178814684' # Phone number of the user availing services
bOPnum = '9821289191' # Phone number of the owner
oTime = '2018-08-13::16:40' # yyyy-mm-dd
oSeats = 3 # Number of seats offered
oLocation = 'Mansarovar' # Offer cab service to this place
location = 'Kumbha Marg' # Book cab to this place

rec={'email': userName1, 'pInfo': {'firstName': 'nikhil', 'lastName': 'jain', 'phoneNum': pNum},
                               'bookedCab': [{'bDateTime': bDateTime, 'bSeats': numSeats, 'bOwnerName': bOName, 'bOPhoneNum': bOPnum, 'loc': location}],
                               'offerCab': [{'oUser': userName1, 'oTime': oTime, 'oSeats': oSeats, 'phoneNum': bOPnum, 'oLocation': oLocation}]
}

recordId = db.CPool.insert(rec)
