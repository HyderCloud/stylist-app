import pymongo
from bson import ObjectId

mongodb_url = "mongodb://localhost:27017/stylist"
client = pymongo.MongoClient(mongodb_url)
db = client.get_database()

# Select a collection
collection = db.clothes
class Clothes:
    def __init__(self):
        pass
    
    def get_all_clothes(self):
        documents_list = collection.find()
        cleaned_documents = []
        for document in documents_list:
            document['_id'] = str(document['_id'])  # Convert ObjectId to string
            cleaned_documents.append(document)
            

        return cleaned_documents 