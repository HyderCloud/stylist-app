import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/stylist"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()

# Select a collection
collectionCloth = db.clothes
collectionUsers = db.users

class Users:
    def __init__(self):
        pass

    def insert_user(self,doccument):
        result = collectionUsers.insert_one(doccument)
        print(result)
        return result

    def get_user_by_email(self, email):
        documents_list = collectionUsers.find_one({'email': email})
        documents_list['_id'] = str(documents_list['_id']) 
        return documents_list
    
    def get_user_by_username(self, username):
        documents_list = collectionUsers.find_one({'username': username})
        documents_list['_id'] = str(documents_list['_id']) 
        return documents_list

class Clothes:
    def __init__(self):
        pass
    
    def get_all_clothes(self):
        documents_list = collectionCloth.find()
        cleaned_documents = []
        for document in documents_list:
            document['_id'] = str(document['_id']) 
            cleaned_documents.append(document)
            

        return cleaned_documents 