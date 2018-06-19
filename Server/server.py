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
errorValues['successInsert'] = {'ret': 'True'}
errorValues['successLogin'] = {'ret': 'True'}
errorValues['failureRecPresent'] = {'ret': 'False'}
errorValues['failureLogin'] = {'ret': 'False'}

pp = {
  "name": "adasd",
  "gender": "Male",
  "phone": "asd",
  "vehicle": "asd",
  "email": "asd",
  "password": "asd",
  "vehicleNo": "asd"
}

userData=()


client = MongoClient()
db = client.CarPool

class doLogin:
    def GET(self):
        data = web.input()
        time.sleep(10)
        return "getLogin"

    def POST(self):
        print("In login post")
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Credentials','true')
        #web.header('Content-Type','application/json')
        recordPresent = 0
        data = web.data()
        print (data)
        reqData = json.loads(data.decode())
        print (reqData)
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
            json_data = json.dumps(retData)
            print ("Data present")
            print (json_data)
            #return retData
            return json_data
        else:
            json_data = json.dumps(errorValues['failureLogin'])
            #return errorValues['failureLogin']
            return json_data

    def OPTIONS(self):
        print("In login options")
        web.header("Access-Control-Allow-Origin", "*")
        web.header("Access-Control-Allow-Credentials", "true")
        web.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
        web.header("Access-Control-Allow-Headers", "Origin, Content-Type")
        
        data = web.input()
        print (data)
        json_data = json.dumps(errorValues['successInsert'])
        #return errorValues['successInsert']
        return json_data

class doRegister:
    def GET(self):
        data = web.input()
        time.sleep(10)
        return "getLogin"

    def POST(self):
        web.header('Access-Control-Allow-Origin','*')
        web.header('Access-Control-Allow-Credentials','true')
        print ("inside register post")
        #d = {}
        #d['key'] = 'value'
        json_data = json.dumps(errorValues['failureRecPresent'])
        data = web.data()
        reqData = json.loads(data.decode())
        email = reqData['email']
        da = db.CPool.find({'email' : email})
        if da.count() == 1:
            print ("Record already present with the email id " + email)
            #return errorValues['failureRecPresent']
            return json_data
        else:
            del reqData['email']
            dummyData = {}
            dummyData = {'email': email, 'pInfo': reqData, 'bookedCab': [], 'offerCab': []}
            db.CPool.insert_one(dummyData)
            json_data = json.dumps(errorValues['successInsert'])
            #return errorValues['successInsert']
            return json_data

    def OPTIONS(self):
        web.header("Access-Control-Allow-Origin", "*")
        web.header("Access-Control-Allow-Credentials", "true")
        web.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
        web.header("Access-Control-Allow-Headers", "Origin, Content-Type")
        data = web.input()
        json_data = json.dumps(errorValues['successInsert'])
        print (data)
        #return errorValues['successInsert']
        return json_data

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

