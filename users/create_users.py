import json
import csv

import random

users = open("users.json")
users_dict = json.load(users)

letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

passwords = []
for user in users_dict:
    passwords.append(users_dict[user]['password'])

with open('students.csv', newline='') as csvfile:
    table = csv.reader(csvfile)
    for row in table:
        if row[2]+ ' ' + row[3] + ' ' + row[1] not in users_dict:
            
            check = True
            while check:
                password = letter[random.randint(0, 25)]
                for i in range(6):
                    password += str(random.randint(0, 9))
                password += letter[random.randint(0, 25)]
                check = password in passwords
            users_dict[row[2]+ ' ' + row[3] + ' ' + row[1]] = {"mail": "newmail", "password": password}
            users_dict["class"] = row[4]

#print(users_dict)
users = open("users.json", "w")
json.dump(users_dict, users)
users.close()

