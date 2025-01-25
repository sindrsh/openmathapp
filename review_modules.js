async function getSubjects() {
    try {
        const response = await fetch("./task_index.json");
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

        const index = await response.json();
        return [index["subjects"], index["topics"]]
    } catch (error) {
        console.error(error.message);
        return null
    }
}

const taskCompletedColor = "rgb(0, 255, 0, 0.4)"
const taskNotCompletedColor = "rgb(179, 240, 255, 0.4)"

const indexes = await getSubjects()
const subjects = indexes[0]
const topics = indexes[1]

function makeTable(subject, studentData) {
    const subjectTable = document.createElement("table")
    subjectTable.setAttribute("class", "subject-table")
    const subjectTableRow = document.createElement("tr")
    const subjectTableTh = document.createElement("th")
    const subjectTableTopicTd = document.createElement("td")
    
    subjectTableTh.innerHTML = `${subjects[subject]["name"]["nn"]}`
    subjectTableRow.appendChild(subjectTableTh)
    subjectTableRow.appendChild(subjectTableTopicTd)
    subjectTable.appendChild(subjectTableRow)
    
    
    
    const topicsArray = Object.keys(subjects[subject]["topics"])
    for (let topic of topicsArray) {
        const topicTable = document.createElement("table")
        const topicTableRow = document.createElement("tr")
        const topicTableTd = document.createElement("td")
        const topicTableTaskTd = document.createElement("td")
        topicTable.setAttribute("class", "topic-table")
        topicTableTd.innerHTML = `${topics[topic]["nn"]}`
        topicTableTd.setAttribute("class", "topic")
        topicTableRow.appendChild(topicTableTd)
        topicTableRow.appendChild(topicTableTaskTd)
        topicTable.appendChild(topicTableRow)
        const tasksTable = document.createElement("table")
        tasksTable.setAttribute("class", "task-table")
        
        const tasksArray = Object.keys(subjects[subject]["topics"][topic])
        const taskObjects = subjects[subject]["topics"][topic]
        for (let i=0; i < tasksArray.length; ++i) {
            let task = tasksArray[i]
            let taskCompleted = false
            if (task in studentData) {
                if (studentData[task]["score"] == 2) {
                    taskCompleted = true
                } 
            }
            const tasksTableRow = document.createElement("tr")
            const tasksTableTd = document.createElement("td")
            
        
            if ("description" in taskObjects[task]) {
                //alert("description missing!")
                if ("nn" in taskObjects[task]["description"]) {
                    tasksTableTd.innerHTML = `${taskObjects[task]["description"]["nn"]}`
                }
            } else {
                tasksTableTd.innerHTML = "-!-!-"
            }

            tasksTableRow.appendChild(tasksTableTd)
            tasksTable.appendChild(tasksTableRow)

            if (taskCompleted) {
                tasksTableTd.style.backgroundColor = taskCompletedColor
            } else {
                tasksTableTd.style.backgroundColor = taskNotCompletedColor
                if (subject != "automatization") {
                    break
                }
                
            }
        }
        topicTableTaskTd.appendChild(tasksTable)
        subjectTableTopicTd.appendChild(topicTable)
        
    }
    return subjectTable
}

const studentsData = [
    {
        "user_id": "a440db85-d33c-4353-820e-fac1bd7a4624",
        "created_at": "2025-01-13T06:18:41.403125+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Celine Malén Gulla",
        "last_name": "Hauvik",
        "grade": "5B"
    },
    {
        "user_id": "6d92d499-441f-45a8-9bf9-c95080e17798",
        "created_at": "2025-01-08T22:36:06.700292+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "David Vassli",
        "last_name": "Lie",
        "grade": "1A"
    },
    {
        "user_id": "a547809f-6bd2-40c9-b973-719c09b09edb",
        "created_at": "2025-01-08T22:36:13.270625+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jan Lech",
        "last_name": "Tischer",
        "grade": "1A"
    },
    {
        "user_id": "60aa5da1-2753-4bec-b688-562bb6e56671",
        "created_at": "2025-01-08T22:36:21.119534+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Sana",
        "last_name": "Rahimkhail",
        "grade": "1B"
    },
    {
        "user_id": "608e9c4e-9e7a-4952-baa4-914c6c9efb0f",
        "created_at": "2025-01-08T23:10:33.755243+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ada Sæther",
        "last_name": "Ytreberg",
        "grade": "1B"
    },
    {
        "user_id": "3d9a28b1-c3d0-4812-bd2d-65663c88e18e",
        "created_at": "2025-01-08T23:13:01.946576+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jacob Tonkla",
        "last_name": "Sagen",
        "grade": "3B"
    },
    {
        "user_id": "42923ba8-2054-4c1e-ba32-e081040673ea",
        "created_at": "2025-01-08T23:14:31.544824+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Peder Baade",
        "last_name": "Fiksdal",
        "grade": "4B"
    },
    {
        "user_id": "c2835b33-0cdc-4090-b68f-86ebbcd122b5",
        "created_at": "2025-01-08T22:45:03.978262+00:00",
        "tasks": {
            "times10": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Ada Charlotte Stimson",
        "last_name": "Neraas",
        "grade": "7A"
    },
    {
        "user_id": "79b9bc77-afd2-493f-a932-117d1e705158",
        "created_at": "2025-01-08T23:03:47.678797+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Kamile",
        "last_name": "Stonyte",
        "grade": "7B"
    },
    {
        "user_id": "c5d9ddfe-5930-4a2c-9052-f71ddb3d6b45",
        "created_at": "2025-01-08T22:44:14.010726+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Olea Overaa",
        "last_name": "Hole",
        "grade": "7C"
    },
    {
        "user_id": "f4c71128-ea94-49f0-9d1c-842be31d25fc",
        "created_at": "2025-01-08T23:16:02.1569+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Daniel Leander",
        "last_name": "Husøy",
        "grade": "5B"
    },
    {
        "user_id": "0801b1f6-535d-43be-830b-67b4ddb51fb2",
        "created_at": "2025-01-08T22:04:57.202297+00:00",
        "tasks": {
            "num_line_0_to_9": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Test Tester",
        "last_name": "Sindre",
        "grade": "0Z"
    },
    {
        "user_id": "55b7670a-d08a-4154-adc2-32577cce624a",
        "created_at": "2025-01-12T21:44:46.969955+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Nadiia",
        "last_name": "Bohdanova",
        "grade": "5B"
    },
    {
        "user_id": "ab3ec82a-a5a9-4f66-a4d6-9bfbe82403ff",
        "created_at": "2025-01-12T21:58:33.930032+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Håkon Hareide",
        "last_name": "Lie",
        "grade": "4A"
    },
    {
        "user_id": "7282b672-6d3d-4c25-bb88-47d96a202069",
        "created_at": "2025-01-08T22:36:07.39605+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Nils Aron Gjelsten",
        "last_name": "Løvik",
        "grade": "1A"
    },
    {
        "user_id": "a80338fa-bea4-4e24-a021-885769512f87",
        "created_at": "2025-01-08T22:36:13.835151+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mariia",
        "last_name": "Tsviliuk",
        "grade": "1A"
    },
    {
        "user_id": "bc8e0bf0-6d81-4b98-8b62-271d4d187253",
        "created_at": "2025-01-08T22:36:21.735443+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ludvik",
        "last_name": "Siem",
        "grade": "1B"
    },
    {
        "user_id": "643e30dd-dbd7-4086-8da9-36f41d594077",
        "created_at": "2025-01-08T23:02:47.629053+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ingrid Elida Stave",
        "last_name": "Sæther",
        "grade": "2B"
    },
    {
        "user_id": "cf577bd6-6e8f-4645-8c38-a59888f6978a",
        "created_at": "2025-01-08T23:11:00.996423+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Anhelina Vitaliivna",
        "last_name": "Mokrydova",
        "grade": "2A"
    },
    {
        "user_id": "3cdf93a0-b745-49a6-ac41-fdebe508a57c",
        "created_at": "2025-01-08T23:22:11.028292+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Marcel Szymon",
        "last_name": "Roda",
        "grade": "2A"
    },
    {
        "user_id": "4b55a1b5-d1d6-4515-b826-2e051399a3c5",
        "created_at": "2025-01-08T23:22:21.050197+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Khrystyna",
        "last_name": "Veselova",
        "grade": "3B"
    },
    {
        "user_id": "09403ec5-72b6-4f2f-ad4d-a8ba920ac328",
        "created_at": "2025-01-12T22:05:00.610624+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jenny",
        "last_name": "Bjørdalsbakke",
        "grade": "2B"
    },
    {
        "user_id": "2d3bdb4a-180f-4f31-87de-e9da42af440c",
        "created_at": "2025-01-12T22:05:06.126063+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Emrik Leikarnes",
        "last_name": "Herje",
        "grade": "2B"
    },
    {
        "user_id": "8f661e27-a239-47d6-a7b6-f4aac0779664",
        "created_at": "2025-01-12T22:05:09.123521+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Isak Brastad",
        "last_name": "Nerhus",
        "grade": "2B"
    },
    {
        "user_id": "ea1c82db-da22-4803-a4f7-71dd65a2139e",
        "created_at": "2025-01-08T22:43:13.076816+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Lina",
        "last_name": "Skjegstad",
        "grade": "5B"
    },
    {
        "user_id": "539613fb-c2d0-497f-bb88-2ee540c73284",
        "created_at": "2025-01-08T23:03:17.738352+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Tymur",
        "last_name": "Lavrynenko",
        "grade": "5A"
    },
    {
        "user_id": "7d66a209-63de-4eeb-b921-29afed0a842c",
        "created_at": "2025-01-08T22:36:08.036583+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Teodor Martinus",
        "last_name": "Løvik",
        "grade": "1A"
    },
    {
        "user_id": "d55d2c3a-e72c-43da-a753-9d4b4a41bc35",
        "created_at": "2025-01-08T22:36:14.450315+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Eva Skjegstad",
        "last_name": "Visdal",
        "grade": "1A"
    },
    {
        "user_id": "10ab6892-8a58-425c-94a2-b3507a966ed3",
        "created_at": "2025-01-08T22:40:13.876568+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Amalie Furland",
        "last_name": "Aas",
        "grade": "1B"
    },
    {
        "user_id": "ec8e7651-65ff-4ad5-9cb1-dcc6a056478b",
        "created_at": "2025-01-08T22:41:13.679399+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Oliver Skjegstad",
        "last_name": "Visdal",
        "grade": "3A"
    },
    {
        "user_id": "f51a934c-54c3-49b3-96c9-5c6616088f11",
        "created_at": "2025-01-08T22:42:13.486529+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Valeriia",
        "last_name": "Biletska",
        "grade": "4B"
    },
    {
        "user_id": "bbf75e6a-d889-471f-8240-5d80f1a7f024",
        "created_at": "2025-01-08T23:02:57.663728+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Fadi",
        "last_name": "Khlulink",
        "grade": "3B"
    },
    {
        "user_id": "91b02f65-6ccf-4f50-a1a3-b3710818cc3e",
        "created_at": "2025-01-08T23:11:21.172772+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ksanet Asmerom",
        "last_name": "Diani",
        "grade": "2B"
    },
    {
        "user_id": "42fa3c34-af5f-4655-88ac-0d3756e67969",
        "created_at": "2025-01-08T23:14:42.697244+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Alma",
        "last_name": "Hoem-Fagerheim",
        "grade": "4B"
    },
    {
        "user_id": "6e26eed0-feae-4e5a-a290-1fd2c2324ade",
        "created_at": "2025-01-09T05:47:35.976531+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Arne Håseth",
        "last_name": "Andersen",
        "grade": "2A"
    },
    {
        "user_id": "797e6135-5b4a-49dd-8549-429516504d90",
        "created_at": "2025-01-09T05:47:40.577146+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Antonina",
        "last_name": "Andreichuk",
        "grade": "2A"
    },
    {
        "user_id": "ab6d79f1-c527-47f9-aa19-256ad64d286b",
        "created_at": "2025-01-09T05:47:49.280294+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Daria",
        "last_name": "Babak",
        "grade": "2A"
    },
    {
        "user_id": "bccd68a3-f2f1-4029-998c-a94fb8225ff1",
        "created_at": "2025-01-09T05:47:53.788395+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jonathan Rypdal",
        "last_name": "Eide",
        "grade": "2A"
    },
    {
        "user_id": "4608875a-e5b0-4d4c-8ab5-8c66090a6b47",
        "created_at": "2025-01-09T05:47:58.28558+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ahmad Mansour",
        "last_name": "Ghazalah",
        "grade": "2A"
    },
    {
        "user_id": "e65b7e57-4f68-4562-a0f8-4e789daf2d10",
        "created_at": "2025-01-09T05:48:11.192052+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Sana",
        "last_name": "Karimi",
        "grade": "2A"
    },
    {
        "user_id": "7f168d07-3d9e-40a0-9dcc-5ec7295e2f33",
        "created_at": "2025-01-09T05:48:15.704596+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Matias Girmay",
        "last_name": "Kidane",
        "grade": "2A"
    },
    {
        "user_id": "3cb288f6-4bfe-4ae4-ba41-1015962ca306",
        "created_at": "2025-01-09T05:48:32.689629+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Birk Kildal",
        "last_name": "Skålvik",
        "grade": "2A"
    },
    {
        "user_id": "2a42daf8-fa4a-4744-928a-002d33996667",
        "created_at": "2025-01-09T05:48:53.878223+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Edvard Relling",
        "last_name": "Bredeli",
        "grade": "2B"
    },
    {
        "user_id": "cea07799-31ed-46bd-aef2-3b1617fa0402",
        "created_at": "2025-01-09T05:49:02.489859+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Charlotte",
        "last_name": "Gillerhaugen",
        "grade": "2B"
    },
    {
        "user_id": "a2b2b701-b5b0-4f67-b669-865341bde649",
        "created_at": "2025-01-09T05:49:11.196804+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Aurora-Lineah",
        "last_name": "Merten",
        "grade": "2B"
    },
    {
        "user_id": "6967a277-f8cb-4f7b-8ae5-fcf616d0173d",
        "created_at": "2025-01-09T05:49:24.1067+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Diana Karina",
        "last_name": "Sikora",
        "grade": "2B"
    },
    {
        "user_id": "29b609b2-b7e5-4482-ba6c-238144c5ee87",
        "created_at": "2025-01-09T05:49:32.807799+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Marie Skavnes",
        "last_name": "Vik",
        "grade": "2B"
    },
    {
        "user_id": "5d7dfcae-38c2-4c02-b1b8-895481d938bf",
        "created_at": "2025-01-09T05:49:41.507388+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Hugo",
        "last_name": "Wantuch",
        "grade": "2B"
    },
    {
        "user_id": "1b4e8902-8a92-4214-8459-268891dcb673",
        "created_at": "2025-01-09T05:50:02.710541+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Murtaza",
        "last_name": "Karimi",
        "grade": "3A"
    },
    {
        "user_id": "e55a2d77-811b-4413-bcd2-42f1fa0261ea",
        "created_at": "2025-01-09T05:50:11.401727+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Filippa",
        "last_name": "Klokset",
        "grade": "3A"
    },
    {
        "user_id": "bd4f788c-dcc2-4e56-994c-41a258a63232",
        "created_at": "2025-01-09T05:50:24.204451+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Olav Aaron",
        "last_name": "Neraas",
        "grade": "3A"
    },
    {
        "user_id": "95119caa-a5c0-45fd-b0e7-1205b1d094b9",
        "created_at": "2025-01-09T05:50:41.207178+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Pola Barbara",
        "last_name": "Tischer",
        "grade": "3A"
    },
    {
        "user_id": "e09a602e-9b37-4ca4-aa8b-0d15ecd0271d",
        "created_at": "2025-01-09T05:51:02.403635+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Eirik Sevaldsen",
        "last_name": "Varmedal",
        "grade": "3A"
    },
    {
        "user_id": "5f26e77b-5e7b-435f-91d3-2f78aea00f20",
        "created_at": "2025-01-09T05:51:11.119624+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Celine Hovde",
        "last_name": "Welgaard",
        "grade": "3A"
    },
    {
        "user_id": "57b18088-71dd-4571-8b57-c17d8fef3eba",
        "created_at": "2025-01-09T05:51:23.912917+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Rania Fouaz Mater",
        "last_name": "Al-Dolaimi",
        "grade": "3B"
    },
    {
        "user_id": "d7a710ee-6ac1-4b9b-aca2-99aed38d2cce",
        "created_at": "2025-01-09T05:51:45.202388+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Marcus",
        "last_name": "Finnvik",
        "grade": "3B"
    },
    {
        "user_id": "b394f62f-6284-4ad3-9708-76dfe9341af6",
        "created_at": "2025-01-09T05:52:14.661959+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Daniel André Venås",
        "last_name": "Sánchez",
        "grade": "3B"
    },
    {
        "user_id": "ffbafae0-3e50-4ee5-b686-5ea50e3b472a",
        "created_at": "2025-01-09T05:52:23.305943+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Manasa Murgus",
        "last_name": "Tira",
        "grade": "3B"
    },
    {
        "user_id": "73955a65-9b57-4ebf-9d30-2f2fa3777f65",
        "created_at": "2025-01-09T05:52:31.894492+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mariia",
        "last_name": "Toshev",
        "grade": "3B"
    },
    {
        "user_id": "5eb5a19d-752e-417e-8dd2-1f3d8b50c25f",
        "created_at": "2025-01-09T05:52:44.713361+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Alva Sofia Roald",
        "last_name": "Åkre",
        "grade": "3B"
    },
    {
        "user_id": "1286d20a-0532-4f72-9ae6-6cb3d09058dc",
        "created_at": "2025-01-09T05:53:01.796204+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jonas",
        "last_name": "Bjørdalsbakke",
        "grade": "4A"
    },
    {
        "user_id": "a4cd8bff-c684-4565-b756-92e5a12bdfa3",
        "created_at": "2025-01-09T05:53:14.612891+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Andreas Skotte",
        "last_name": "Daugstad",
        "grade": "4A"
    },
    {
        "user_id": "8119b7c5-ae96-4d09-8f41-1a329bbc4266",
        "created_at": "2025-01-09T05:53:23.206629+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jenni Vik",
        "last_name": "Heggdal",
        "grade": "4A"
    },
    {
        "user_id": "26aebedf-5d65-4b92-83a1-870741cae83c",
        "created_at": "2025-01-09T05:53:31.81573+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Danielius",
        "last_name": "Kunickas",
        "grade": "4A"
    },
    {
        "user_id": "087e6834-32e8-42a2-ab96-ea39722c71ca",
        "created_at": "2025-01-12T22:14:05.626195+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Test Tester",
        "last_name": "Sindre",
        "grade": "0Z"
    },
    {
        "user_id": "2c8fe654-2be1-4918-9788-31e1ea16bc34",
        "created_at": "2025-01-09T06:07:36.61709+00:00",
        "tasks": {
            "times10": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Lukas Engeskar",
        "last_name": "Skålhavn",
        "grade": "7C"
    },
    {
        "user_id": "dcafd9b5-1dd3-4767-bd53-64d0094654eb",
        "created_at": "2025-01-08T22:36:08.813631+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Leonora Venås",
        "last_name": "Rishaug",
        "grade": "1A"
    },
    {
        "user_id": "7c47e2aa-92c7-4e24-b6c7-0926b7c295b0",
        "created_at": "2025-01-08T22:36:15.074955+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Arisiema Kidane",
        "last_name": "Woldu",
        "grade": "1A"
    },
    {
        "user_id": "a669cbb8-f25f-41fc-be11-1a7c8dc1b443",
        "created_at": "2025-01-08T22:40:23.399992+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Aslak Myrset",
        "last_name": "Heggen",
        "grade": "2A"
    },
    {
        "user_id": "695e017e-2055-44d6-9e7f-b5866a86a010",
        "created_at": "2025-01-08T22:41:23.200021+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Frøya Olsen",
        "last_name": "Brastad",
        "grade": "3B"
    },
    {
        "user_id": "05544d3e-99bf-4052-b869-8282e266d65e",
        "created_at": "2025-01-09T06:09:31.281447+00:00",
        "tasks": {
            "times10": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Live",
        "last_name": "Bauer",
        "grade": "7A"
    },
    {
        "user_id": "65f02771-89c7-40f5-a970-b8376225f43b",
        "created_at": "2025-01-08T22:42:23.105331+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jonathan Leikarnes",
        "last_name": "Herje",
        "grade": "4B"
    },
    {
        "user_id": "b3d4cd91-6ccb-4bcf-98a3-a50e8bd7cf52",
        "created_at": "2025-01-08T23:03:07.39319+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Olav Rypdal",
        "last_name": "Baltzersen",
        "grade": "4B"
    },
    {
        "user_id": "d8c05dab-f0d4-4240-8593-9e7832d3f63e",
        "created_at": "2025-01-08T23:11:41.145498+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Iver Brennvik",
        "last_name": "Vollen",
        "grade": "2B"
    },
    {
        "user_id": "fd4266a1-8763-4b6f-8bf4-8a1d9a9e860f",
        "created_at": "2025-01-08T23:13:10.96404+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Frøya Ræstad",
        "last_name": "Tomasdottir",
        "grade": "3B"
    },
    {
        "user_id": "7c741c49-2fbc-4882-a250-50210b6d16a9",
        "created_at": "2025-01-09T05:53:53.002041+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Loke Andre",
        "last_name": "Røstgaard",
        "grade": "4A"
    },
    {
        "user_id": "426666a0-73e7-4eda-836a-b97d30262bf3",
        "created_at": "2025-01-09T05:58:33.398635+00:00",
        "tasks": {
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Ole Sæther",
        "last_name": "Ytreberg",
        "grade": "5B"
    },
    {
        "user_id": "303a3c21-4e11-47bb-9ada-6155ac46eafb",
        "created_at": "2025-01-09T05:54:01.703221+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Bogdan",
        "last_name": "Spoiala",
        "grade": "4A"
    },
    {
        "user_id": "7cbb037a-04e2-4971-bf4c-9a7edbae1aa6",
        "created_at": "2025-01-09T05:54:14.520134+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Elian",
        "last_name": "Aas",
        "grade": "4A"
    },
    {
        "user_id": "f0d70421-d91b-4d50-bab1-4f3d87b44d7d",
        "created_at": "2025-01-09T05:54:52.503409+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Elisa Grav",
        "last_name": "Engen",
        "grade": "4B"
    },
    {
        "user_id": "1ecf9e0a-7b46-40a5-90d2-ac759d73f653",
        "created_at": "2025-01-09T05:55:34.589047+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Marcus Røv",
        "last_name": "Lenning",
        "grade": "4B"
    },
    {
        "user_id": "2a375005-59f1-475b-a388-8c09854b94ed",
        "created_at": "2025-01-09T05:55:43.386288+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Liam Nicolai",
        "last_name": "Løvik",
        "grade": "4B"
    },
    {
        "user_id": "d7035da5-b3bd-4466-b5d9-4cf58efe4c31",
        "created_at": "2025-01-09T05:58:42.186982+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Julie",
        "last_name": "Bjørdalsbakke",
        "grade": "6A"
    },
    {
        "user_id": "c82b61a9-6416-425e-9f8e-9d5ecef9c5e8",
        "created_at": "2025-01-09T05:58:54.98834+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Artem",
        "last_name": "Fursenko",
        "grade": "6A"
    },
    {
        "user_id": "108990de-56b3-43a7-aaf4-5001d60ace67",
        "created_at": "2025-01-09T05:59:03.692517+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Michael Alexander Herradon",
        "last_name": "Larsen",
        "grade": "6A"
    },
    {
        "user_id": "4424a1a1-4a01-456f-8a4d-7ac59877b996",
        "created_at": "2025-01-09T05:59:33.29335+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Charleen Kwankhao",
        "last_name": "Sagen",
        "grade": "6A"
    },
    {
        "user_id": "8104324a-8244-4ff0-935d-56310baf3b60",
        "created_at": "2025-01-09T05:59:41.995688+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Aurora Matilde Stave",
        "last_name": "Sæther",
        "grade": "6A"
    },
    {
        "user_id": "c0f201e7-47f7-446c-9956-8601985c43ef",
        "created_at": "2025-01-12T22:27:46.530933+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Magnus Eli Villegas",
        "last_name": "Unlayao",
        "grade": "2A"
    },
    {
        "user_id": "00cc0975-1fcd-4499-bd71-91e0940206f9",
        "created_at": "2025-01-09T05:58:03.57594+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Nikita",
        "last_name": "Klimchuk",
        "grade": "5B"
    },
    {
        "user_id": "de922844-7362-44ef-b2ff-54fee3892396",
        "created_at": "2025-01-09T05:57:21.189862+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Reidun Irene",
        "last_name": "Baguio-Aas",
        "grade": "5B"
    },
    {
        "user_id": "3606f3d9-4c2d-4172-8451-b4c322dc7792",
        "created_at": "2025-01-09T05:56:51.589328+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Arsema Tekleab",
        "last_name": "Mebrahtu",
        "grade": "5A"
    },
    {
        "user_id": "61102803-fff5-4dd2-ad3b-be915dad915f",
        "created_at": "2025-01-09T05:56:13.2914+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Nora Øyen",
        "last_name": "Eidhammer",
        "grade": "5A"
    },
    {
        "user_id": "55f7abd6-13c2-44a5-a15b-2ee455b73e63",
        "created_at": "2025-01-09T06:09:09.800764+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Samuel Magerøy",
        "last_name": "Sivertsen",
        "grade": "7B"
    },
    {
        "user_id": "8c11f612-8f48-48ea-b18b-5e7b06d510d3",
        "created_at": "2025-01-09T05:58:24.77227+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Jonas André",
        "last_name": "Unlayao",
        "grade": "5B"
    },
    {
        "user_id": "aaa61d26-4599-43e1-8721-d9cdca81931f",
        "created_at": "2025-01-08T22:36:09.581393+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Izabele Petkeviciute",
        "last_name": "Robertsen",
        "grade": "1A"
    },
    {
        "user_id": "b72d086f-3af3-4dee-b6cb-8f08c392617d",
        "created_at": "2025-01-08T22:36:15.687553+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Elise",
        "last_name": "Beinset",
        "grade": "1B"
    },
    {
        "user_id": "f7d5be36-9919-46b6-90c1-080ca43f2d11",
        "created_at": "2025-01-08T23:03:37.703643+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Layan Mansour",
        "last_name": "Ghazalah",
        "grade": "7C"
    },
    {
        "user_id": "b6379b5a-8760-479c-b8bb-1b8e627e6b32",
        "created_at": "2025-01-08T22:40:34.155457+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Luna Tesfaye",
        "last_name": "Bjermeland",
        "grade": "2B"
    },
    {
        "user_id": "2b27d31d-e555-4e8e-893c-7591c2ee0d81",
        "created_at": "2025-01-08T22:41:33.953091+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Alisa",
        "last_name": "Sypko",
        "grade": "3B"
    },
    {
        "user_id": "1eb2c59f-5fbd-44d8-9b61-b40f49a6c4c5",
        "created_at": "2025-01-08T22:42:33.858663+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Erling Nguyen",
        "last_name": "Uren",
        "grade": "4B"
    },
    {
        "user_id": "c52a3e59-c692-49bf-86f5-f96b984276ef",
        "created_at": "2025-01-08T22:43:33.361674+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Erfan",
        "last_name": "Rahimkhail",
        "grade": "6A"
    },
    {
        "user_id": "6cf9c7b6-4af4-414f-beb6-68e78103c153",
        "created_at": "2025-01-09T06:08:38.774365+00:00",
        "tasks": {
            "frac_fig_to_number": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Kevin André Gulla",
        "last_name": "Hauvik",
        "grade": "7B"
    },
    {
        "user_id": "b76a8f7b-4631-4fda-9ed9-a60970ccf2bd",
        "created_at": "2025-01-08T23:16:22.444621+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Karyna",
        "last_name": "Veselova",
        "grade": "5B"
    },
    {
        "user_id": "04c2ad38-7ffa-44fb-93f2-b429aa907a04",
        "created_at": "2025-01-08T23:11:52.303034+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Lydia",
        "last_name": "Håseth-Aas",
        "grade": "3A"
    },
    {
        "user_id": "ac9c9bb6-6865-408b-8010-146f36300af6",
        "created_at": "2025-01-08T23:13:22.233057+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Arielle Fagerheim",
        "last_name": "Aas",
        "grade": "3B"
    },
    {
        "user_id": "215e244f-7edd-4c12-aa0c-11599be5426c",
        "created_at": "2025-01-08T23:14:51.61943+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Tobias Dragnes",
        "last_name": "Limås",
        "grade": "4B"
    },
    {
        "user_id": "b8bb5e16-1d05-4387-b370-951fdfe04a6a",
        "created_at": "2025-01-09T06:05:18.553419+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Adrian",
        "last_name": "Aas",
        "grade": "6A"
    },
    {
        "user_id": "1c5bfe79-d1d8-4f24-983f-bec34ebe4f7b",
        "created_at": "2025-01-09T06:05:27.284961+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Vilja",
        "last_name": "Berg-Longva",
        "grade": "6B"
    },
    {
        "user_id": "2e158896-fd20-4a47-a49c-9c9a496563c3",
        "created_at": "2025-01-09T06:05:31.784128+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Theodor Pedersen Bøyding",
        "last_name": "Borgen",
        "grade": "6B"
    },
    {
        "user_id": "7963bc0e-b482-4a6f-b9b0-9946a8ab37d9",
        "created_at": "2025-01-09T06:05:36.287797+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Kristina Louise",
        "last_name": "Eidhamar",
        "grade": "6B"
    },
    {
        "user_id": "bbf1f800-b12b-4630-810c-fc0a184687e1",
        "created_at": "2025-01-09T06:05:40.69269+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Tristan",
        "last_name": "Gimmestad",
        "grade": "6B"
    },
    {
        "user_id": "4181702b-dd73-4f31-bedc-a27fa05bdc1f",
        "created_at": "2025-01-09T06:05:45.20091+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Kalsom",
        "last_name": "Karimi",
        "grade": "6B"
    },
    {
        "user_id": "901f6cf7-20aa-4d84-b13c-003f18b7eae7",
        "created_at": "2025-01-09T06:05:49.721931+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Aksel Vik",
        "last_name": "Kjersem",
        "grade": "6B"
    },
    {
        "user_id": "99e71a5b-516b-479f-a7b0-b15eb909e824",
        "created_at": "2025-01-09T06:05:54.219481+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Christoffer",
        "last_name": "Lekven",
        "grade": "6B"
    },
    {
        "user_id": "94ea9d32-ae44-4c8f-82b2-82ccbf333f9d",
        "created_at": "2025-01-09T06:06:02.941865+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Promesse",
        "last_name": "Mbonyinchuti",
        "grade": "6B"
    },
    {
        "user_id": "3f87451f-ea60-4801-8593-1e30cc0ff721",
        "created_at": "2025-01-09T06:06:07.427183+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Emil Stokkeland",
        "last_name": "Misfjord",
        "grade": "6B"
    },
    {
        "user_id": "9ead04ab-6a34-42f5-a0e7-834c7736003b",
        "created_at": "2025-01-09T06:06:12.239256+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Kyrylo",
        "last_name": "Nizelskyi",
        "grade": "6B"
    },
    {
        "user_id": "0085124d-a7e8-43a1-b8e4-85a6a54bf0e0",
        "created_at": "2025-01-09T06:06:16.752911+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Rafael Elias Venås",
        "last_name": "Sánchez",
        "grade": "6B"
    },
    {
        "user_id": "94dc416c-0731-47cd-90ed-16d4db37032b",
        "created_at": "2025-01-09T06:06:21.247458+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Lilian Anna",
        "last_name": "Sikora",
        "grade": "6B"
    },
    {
        "user_id": "d4e4cecd-6f2c-4c26-bec8-526e6c3c25ef",
        "created_at": "2025-01-09T06:06:25.756606+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Viktoriia",
        "last_name": "Tsurkan",
        "grade": "6B"
    },
    {
        "user_id": "03d63304-e0d0-40c6-b53e-2bf751c599ac",
        "created_at": "2025-01-09T06:06:30.269917+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Thea",
        "last_name": "Vik-Vikås",
        "grade": "6B"
    },
    {
        "user_id": "b769f91f-474a-4462-ad79-6899d2b6e51b",
        "created_at": "2025-01-09T06:06:38.977744+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Alvar Fagerheim",
        "last_name": "Aas",
        "grade": "6B"
    },
    {
        "user_id": "887f355a-7891-4e40-b8c2-19f5e2fbaa5c",
        "created_at": "2025-01-09T06:06:47.984501+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Andrea Louise",
        "last_name": "Baguio-Aas",
        "grade": "7C"
    },
    {
        "user_id": "0bb5c433-0ee8-41e4-8983-50a574b992c0",
        "created_at": "2025-01-09T06:08:52.282464+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Anine",
        "last_name": "Lid",
        "grade": "7B"
    },
    {
        "user_id": "a945a047-4c11-45bc-9888-bf92a9e24d5c",
        "created_at": "2025-01-09T06:07:45.527361+00:00",
        "tasks": {
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Junira Murgus",
        "last_name": "Tira",
        "grade": "7C"
    },
    {
        "user_id": "8a23f67e-8010-4b2a-abc7-d98e0779a36a",
        "created_at": "2025-01-09T06:06:56.987068+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Asil Ibrahim",
        "last_name": "Chaaban",
        "grade": "7C"
    },
    {
        "user_id": "8408f3aa-b5a7-4b26-81a3-1e8b25f3e864",
        "created_at": "2025-01-09T06:06:52.493955+00:00",
        "tasks": {
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Hedda Moen",
        "last_name": "Bjermeland",
        "grade": "7C"
    },
    {
        "user_id": "4a7a29b5-e743-4ccf-b982-7546f6c693e5",
        "created_at": "2025-01-09T06:07:41.019055+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Hyab Awet",
        "last_name": "Teshome",
        "grade": "7C"
    },
    {
        "user_id": "f2a8e11b-e880-416d-b5ef-8d83eaf68322",
        "created_at": "2025-01-09T06:06:43.485992+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Sened Aregay",
        "last_name": "Araya",
        "grade": "7C"
    },
    {
        "user_id": "a8210f44-faf2-4c52-a282-3aea6d2aa5ea",
        "created_at": "2025-01-09T06:08:07.54124+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Elias",
        "last_name": "Berg",
        "grade": "7B"
    },
    {
        "user_id": "19fc887d-2a6d-4068-b90f-1eaef627fad5",
        "created_at": "2025-01-09T06:08:56.704326+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Mina-Cassandra Hauvik",
        "last_name": "Olsen",
        "grade": "7B"
    },
    {
        "user_id": "386d0218-1d32-4e95-a7bf-6ccf654defce",
        "created_at": "2025-01-09T06:09:01.201319+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Sara Emilie Venås",
        "last_name": "Sánchez",
        "grade": "7B"
    },
    {
        "user_id": "41e32213-3de9-489c-8aac-a709e2dfc80d",
        "created_at": "2025-01-13T06:05:41.623183+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Saga Holst",
        "last_name": "Leikarnes",
        "grade": "3A"
    },
    {
        "user_id": "4ccc7752-3315-4aa3-a62a-f57d7d0e80a0",
        "created_at": "2025-01-13T06:05:49.387717+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Yehor",
        "last_name": "Toshev",
        "grade": "3A"
    },
    {
        "user_id": "207c5bff-ad1a-4379-8f2c-13ac41b5dd28",
        "created_at": "2025-01-13T06:05:50.817202+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Andrii",
        "last_name": "Tsviliuk",
        "grade": "3A"
    },
    {
        "user_id": "f49cf625-482c-410a-ac3b-6c87b4ec1118",
        "created_at": "2025-01-13T06:06:01.982575+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Remas Ayman",
        "last_name": "Alhaj",
        "grade": "3B"
    },
    {
        "user_id": "e9eb40d3-6341-4c26-8c38-04880f4252ed",
        "created_at": "2025-01-13T06:06:04.655086+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Felix Domaas",
        "last_name": "Berbé",
        "grade": "3B"
    },
    {
        "user_id": "7a1a61fa-482c-465d-8bda-6edb1527cd69",
        "created_at": "2025-01-13T06:06:28.094727+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ella Fiksdal",
        "last_name": "Bjermeland",
        "grade": "4A"
    },
    {
        "user_id": "9c24d3cb-ff4f-4972-b756-acbad7c008e2",
        "created_at": "2025-01-13T06:06:45.603401+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Emmelie Engeskar",
        "last_name": "Skålhavn",
        "grade": "4A"
    },
    {
        "user_id": "7ac4f015-c0dc-4505-bf16-cbf862cd9a3c",
        "created_at": "2025-01-13T06:06:51.959674+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Håkon André",
        "last_name": "Aas",
        "grade": "4A"
    },
    {
        "user_id": "21b57153-3657-4d99-8a33-9008aed5096c",
        "created_at": "2025-01-13T06:06:57.084793+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Isak",
        "last_name": "Beinset",
        "grade": "4B"
    },
    {
        "user_id": "83881ae2-4298-4f00-87e4-b9c7df2876c7",
        "created_at": "2025-01-13T06:07:12.139865+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Sarah Vik",
        "last_name": "Høgseth",
        "grade": "4B"
    },
    {
        "user_id": "3d8e89ad-0504-4508-9a1c-5a72d191bea2",
        "created_at": "2025-01-09T06:07:18.592748+00:00",
        "tasks": {},
        "topics": null,
        "first_name": "Luna Isolde Taraldsen",
        "last_name": "Klauseth",
        "grade": "7C"
    },
    {
        "user_id": "82ce5175-e9e2-4c3f-a8ad-f3a4d3d084fa",
        "created_at": "2025-01-13T06:08:01.695618+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Matias Awet",
        "last_name": "Teshome",
        "grade": "5B"
    },
    {
        "user_id": "d33fb9ae-a77b-454f-8d02-56f1a3a1ec96",
        "created_at": "2025-01-08T22:36:17.43342+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Boninshuti",
        "last_name": "Dieumerci",
        "grade": "1B"
    },
    {
        "user_id": "1c7b8391-13dc-4727-bef5-34962ec0d77f",
        "created_at": "2025-01-08T22:36:23.055956+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Brage Ræstad",
        "last_name": "Tomasson",
        "grade": "1B"
    },
    {
        "user_id": "75c42a11-047a-4d0c-8eef-899cdb90dc9f",
        "created_at": "2025-01-08T22:40:43.792272+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Leila Madelen",
        "last_name": "Røstgaard",
        "grade": "2B"
    },
    {
        "user_id": "f760af44-2dd6-4bc5-8856-fd18796dc2a5",
        "created_at": "2025-01-08T22:41:43.481208+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Liam Furland",
        "last_name": "Aas",
        "grade": "3B"
    },
    {
        "user_id": "59c245cf-f288-49bd-833e-efdab66c10d8",
        "created_at": "2025-01-08T23:03:27.673443+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Sofie",
        "last_name": "Nerhus-Solbakken",
        "grade": "6A"
    },
    {
        "user_id": "e700c9ce-d04f-45b5-a72a-169ec9934e91",
        "created_at": "2025-01-08T23:12:01.32688+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Saimaa Reistad",
        "last_name": "Køhn",
        "grade": "3A"
    },
    {
        "user_id": "7333318d-ad05-4364-b378-a3089297046b",
        "created_at": "2025-01-08T23:13:31.339534+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Helmine Relling",
        "last_name": "Bredeli",
        "grade": "4A"
    },
    {
        "user_id": "fd2805b1-36e3-4be6-9c73-9a6e1ea87a4d",
        "created_at": "2025-01-08T23:15:01.134817+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Oliver Bjerkevoll",
        "last_name": "Vik",
        "grade": "4B"
    },
    {
        "user_id": "bf534804-af1a-46fb-9ba7-20ec84966e28",
        "created_at": "2025-01-08T23:16:31.55578+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Nikolai Torkell",
        "last_name": "Bøen",
        "grade": "6A"
    },
    {
        "user_id": "df869544-7f1a-4e7e-9306-4f3bf83c7289",
        "created_at": "2025-01-09T05:56:22.009584+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Sakarias Misund",
        "last_name": "Fiksdal",
        "grade": "5A"
    },
    {
        "user_id": "db251eb5-4b4e-4910-9e30-a26d27d19790",
        "created_at": "2025-01-13T06:07:36.082235+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Kevin André Røv",
        "last_name": "Lenning",
        "grade": "5A"
    },
    {
        "user_id": "ce815001-b771-4f47-9545-28d30cabfb79",
        "created_at": "2025-01-13T06:07:24.9306+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Gina Kvålshagen",
        "last_name": "Breivik",
        "grade": "5A"
    },
    {
        "user_id": "6f262e4b-dbaa-48d8-95c0-ce986b2e27a7",
        "created_at": "2025-01-09T06:09:52.508732+00:00",
        "tasks": {
            "frac_fig_to_number": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "times9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Martin",
        "last_name": "Hornberg",
        "grade": "7A"
    },
    {
        "user_id": "a2040855-95c2-41fe-8310-9b2da57048ea",
        "created_at": "2025-01-09T06:10:22.610162+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Tobias Arthur",
        "last_name": "Olafsen",
        "grade": "7A"
    },
    {
        "user_id": "4451c148-c4ad-4ffb-9630-ff09f041fa8c",
        "created_at": "2025-01-08T22:42:43.374855+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Jessica Keth Silva",
        "last_name": "Furland",
        "grade": "5A"
    },
    {
        "user_id": "49f1d007-f86b-4c11-8c05-b7da323a448c",
        "created_at": "2025-01-13T06:07:18.576774+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Yurii",
        "last_name": "Maliuchenko",
        "grade": "4B"
    },
    {
        "user_id": "5a3ef494-b4db-4089-b4e8-1ab89e8f1c81",
        "created_at": "2025-01-09T06:10:31.310525+00:00",
        "tasks": {
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Valeriia",
        "last_name": "Tkachuk",
        "grade": "7A"
    },
    {
        "user_id": "0e282ae0-27ad-4a36-b8a1-fb558bbf1fd7",
        "created_at": "2025-01-08T22:36:03.421788+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Janat Ayman",
        "last_name": "Alhaj",
        "grade": "1A"
    },
    {
        "user_id": "21ebc704-c796-4b62-b204-0159c7838922",
        "created_at": "2025-01-08T22:36:10.345801+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Anna Luisa Venås",
        "last_name": "Sánchez",
        "grade": "1A"
    },
    {
        "user_id": "e8fc11c6-32bb-4f4c-8a18-910d2ba67e64",
        "created_at": "2025-01-08T22:36:16.241273+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Anton Fiksdal",
        "last_name": "Bjermeland",
        "grade": "1B"
    },
    {
        "user_id": "b21b8b0e-19d1-4124-a4f5-9fa472e787b2",
        "created_at": "2025-01-08T22:36:18.046057+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Felicia Anne Valentin Smith",
        "last_name": "Fagerstad",
        "grade": "1B"
    },
    {
        "user_id": "17c68e12-b5ce-4870-8c0e-a37cd2a84ca0",
        "created_at": "2025-01-08T22:40:53.402875+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Skylar",
        "last_name": "Gai-Choul",
        "grade": "3A"
    },
    {
        "user_id": "73422a32-6c60-4d5b-a814-4ae88d00d506",
        "created_at": "2025-01-08T22:41:53.015115+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Iver Johan Domaas",
        "last_name": "Hoem",
        "grade": "4A"
    },
    {
        "user_id": "3174a24f-2d70-464f-807c-7133f5534fbd",
        "created_at": "2025-01-08T23:10:19.228845+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Martin",
        "last_name": "Skjegstad",
        "grade": "1B"
    },
    {
        "user_id": "ec75eafd-24aa-47d5-8e4f-ba6f19af612e",
        "created_at": "2025-01-08T23:10:42.988171+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Snit Aregay",
        "last_name": "Araya",
        "grade": "2A"
    },
    {
        "user_id": "952881cf-0708-4861-be54-eb7861c8306c",
        "created_at": "2025-01-08T23:12:12.578848+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jakob",
        "last_name": "Slodczyk",
        "grade": "3A"
    },
    {
        "user_id": "cfce75cf-a43c-4fbd-a05c-152c6c91f03d",
        "created_at": "2025-01-08T23:16:42.820908+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Asgeir",
        "last_name": "Lindset",
        "grade": "6A"
    },
    {
        "user_id": "dec5cbf7-331d-49d4-8dfe-6d7a2aa34315",
        "created_at": "2025-01-09T07:15:46.31331+00:00",
        "tasks": {
            "times5": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Synne Wiik",
        "last_name": "Hafezi",
        "grade": "7A"
    },
    {
        "user_id": "1dc950f8-0989-41fd-a413-1354992e05dc",
        "created_at": "2025-01-13T06:18:36.17571+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Nora Kleive",
        "last_name": "Bredeli",
        "grade": "5B"
    },
    {
        "user_id": "c02b1228-2b40-4313-97a7-c12916fa36ac",
        "created_at": "2025-01-09T07:15:11.811055+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Marie Kolberg",
        "last_name": "Stenødegård",
        "grade": "7B"
    },
    {
        "user_id": "897c16c8-5f00-4460-8ed5-2a2a669f034f",
        "created_at": "2025-01-09T07:15:54.900278+00:00",
        "tasks": {
            "times10": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Birk Grønningsæter",
        "last_name": "Høgseth",
        "grade": "7A"
    },
    {
        "user_id": "a290f390-06cf-4eb6-9d83-f10807d8513d",
        "created_at": "2025-01-13T06:18:45.592694+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Kyrylo",
        "last_name": "Kharchenko",
        "grade": "5B"
    },
    {
        "user_id": "6cf972ed-4152-4c81-aa23-f71acf992d29",
        "created_at": "2025-01-13T06:18:44.068293+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Selma",
        "last_name": "Håseth-Aas",
        "grade": "5B"
    },
    {
        "user_id": "ff8fa012-f9fc-4a83-81f0-01de557e68b2",
        "created_at": "2025-01-09T06:08:12.060001+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Elise Moen",
        "last_name": "Bjermeland",
        "grade": "7B"
    },
    {
        "user_id": "54670ab6-4859-4837-9f81-22983684327a",
        "created_at": "2025-01-09T07:16:12.105708+00:00",
        "tasks": {
            "times10": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Arian Elis Nerhus",
        "last_name": "Mikalsen",
        "grade": "7A"
    },
    {
        "user_id": "2f0a8f24-fd3f-436e-9ec3-4c4104348d2c",
        "created_at": "2025-01-09T07:15:33.216168+00:00",
        "tasks": {
            "times5": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Hanna",
        "last_name": "Cheban",
        "grade": "7A"
    },
    {
        "user_id": "376a9996-724d-4871-a1ad-a6aa9a6cd323",
        "created_at": "2025-01-08T22:36:04.032706+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Sara",
        "last_name": "Busengdal",
        "grade": "1A"
    },
    {
        "user_id": "fe66a1e5-b7dd-4844-8b5a-ce67b952b8bc",
        "created_at": "2025-01-08T22:36:10.92534+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Anna Maria Venås",
        "last_name": "Sánchez",
        "grade": "1A"
    },
    {
        "user_id": "effce1ea-a44d-4410-8eca-2347e8f917f7",
        "created_at": "2025-01-08T22:36:16.767294+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Eila Olsen",
        "last_name": "Brastad",
        "grade": "1B"
    },
    {
        "user_id": "5b931ffb-f8ce-494b-aa65-1f855c262421",
        "created_at": "2025-01-08T22:36:18.660026+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Monrad",
        "last_name": "Frantzen",
        "grade": "1B"
    },
    {
        "user_id": "57a247e5-a9fc-4ab1-9bd0-e6752a291b5a",
        "created_at": "2025-01-08T22:41:04.154054+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Artur",
        "last_name": "Shtollier",
        "grade": "3A"
    },
    {
        "user_id": "db084404-4745-4818-9154-d1013595b1ad",
        "created_at": "2025-01-08T22:42:03.856431+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Nicolai Klokk",
        "last_name": "Sæterøy",
        "grade": "4A"
    },
    {
        "user_id": "4b59e9e1-8aa8-49bd-9fb8-1f469968c83e",
        "created_at": "2025-01-08T22:44:03.256488+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Kacper",
        "last_name": "Wantuch",
        "grade": "6B"
    },
    {
        "user_id": "407c7102-f1c6-45c8-a16a-6a247c03a35d",
        "created_at": "2025-01-08T23:10:21.679117+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jonas",
        "last_name": "Stonys",
        "grade": "1B"
    },
    {
        "user_id": "7b0ffe14-0e4e-442c-b21e-1e2e4c074870",
        "created_at": "2025-01-08T23:12:21.588448+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Anaweza",
        "last_name": "Tuyubahe",
        "grade": "3A"
    },
    {
        "user_id": "4c627373-17cb-455b-ac01-5a42115fee4f",
        "created_at": "2025-01-08T23:13:51.393835+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Eleonora",
        "last_name": "Mohylevyts",
        "grade": "4A"
    },
    {
        "user_id": "a875bf49-749f-45ad-bc7d-505681dbb784",
        "created_at": "2025-01-08T23:15:21.508629+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Mustafa",
        "last_name": "Karimi",
        "grade": "5A"
    },
    {
        "user_id": "561c7fcc-4bbc-429a-98cb-bb7d667e75d1",
        "created_at": "2025-01-09T06:10:01.105542+00:00",
        "tasks": {
            "times10": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Yelyzaveta",
        "last_name": "Kharchenko",
        "grade": "7A"
    },
    {
        "user_id": "9a2329a3-ebef-4fd0-ba6f-1930aeca548e",
        "created_at": "2025-01-08T22:43:03.551958+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Benas Emilis",
        "last_name": "Dabradziejus",
        "grade": "5B"
    },
    {
        "user_id": "20c34bc1-4981-4670-b516-cbe225a44952",
        "created_at": "2025-01-13T08:32:45.08354+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mille Hovde",
        "last_name": "Welgaard",
        "grade": "6A"
    },
    {
        "user_id": "5c0f5e0e-d6e7-4d76-9813-fdf78d171954",
        "created_at": "2025-01-09T06:07:32.118059+00:00",
        "tasks": {
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Leah Lillebo",
        "last_name": "Rørvik",
        "grade": "7C"
    },
    {
        "user_id": "8b536667-c332-419f-9516-a164cd1bbcff",
        "created_at": "2025-01-12T21:44:51.450356+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Melissa Stavem",
        "last_name": "Troøien",
        "grade": "5B"
    },
    {
        "user_id": "619e629d-c776-4f28-9825-4728a14cc518",
        "created_at": "2025-01-09T06:08:34.293131+00:00",
        "tasks": {
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Natalie Aas",
        "last_name": "Furland",
        "grade": "7B"
    },
    {
        "user_id": "dc3fc07e-272d-4693-9bf4-6bdc45ea1955",
        "created_at": "2025-01-08T22:36:04.627709+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Leander Giskeødegård",
        "last_name": "Dyrhaug",
        "grade": "1A"
    },
    {
        "user_id": "8b9bbe6d-7b8f-4113-9278-898030322883",
        "created_at": "2025-01-08T22:36:11.591937+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Gabriella Bjørnøy",
        "last_name": "Sjåholm",
        "grade": "1A"
    },
    {
        "user_id": "9c10455e-e536-4471-b123-7a7283ab5002",
        "created_at": "2025-01-08T22:36:19.277013+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mykyta",
        "last_name": "Hordynskyi",
        "grade": "1B"
    },
    {
        "user_id": "45a5c5e4-5760-4232-a318-ac25f766457c",
        "created_at": "2025-01-08T22:43:53.635773+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Alfred",
        "last_name": "Lungård",
        "grade": "6B"
    },
    {
        "user_id": "2fcf674e-7268-438a-abf5-f07279fa8a10",
        "created_at": "2025-01-08T23:10:26.388599+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mie Linnea",
        "last_name": "Tomren-Fredrikstad",
        "grade": "1B"
    },
    {
        "user_id": "602eb297-1730-4ac5-a96a-4575fcf4af12",
        "created_at": "2025-01-08T23:11:12.161856+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mathilde Leah",
        "last_name": "Vereide",
        "grade": "2A"
    },
    {
        "user_id": "6f59f637-6242-4d10-bcce-fe145a2b2d8e",
        "created_at": "2025-01-08T23:12:32.746271+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Asli Kidane",
        "last_name": "Woldu",
        "grade": "3A"
    },
    {
        "user_id": "b42c9697-e332-4291-a91f-87c948f35938",
        "created_at": "2025-01-08T23:16:11.173536+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Martyna Katrina",
        "last_name": "Roda",
        "grade": "5B"
    },
    {
        "user_id": "c5376c39-6e68-493e-b575-2422b70f698c",
        "created_at": "2025-01-08T22:44:33.048708+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Karina",
        "last_name": "Chumak",
        "grade": "7B"
    },
    {
        "user_id": "7eef8c0c-f84a-46c3-91f6-bc048af429ea",
        "created_at": "2025-01-08T22:42:54.035573+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Astrid Anea Brastad",
        "last_name": "Sylte",
        "grade": "5A"
    },
    {
        "user_id": "556ff9a4-d37f-4d24-8af7-052795771ba5",
        "created_at": "2025-01-09T07:15:41.899918+00:00",
        "tasks": {
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            },
            "times6": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Guro Øyen",
        "last_name": "Eidhammer",
        "grade": "7A"
    },
    {
        "user_id": "ff930657-263c-47b7-9035-f94716170465",
        "created_at": "2025-01-09T06:08:03.134506+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Ida Sofie",
        "last_name": "Aas",
        "grade": "7C"
    },
    {
        "user_id": "27e6b537-699b-43ac-9780-9dc3961968dc",
        "created_at": "2025-01-08T22:44:53.223715+00:00",
        "tasks": {
            "times5": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Liam Alejandro Hernandez",
        "last_name": "Dalsbø",
        "grade": "7A"
    },
    {
        "user_id": "6daa0950-5563-4cea-8c98-66e39f7c6e1a",
        "created_at": "2025-01-08T23:15:32.780916+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Susanne",
        "last_name": "Nerhus",
        "grade": "5A"
    },
    {
        "user_id": "8a605ab6-fc3b-4afa-a8bc-156d24902bfd",
        "created_at": "2025-01-08T22:36:05.202214+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jannaliza Limosnero",
        "last_name": "Gylland",
        "grade": "1A"
    },
    {
        "user_id": "0ac09273-424f-4632-90aa-53d93e45d70b",
        "created_at": "2025-01-08T22:36:12.214707+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ada Tanita",
        "last_name": "Småge-Liabø",
        "grade": "1A"
    },
    {
        "user_id": "30897798-599b-4c97-8c41-9131e4a97e39",
        "created_at": "2025-01-08T22:36:19.894256+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Gustav",
        "last_name": "Håseth-Aas",
        "grade": "1B"
    },
    {
        "user_id": "79d9f237-dd19-432a-8433-c3aeb1a05ebd",
        "created_at": "2025-01-08T22:43:23.827186+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Julie",
        "last_name": "Eilertsen",
        "grade": "6A"
    },
    {
        "user_id": "c60aa019-915d-4e39-8a50-ccd4b072194f",
        "created_at": "2025-01-08T23:10:28.852354+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Yeva",
        "last_name": "Tsurkan",
        "grade": "1B"
    },
    {
        "user_id": "59315d46-e752-4030-b80c-fa969c6c4697",
        "created_at": "2025-01-08T23:10:51.986198+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Janne Sofie Hagen",
        "last_name": "Gjøstøl",
        "grade": "2A"
    },
    {
        "user_id": "1cf74921-158c-4a62-bb4c-7b62606c029e",
        "created_at": "2025-01-08T23:12:41.774304+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Leonard Rypdal",
        "last_name": "Baltzersen",
        "grade": "3B"
    },
    {
        "user_id": "9a40851e-fe0f-4d76-aab2-a5df4a99e995",
        "created_at": "2025-01-08T23:14:11.242675+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Sofia Lid",
        "last_name": "Aas",
        "grade": "4A"
    },
    {
        "user_id": "a2f7780f-3c54-4254-9cce-8eba1af26d8f",
        "created_at": "2025-01-12T21:42:55.431953+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Monika Jazmin",
        "last_name": "Scheffer",
        "grade": "2A"
    },
    {
        "user_id": "34fb34ce-0232-4428-852d-3a7e3983fc55",
        "created_at": "2025-01-12T21:43:00.105273+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Aksel",
        "last_name": "Aursøy-Holm",
        "grade": "3A"
    },
    {
        "user_id": "40e252db-ab81-4f5b-ab9e-21ca3b6d7ba6",
        "created_at": "2025-01-12T21:43:09.251722+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Storm",
        "last_name": "Karlsnes",
        "grade": "3A"
    },
    {
        "user_id": "9d68e1e9-40b4-414e-8ef4-35df354c353b",
        "created_at": "2025-01-12T21:43:13.767063+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Polina",
        "last_name": "Pospilko",
        "grade": "3A"
    },
    {
        "user_id": "62d87464-5a6c-413b-a4ad-862a6f201f11",
        "created_at": "2025-01-12T21:43:18.265508+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Ivo",
        "last_name": "Zdunczuk",
        "grade": "3A"
    },
    {
        "user_id": "e516c02a-821a-415c-a6ce-ca9afd376562",
        "created_at": "2025-01-12T21:43:22.775666+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Danielis Kristiansen",
        "last_name": "Flate",
        "grade": "3B"
    },
    {
        "user_id": "761cb2e8-7d79-48fb-8782-27050cb75e78",
        "created_at": "2025-01-12T21:43:27.285648+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Isabella Smogeli",
        "last_name": "Johansen",
        "grade": "3B"
    },
    {
        "user_id": "78ae7a3f-3634-47a1-bb10-0434397af2a8",
        "created_at": "2025-01-12T21:43:31.775333+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Peder Sund",
        "last_name": "Nergård",
        "grade": "3B"
    },
    {
        "user_id": "a0ab64d1-bb79-42d2-b41d-9af29d076cf9",
        "created_at": "2025-01-12T21:43:36.29187+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Aurora Repvik",
        "last_name": "Brennvik",
        "grade": "4A"
    },
    {
        "user_id": "7f67cb21-767a-487f-bd69-33c7bffd8e63",
        "created_at": "2025-01-12T21:43:40.6505+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Oskar",
        "last_name": "Gravem",
        "grade": "4A"
    },
    {
        "user_id": "8c7042f0-9230-4f0b-8365-0562b783dc67",
        "created_at": "2025-01-12T21:43:45.090205+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Robert Glasø",
        "last_name": "Lothe",
        "grade": "4A"
    },
    {
        "user_id": "2d0c6717-1a0c-4593-8a54-fc68c112c9aa",
        "created_at": "2025-01-12T21:43:49.445173+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Trine",
        "last_name": "Orvik",
        "grade": "4A"
    },
    {
        "user_id": "4882d957-d95c-46b1-ac37-1d9aed9b699a",
        "created_at": "2025-01-12T21:43:57.968905+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Lilly",
        "last_name": "Bruaset",
        "grade": "4B"
    },
    {
        "user_id": "307ac156-07bf-4924-b375-193d2aa6b723",
        "created_at": "2025-01-12T21:44:02.319076+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Nsengiyumva",
        "last_name": "Eremiya",
        "grade": "4B"
    },
    {
        "user_id": "9b67bc8b-8ea1-42fb-9074-269b9a950c50",
        "created_at": "2025-01-12T21:44:06.801754+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Olesia",
        "last_name": "Fil",
        "grade": "4B"
    },
    {
        "user_id": "584cb311-2028-43c8-a3b5-cee8abf68228",
        "created_at": "2025-01-12T21:44:11.321123+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Alida Horsgård",
        "last_name": "Hagen",
        "grade": "4B"
    },
    {
        "user_id": "d36d0ea1-a7a7-456f-a839-2dac038e9e78",
        "created_at": "2025-01-12T21:44:15.711065+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Håvard Bergset",
        "last_name": "Hestenes",
        "grade": "4B"
    },
    {
        "user_id": "b390476a-f455-4c05-b85f-c3bf6f754677",
        "created_at": "2025-01-12T21:44:20.221692+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Jakob Nergård",
        "last_name": "Karlsen",
        "grade": "4B"
    },
    {
        "user_id": "e8988559-cec1-4b65-94e3-7bce745b62db",
        "created_at": "2025-01-12T21:44:55.958094+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Lukas",
        "last_name": "Kjelsvik",
        "grade": "6A"
    },
    {
        "user_id": "8aecd836-1e57-408d-9bab-2eedfa067dd2",
        "created_at": "2025-01-12T21:45:00.387469+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Karina",
        "last_name": "Orlova",
        "grade": "6A"
    },
    {
        "user_id": "bfd596cd-aed8-4b82-bea2-1339bd3fef59",
        "created_at": "2025-01-12T21:45:04.8296+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Sanna",
        "last_name": "Orvik",
        "grade": "6A"
    },
    {
        "user_id": "1d4bdac6-78a5-4926-9bfe-d19faf2894e8",
        "created_at": "2025-01-12T21:45:09.290157+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Kacper Dominik",
        "last_name": "Ratajewski",
        "grade": "6A"
    },
    {
        "user_id": "d7d5c78c-1222-4f66-9bb7-77de7f6b7941",
        "created_at": "2025-01-12T21:45:13.663126+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Milla",
        "last_name": "Solskjær",
        "grade": "6A"
    },
    {
        "user_id": "2e97c75f-ffb1-4e19-ac72-165fc7272207",
        "created_at": "2025-01-12T21:45:17.996853+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Anna Kanutte",
        "last_name": "Width-Osdal",
        "grade": "6A"
    },
    {
        "user_id": "66474a9a-cd5a-40ab-89e9-fbd1ef855b0e",
        "created_at": "2025-01-12T21:45:22.345759+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Samuel Corrales",
        "last_name": "Østrem",
        "grade": "6A"
    },
    {
        "user_id": "a5fdf734-db5a-41ab-b496-f73a18930f3a",
        "created_at": "2025-01-09T07:16:33.109151+00:00",
        "tasks": {
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "sums_w1dig_dec": {
                "score": 2
            },
            "sums_w2dig_mix": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Iver Lindset",
        "last_name": "Våge",
        "grade": "7A"
    },
    {
        "user_id": "8d8d409a-7c98-4fba-8b35-219286d1481b",
        "created_at": "2025-01-12T21:44:38.244611+00:00",
        "tasks": {
            "integer_dif_1_to_99": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Emilio Solskjær",
        "last_name": "Vikås",
        "grade": "5A"
    },
    {
        "user_id": "041f7d72-987f-4a0e-9b4b-273392ab2729",
        "created_at": "2025-01-12T21:43:04.735071+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Lilly Elise",
        "last_name": "Coppik",
        "grade": "3A"
    },
    {
        "user_id": "ce0eeae4-1d67-425c-b340-070115f365de",
        "created_at": "2025-01-12T21:44:33.73507+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Ruslan",
        "last_name": "Stetsenko",
        "grade": "5A"
    },
    {
        "user_id": "faea3e3b-b0ba-4cab-9865-29139d0ddc1a",
        "created_at": "2025-01-08T23:15:41.88951+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Susanna Nguyen",
        "last_name": "Vollen",
        "grade": "5A"
    },
    {
        "user_id": "3aabedc9-fd9f-469e-ab1e-265ea99e01db",
        "created_at": "2025-01-08T22:44:23.525573+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Kristina Svensli",
        "last_name": "Ulvestad",
        "grade": "7C"
    },
    {
        "user_id": "28e403a0-1bab-418a-94fb-e70f3557f322",
        "created_at": "2025-01-09T06:07:54.124124+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Lars Eivind Bacolod",
        "last_name": "Unlayao",
        "grade": "7C"
    },
    {
        "user_id": "0358c3dc-7cdd-4c36-b8d9-1f1be8ee2026",
        "created_at": "2025-01-12T21:44:29.331811+00:00",
        "tasks": {
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Isak",
        "last_name": "Koprowski",
        "grade": "5A"
    },
    {
        "user_id": "7acc0688-2246-4288-9b3d-00b54803bed4",
        "created_at": "2025-01-12T21:44:42.632319+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Teodor",
        "last_name": "Zdunczuk",
        "grade": "5A"
    },
    {
        "user_id": "07fe4c76-d330-4d83-bb4d-7f01a799ea91",
        "created_at": "2025-01-08T22:36:05.914615+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Noa Holst",
        "last_name": "Leikarnes",
        "grade": "1A"
    },
    {
        "user_id": "d7bae38e-a07d-4c99-9378-51f0b5ad715e",
        "created_at": "2025-01-08T22:36:12.7441+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Kevin Johan",
        "last_name": "Sæter-Stenødegård",
        "grade": "1A"
    },
    {
        "user_id": "4ad67020-e580-4a5c-8023-a3eefd2c56a7",
        "created_at": "2025-01-08T22:36:20.508024+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Nazret Tekleab",
        "last_name": "Mebrahtu",
        "grade": "1B"
    },
    {
        "user_id": "d3c637ba-d2fb-466b-a6d6-30ca930916af",
        "created_at": "2025-01-08T22:43:44.105341+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Soliana Aregay",
        "last_name": "Araya",
        "grade": "6B"
    },
    {
        "user_id": "2e0a30c4-001c-483a-a351-87e3608091cc",
        "created_at": "2025-01-08T23:10:31.317095+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Anne Sevaldsen",
        "last_name": "Varmedal",
        "grade": "1B"
    },
    {
        "user_id": "348133e7-9777-40c8-b0a6-ca5e90f12cbd",
        "created_at": "2025-01-08T23:12:52.921474+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Elida Overaa",
        "last_name": "Hole",
        "grade": "3B"
    },
    {
        "user_id": "396984a8-aacb-4b7b-9ecd-4bb954411bfd",
        "created_at": "2025-01-08T23:14:22.63833+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Leah Tesfaye",
        "last_name": "Bjermeland",
        "grade": "4B"
    },
    {
        "user_id": "c91dd2b2-910e-4a0e-8852-d6ce82609aef",
        "created_at": "2025-01-08T23:15:53.161368+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mykyta",
        "last_name": "Cheban",
        "grade": "5B"
    },
    {
        "user_id": "08716b50-dc72-470c-8457-1dff0f4c8c74",
        "created_at": "2025-01-12T21:57:01.786146+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Johan Nguyen",
        "last_name": "Uren",
        "grade": "3A"
    },
    {
        "user_id": "0b78d55a-3991-41d2-aee1-2c80ae6921bd",
        "created_at": "2025-01-12T21:57:05.562763+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Christian Nguyen",
        "last_name": "Uren",
        "grade": "3B"
    },
    {
        "user_id": "b0d36031-8fc6-4714-8603-83c86d190967",
        "created_at": "2025-01-12T21:57:09.345905+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Tilde",
        "last_name": "Vik-Vikås",
        "grade": "4A"
    },
    {
        "user_id": "06db56f0-1d74-4c56-a300-f630472c4520",
        "created_at": "2025-01-12T21:57:10.275235+00:00",
        "tasks": null,
        "topics": null,
        "first_name": "Mohammed Ayman",
        "last_name": "Alhaj",
        "grade": "4B"
    },
    {
        "user_id": "1fa2e2f4-84b4-4f8a-864d-cda1fec49da4",
        "created_at": "2025-01-09T06:08:21.05771+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Daniel Kvålshagen",
        "last_name": "Breivik",
        "grade": "7B"
    },
    {
        "user_id": "49a8bdc5-3a93-45dc-91ff-2f4917bd8287",
        "created_at": "2025-01-09T06:08:47.79341+00:00",
        "tasks": {
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Lucas Andre",
        "last_name": "Husøy",
        "grade": "7B"
    },
    {
        "user_id": "61c166c7-7d84-4273-a56a-f34a55f0debd",
        "created_at": "2025-01-12T21:57:13.960343+00:00",
        "tasks": {
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Hala Ayman",
        "last_name": "Alhaj",
        "grade": "5A"
    },
    {
        "user_id": "c2fccc1d-16d9-4e7b-a476-b9de5b932b5b",
        "created_at": "2025-01-08T22:44:43.705528+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Aleksander Adam",
        "last_name": "Sikora",
        "grade": "7B"
    },
    {
        "user_id": "2c888f2b-185e-4dc1-a676-8bf3dc58c20e",
        "created_at": "2025-01-10T11:20:27.854853+00:00",
        "tasks": {
            "times5": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Aron Antonius Kildal",
        "last_name": "Skålvik",
        "grade": "7A"
    },
    {
        "user_id": "c8df2d3c-296b-4c9f-a32a-abeb0595472d",
        "created_at": "2025-01-09T06:08:43.276888+00:00",
        "tasks": {
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times4": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Trym",
        "last_name": "Hovde",
        "grade": "7B"
    },
    {
        "user_id": "b7161e7c-f5bd-4ec4-8ae4-c978a17fb303",
        "created_at": "2025-01-09T06:10:39.925569+00:00",
        "tasks": {
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Daria",
        "last_name": "Zubavina",
        "grade": "7A"
    },
    {
        "user_id": "f10345d0-b265-476d-9b84-8f088248408d",
        "created_at": "2025-01-09T06:09:22.607752+00:00",
        "tasks": {
            "times3": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Jakob Hollingsæter",
        "last_name": "Alvsåker",
        "grade": "7A"
    },
    {
        "user_id": "1a08af4f-a0e7-4c4e-b6c4-a5b44776ebda",
        "created_at": "2025-01-09T06:07:01.401144+00:00",
        "tasks": {
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Justin Maleaki",
        "last_name": "Eriksen",
        "grade": "7C"
    },
    {
        "user_id": "237ddbb5-550f-4a2f-afe7-8d83735c411b",
        "created_at": "2025-01-09T07:15:24.602455+00:00",
        "tasks": {
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Ane Viksjø",
        "last_name": "Baltzersen",
        "grade": "7A"
    },
    {
        "user_id": "0e6b7a5c-84e3-4b56-8cf2-b705b9230b01",
        "created_at": "2025-01-09T07:16:03.504651+00:00",
        "tasks": {
            "times5": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Kathleen Bertha Tamboboy",
        "last_name": "Lervik",
        "grade": "7A"
    },
    {
        "user_id": "091ada21-88ca-4314-8dbe-0e04d01b9377",
        "created_at": "2025-01-09T06:10:09.809219+00:00",
        "tasks": {
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times0": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Tymur",
        "last_name": "Maliuchenko",
        "grade": "7A"
    },
    {
        "user_id": "50043ce0-ded3-458a-bec1-a42aeb4498f0",
        "created_at": "2025-01-12T21:44:24.724797+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Viktor",
        "last_name": "Gravem",
        "grade": "5A"
    },
    {
        "user_id": "03d88e41-b7e0-4a7c-9ded-c297779bcf1b",
        "created_at": "2025-01-09T06:08:29.76841+00:00",
        "tasks": {
            "times1": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Aksel Misund",
        "last_name": "Fiksdal",
        "grade": "7B"
    },
    {
        "user_id": "67c140bf-4470-4d16-8281-747630ed3c7c",
        "created_at": "2025-01-09T06:07:27.602684+00:00",
        "tasks": {
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Yelyzaveta",
        "last_name": "Nahibina",
        "grade": "7C"
    },
    {
        "user_id": "8fcd5a71-fea6-4039-bed9-f64cf5de508e",
        "created_at": "2025-01-09T06:08:16.553555+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Leander",
        "last_name": "Bonsak",
        "grade": "7B"
    },
    {
        "user_id": "069b9014-8eb4-45f4-9f74-3550b1d02cca",
        "created_at": "2025-01-08T23:15:12.477717+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Beatrice Sissel Karin Smith",
        "last_name": "Fagerstad",
        "grade": "5A"
    },
    {
        "user_id": "04cd1338-ba63-4f7b-b8f5-f811b5b7b8ea",
        "created_at": "2025-01-09T06:07:23.106798+00:00",
        "tasks": {
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Hennadii",
        "last_name": "Nahibin",
        "grade": "7C"
    },
    {
        "user_id": "b699383a-c33e-4edb-a6a7-e04742649963",
        "created_at": "2025-01-09T06:07:09.991909+00:00",
        "tasks": {
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_amounts_1_to_9": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Synne Alice Domaas",
        "last_name": "Hoem",
        "grade": "7C"
    },
    {
        "user_id": "9873237d-e4d5-4365-af03-ac2cc79e8b0f",
        "created_at": "2025-01-09T06:07:58.640238+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times10": {
                "score": 2
            },
            "times9": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times4": {
                "score": 2
            },
            "times5": {
                "score": 2
            },
            "times6": {
                "score": 2
            },
            "times7": {
                "score": 2
            },
            "times8": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Edel Indrefjord",
        "last_name": "Venås",
        "grade": "7C"
    },
    {
        "user_id": "994085bb-7d4e-420f-b7ed-a90c61f0a237",
        "created_at": "2025-01-09T05:56:04.58432+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_0_to_0point9_2dec": {
                "score": 2
            },
            "plus_on_interval_min9_to_9": {
                "score": 2
            },
            "sub_on_interval_min9_to_9": {
                "score": 2
            },
            "pos_times_neg": {
                "score": 2
            },
            "neg_div_neg": {
                "score": 2
            },
            "neg_times_neg": {
                "score": 2
            },
            "pos_div_neg": {
                "score": 2
            },
            "num_line_0_to_min9": {
                "score": 2
            },
            "times0": {
                "score": 2
            },
            "times1": {
                "score": 2
            },
            "times2": {
                "score": 2
            },
            "times3": {
                "score": 2
            },
            "times10": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Marieke Domaas",
        "last_name": "Berbé",
        "grade": "5A"
    },
    {
        "user_id": "4ae14eae-1939-4c27-a515-28285eb720e7",
        "created_at": "2025-01-09T05:57:42.387116+00:00",
        "tasks": {
            "count_amounts_0_to_9": {
                "score": 2
            },
            "count_ones_amounts_10_to_20": {
                "score": 2
            },
            "count_amounts_10_to_99": {
                "score": 2
            },
            "count_amounts_100_to_999": {
                "score": 2
            },
            "num_line_0_to_9": {
                "score": 2
            },
            "num_line_10_to_20": {
                "score": 2
            },
            "num_line_20_to_100": {
                "score": 2
            },
            "integer_sums_2_to_9": {
                "score": 2
            },
            "integer_sums_10_to_18_w10t": {
                "score": 2
            },
            "integer_sums_11_to_99_e10t": {
                "score": 2
            },
            "integer_sums_11_to_99_w10t": {
                "score": 2
            },
            "integer_sums_100_to_999_e10t": {
                "score": 2
            },
            "integer_sums_4digits": {
                "score": 2
            },
            "integer_dif_0_to_9": {
                "score": 2
            },
            "integer_dif_1_to_20_e10t": {
                "score": 2
            },
            "integer_dif_1_to_20_w10t": {
                "score": 2
            },
            "integer_dif_1_to_99": {
                "score": 2
            },
            "integer_dif_1_to_999": {
                "score": 2
            },
            "mul_as_amounts": {
                "score": 2
            },
            "mul_on_num_line": {
                "score": 2
            },
            "int_times_10_100_1000": {
                "score": 2
            },
            "int_1dig_times_2dig": {
                "score": 2
            },
            "int_1dig_times_3dig": {
                "score": 2
            },
            "frac_fig_to_number": {
                "score": 2
            },
            "frac_fig_to_number_num_line": {
                "score": 2
            },
            "count_amounts_0_to_0point9": {
                "score": 2
            },
            "count_unordered_amounts_1point1_to_3point9": {
                "score": 2
            },
            "count_amounts_1point1_to_3point9": {
                "score": 2
            }
        },
        "topics": null,
        "first_name": "Susanna",
        "last_name": "Edvardsen",
        "grade": "5B"
    }
]

export { getSubjects, makeTable, studentsData, subjects, taskCompletedColor, taskNotCompletedColor }