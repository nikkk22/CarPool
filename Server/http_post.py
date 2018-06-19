import web
import time
import simplejson as json
import pymongo
from pymongo import MongoClient


urls = (
    '/', 'index',
    '/login', 'doLogin',
    '/register', 'doRegister'
)

successInsert = {'ret': True}
failureRecPresent = {'ret': False}
userData=()

client = MongoClient()
db = client.CarPool

class doLogin:
    def GET(self):
        data = web.input()
        time.sleep(10)
        return "getLogin"

    def POST(self):
        data = web.data()
        return test

class doRegister:
    def GET(self):
        data = web.input()
        time.sleep(10)
        return "getLogin"

    def POST(self):
        data = web.data()
        reqData = json.loads(data.decode())
        email = reqData['email']
        da = db.CPool.find({'email' : email})
        if da.count() == 1:
            print ("Record already present with the email id " + email)
            return failureRecPresent
        else:
            del reqData['email']
            dummyData = {}
            dummyData = {'email': email, 'pInfo': reqData, 'bookedCab': [], 'offerCab': []}
            db.CPool.insert_one(dummyData)
            return successInsert

class index:
    def GET(self):
        data = web.input()
        print (data.login)
        print (data.name)
        return "Success"

    def POST(self):
        data = web.data()
        reqData = json.loads(data.decode())
        email = reqData['email']
        print (reqData['name'])
        return test
    

class MyApplication(web.application):
    def run(self, port=9999, *middleware):
        func = self.wsgifunc(*middleware)
        return web.httpserver.runsimple(func, ('0.0.0.0', port))

if __name__ == "__main__":
    app = MyApplication(urls, globals())
    app.run(port=9999)

