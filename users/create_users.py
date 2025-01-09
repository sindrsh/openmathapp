import json
import csv

import random

users = open("users.json")
users_dict = json.load(users)

letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

passwords = []
for user in users_dict:
    passwords.append(users_dict[user]['password'])

with open('../../users.csv', newline='') as csvfile:
    table = csv.reader(csvfile)
    for row in table:
        print(row)
        name = row[2]
        for i in range(3, 5):
            if row[i] != '':
                name += ' ' + row[i]
        a = name
        name += ' ' + row[1]
        if name not in users_dict:
            check = True
            while check:
                password = letter[random.randint(0, 25)]
                for i in range(6):
                    password += str(random.randint(0, 9))
                password += letter[random.randint(0, 25)]
                check = password in passwords
      
            users_dict[name] = {
                "a": a,
                "b": row[1],
                "mail": row[6], 
                "password": password,
                "grade": row[5]
                }
         

print(users_dict)
users = open("users.json", "w")
json.dump(users_dict, users)
users.close()

