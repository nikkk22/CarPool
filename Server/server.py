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

errorValues = {}
errorValues['successInsert'] = {'ret': True}
errorValues['successLogin'] = {'ret': True}
errorValues['failureRecPresent'] = {'ret': False}
errorValues['failureLogin'] = {'ret': False}

userData=()


client = MongoClient()
db = client.CarPool

class doLogin:
    def GET(self):
        data = web.input()
        time.sleep(10)
        return "getLogin"

    def POST(self):
        recordPresent = 0
        data = web.data()
        reqData = json.loads(data.decode())
        email = reqData['email']
        da = db.CPool.find({'email' : email})
        password = ""
        retData = {}
        if da.count() == 1:
            for dat_ in da:
                password = dat_['pInfo']['password']
                if password == reqData['password']:
                    recordPresent = 1
                    retData['email'] = email
                    retData['name'] = dat_['pInfo']['name']
                    break
                else:
                    recordPresent = 0
        elif da.count == 0:
            recordPresent = 0

        if recordPresent == 1:
            return retData
        else:
            return errorValues['failureLogin']

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
            return errorValues['failureRecPresent']
        else:
            del reqData['email']
            dummyData = {}
            dummyData = {'email': email, 'pInfo': reqData, 'bookedCab': [], 'offerCab': []}
            db.CPool.insert_one(dummyData)
            return errorValues['successInsert']

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

