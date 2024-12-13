import json

users = open("users.json")
users_dict = json.load(users)

users_dict["new_user"] = {"mail": "newmail", "password": "newpassword"}
print(users_dict)

print(users_dict["test_user"])
