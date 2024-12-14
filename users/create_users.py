import json
import csv

with open('students.csv', newline='') as csvfile:
    table = csv.reader(csvfile)
    for row in table:
        print(row)

"""
users = open("users.json")
users_dict = json.load(users)

users_dict["new_user"] = {"mail": "newmail", "password": "newpassword"}
print(users_dict)

print(users_dict["test_user"])
"""
